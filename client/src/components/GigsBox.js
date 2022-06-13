import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/GigsBox";
import { useAppContext } from "../context/appContext";
import Gig from "./Gig";
import LoadingCircle from "./LoadingCircle";
import PageBtnContainer from "./PageBtnContainer";

const GigsBox = () => {
  const {
    getGigs,
    gigs,
    isLoading,
    totalGigs,
    numPages,
    searchVenue,
    searchLocation,
    filterGenre,
    filterStatus,
    sortCurrent,
    page,
  } = useAppContext();

  useEffect(() => {
    getGigs();
    // eslint-disable-next-line
  }, [
    page,
    searchVenue,
    searchLocation,
    filterGenre,
    filterStatus,
    sortCurrent,
  ]);

  if (isLoading) {
    return (
      <Wrapper>
        <LoadingCircle center={true}></LoadingCircle>
      </Wrapper>
    );
  }
  if (totalGigs <= 0) {
    return (
      <Wrapper>
        <h3>No gigs found...</h3>
      </Wrapper>
    );
  }
  if (totalGigs > 0) {
    // if (true) return <></>;
    return (
      <Wrapper>
        <h5> {`${totalGigs} gig${totalGigs === 1 ? "" : "s"} found`}</h5>
        {numPages > 1 && <PageBtnContainer />}
        <div className="gigs">
          {gigs.map((onegig, iter) => {
            return (
              <Gig
                key={onegig._id}
                id={onegig._id}
                venue={onegig.venue}
                date={onegig.date}
                venueemail={onegig.venueemail}
                status={onegig.status}
                location={onegig.location}
                genre={onegig.genre}
              ></Gig>
            );
          })}
        </div>
        {numPages > 1 && <PageBtnContainer />}
      </Wrapper>
    );
  }
};

export default GigsBox;
