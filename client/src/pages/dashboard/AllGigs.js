import React from "react";
import { GigsBox, SearchBox } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AllGigs = () => {
  //if (true) return <div></div>;
  return (
    <Wrapper>
      <SearchBox></SearchBox>
      <GigsBox></GigsBox>
    </Wrapper>
  );
};

export default AllGigs;
