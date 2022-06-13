import React from "react";
import { Outlet, Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { SmallSideBar, BigSidebar, Navbar } from "../../components/";

const Shared = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar></SmallSideBar>
        <BigSidebar></BigSidebar>
        <div>
          <Navbar></Navbar>
          <div className="dashboard-page">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Shared;
