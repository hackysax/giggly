import mongoose from "mongoose";
import validator from "validator";

const GigSchema = new mongoose.Schema(
  {
    venue: {
      type: String,
      required: [true, "Please provide a venue."],
      minlength: 2,
      maxlength: 40,
      trim: true,
    },
    venueemail: {
      type: String,
      required: [true, "Please provide an email for the venue."],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: false,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Requested", "Booked", "Completed", "Canceled"],
      default: "Requested",
    },
    date: {
      type: Date,
      required: [true, "Please provide a date."],
    },
    genre: {
      type: String,
      enum: ["Mixed", "Rock", "Electronic", "Hip Hop", "DJ Set", "Acoustic"],
      default: "Mixed",
    },
    location: {
      type: String,
      required: [true, "Please provide a location city."],
      minlength: 2,
      maxlength: 40,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gig", GigSchema);
