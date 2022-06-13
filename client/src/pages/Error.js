import React from "react";
import Wrapper from "../assets/wrappers/ErrorPage";
import errimg from "../assets/images/not-found.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={errimg} alt="Page not found" className="" />
        <h3>Page not found.</h3>
        <p>Can't seem to find that, sorry!</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
