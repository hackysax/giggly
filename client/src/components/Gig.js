import React from "react";
import Wrapper from "../assets/wrappers/Gig";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import GigDetails from "./GigDetails";
import { GiCalendar } from "react-icons/gi";
import { VscLocation } from "react-icons/vsc";
import { SiMusicbrainz } from "react-icons/si";
import { MdAlternateEmail } from "react-icons/md";

const Gig = ({ id, venue, date, venueemail, status, genre, location }) => {
  const { setEditGig, deleteGig } = useAppContext();
  let date2 = moment(date);
  date2 = date2.utc().format("dddd, MM/DD/YY");

  return (
    <Wrapper>
      <header className="info">
        <div className={`main-icon ${status.toLowerCase()}`}>
          {status.charAt(0)}
        </div>
        <div className="info">
          <h5 className="info">{venue}</h5>
          <p className="info">{status}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <GigDetails
            icon={<GiCalendar />}
            text={date2}
            type="text"
          ></GigDetails>
          <GigDetails
            icon={<MdAlternateEmail />}
            text={venueemail}
            type="email"
          ></GigDetails>
          <GigDetails
            icon={<SiMusicbrainz />}
            text={genre}
            type="text"
          ></GigDetails>
          <GigDetails icon={<VscLocation />} text={location}></GigDetails>
        </div>
        <footer>
          <div className="actions">
            <Link
              className="btn edit-btn"
              to={"/add-gigs"}
              onClick={() => {
                setEditGig(id);
              }}
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => {
                deleteGig(id);
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Gig;
