import React from "react";
import Wrapper from "../assets/wrappers/StatItem";

const StatItem = (props) => {
  return (
    <Wrapper className={props.title.toLowerCase()}>
      <header>
        <span className={`value ${props.title.toLowerCase()}`}>
          {props.value}
        </span>
        <span className={`icon ${props.title.toLowerCase()}`}>
          {props.icon}
        </span>
      </header>
      <h5 className={props.title.toLowerCase()}>{props.title}</h5>
    </Wrapper>
  );
};

export default StatItem;
