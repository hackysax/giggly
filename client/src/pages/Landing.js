import React from "react";
import { Logo } from "../components/index";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            <span> Gig Tracking For Bands</span>
          </h1>
          <p>
            Register your band and begin tracking your gigs. Look at past shows
            and schedule upcoming events.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="giggly landing" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
