import Gig from "../models/Gig.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermssions from "../utils/permissions.js";
import moment from "moment";

const createGig = async (req, res) => {
  const { venue, venueemail, date } = req.body;

  if (!venue || !venueemail || !date) {
    throw new BadRequestError("Please provide required values.");
  }

  req.body.createdBy = req.user.userId;
  const gig = await Gig.create(req.body);
  res.status(StatusCodes.CREATED).json({ gig });
};

const getAllGigs = async (req, res) => {
  const { status, genre, searchvenue, searchlocation, sort } = req.query;
  const queryObj = {
    createdBy: req.user.userId,
  };

  if (status && status !== "all" && status !== "All") {
    queryObj.status = status;
  }
  if (genre && genre !== "all" && genre !== "All") {
    queryObj.genre = genre;
  }
  //thanks SO, mongo sytax is le hard.
  if (searchvenue) {
    queryObj.venue = { $regex: searchvenue, $options: "i" };
  }
  if (searchlocation) {
    queryObj.location = { $regex: searchlocation, $options: "i" };
  }
  //console.log(queryObj);
  let result = Gig.find(queryObj);
  //chain the sort.
  if (sort && sort === "Newest") {
    result = result.sort("-date");
  }

  if (sort && sort === "Oldest") {
    result = result.sort("date");
  }
  //TODO: Impliment capitalizatoin in venue name...
  //apparently mongo db sort is case sensitive?
  if (sort && sort === "A-Z") {
    result = result.sort("venue");
  }

  if (sort && sort === "Z-A") {
    result = result.sort("-venue");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const gigs = await result;

  const totalGigs = await Gig.countDocuments(queryObj);
  const numPages = Math.ceil(totalGigs / limit);

  //console.log("getAllGigs in gigsController from Node BackEnd");
  //console.log(req.userId);
  res
    .status(StatusCodes.OK)
    .json({ gigs, totalGigs: totalGigs, numPages: numPages }); //numpages hard coded for now until implement pagination.
};

const updateGig = async (req, res) => {
  //console.log("req.params", req.params);

  const { id: gigId } = req.params;
  const { venue, venueemail, location, status, date, genre } = req.body;
  if (!date || !venue || !venueemail) {
    throw new BadRequestError("Please eneter in all required values.");
  }
  const gigtoedit = await Gig.findOne({ _id: gigId });
  if (!gigtoedit) {
    throw new NotFoundError(`Gig not found: id ${gigId}`);
  }

  checkPermssions(req.user, gigtoedit.createdBy);
  const updatedGig = await Gig.findOneAndUpdate(
    {
      _id: gigId,
    },
    { venue, venueemail, location, status, date, genre },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ updatedGig });
};

const deleteGig = async (req, res) => {
  res.send("delete Gig");
  //console.log("req.params", req.params);

  const { id: gigId } = req.params;
  const gigtodelete = await Gig.findOne({ _id: gigId });
  if (!gigtodelete) {
    throw new NotFoundError(`Gig not found: id ${gigId}`);
  }
  checkPermssions(req.user, gigtodelete.createdBy);

  await Gig.findOneAndDelete({
    _id: gigId,
  });
  res.status(StatusCodes.OK).json({ msg: "Gig has been deleted." });
};

const showStats = async (req, res) => {
  const gigstatsStatus = await Gig.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const gigstatsGenre = await Gig.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$genre", count: { $sum: 1 } } },
  ]);
  //thanks SO -- reducer is magic...
  const gigstatsStatusReduced = gigstatsStatus.reduce((a, c) => {
    const { _id: title, count } = c;
    //console.log("current", c);
    a[title] = count;
    return a;
  }, {});
  const gigstatsGenreReduced = gigstatsGenre.reduce((a, c) => {
    const { _id: title, count } = c;
    //console.log("current", c);
    a[title] = count;
    return a;
  }, {});
  const gigstatsStatusDefault = {
    Requested: gigstatsStatusReduced.Requested || 0,
    Booked: gigstatsStatusReduced.Booked || 0,
    Completed: gigstatsStatusReduced.Completed || 0,
    Canceled: gigstatsStatusReduced.Canceled || 0,
  };
  const gigstatsGenreDefault = {
    Mixed: gigstatsGenreReduced.Mixed || 0,
    Rock: gigstatsGenreReduced.Rock || 0,
    Electronic: gigstatsGenreReduced.Electronic || 0,
    ["Hip Hop"]: gigstatsGenreReduced["Hip Hop"] || 0,
    ["DJ Set"]: gigstatsGenreReduced["DJ Set"] || 0,
    Acoustic: gigstatsGenreReduced.Acoustic || 0,
  };

  let monthlyGigsLocal = await Gig.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          status: "$status",
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 24 },
  ]);

  monthlyGigsLocal = monthlyGigsLocal
    .map((monthGigs, dex) => {
      const {
        _id: { year, month, status },
        count,
      } = monthGigs;
      const axisDate = moment()
        .month(month - 1)
        .year(year)
        .format("MMM-Y");
      return { date: axisDate, count: count, status: status };
    })
    .reverse();

  let reducer = {
    date: "",
    Requested: 0,
    Booked: 0,
    Completed: 0,
    Canceled: 0,
  };
  let prevDate = "";
  let monthlyGigs = monthlyGigsLocal.map((obj, dex) => {
    let reducerlocal = {};
    const { date, count, status } = obj;
    if (dex === 0) {
      reducer = { ...reducer, date: date, [status]: count };
      prevDate = date;
      return null;
    } else if (prevDate === date) {
      reducer = { ...reducer, [status]: count };
      prevDate = date;
      return null;
    } else if (dex === monthlyGigsLocal.length - 1) {
      reducer = { ...reducer, date: date, [status]: count };
      console.log("Found", reducer);
      return reducer;
    } else {
      reducerlocal = { ...reducer };
      reducer = {
        date: "",
        Requested: 0,
        Booked: 0,
        Completed: 0,
        Canceled: 0,
      };
      reducer = { ...reducer, date: date, [status]: count };
      prevDate = date;
      return reducerlocal;
    }
  });
  //console.log("monthlyGigs", monthlyGigs);
  const results = monthlyGigs.filter((element) => {
    return element !== null;
  });

  monthlyGigs = results;
  //monthlyGigs.push(monthlyGigsLocal);

  //console.log("Status from Gig Controller:", gigstatsStatusDefault);
  //console.log("Genre from Gig Controller:", gigstatsGenreDefault);
  //console.log("Monthly from Gig Controller:", monthlyGigs);

  res.status(StatusCodes.OK).json({
    gigstatsStatusDefault,
    gigstatsGenreDefault,
    monthlyGigs,
  });
};

export { createGig, deleteGig, getAllGigs, updateGig, showStats };
