import React from "react";
import Wrapper from "../assets/wrappers/GigDetails";

const GigDetails = ({ icon, text, type }) => {
  if (type === "email") {
    return (
      <Wrapper>
        <span className="icon">{icon}</span>
        <span className="text">
          <a className="link-venue" href={`mailto:${text}`}>
            {text}
          </a>
        </span>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default GigDetails;
