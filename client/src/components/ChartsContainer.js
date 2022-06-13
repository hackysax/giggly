import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChartEx from "./BarChartEx";
import AreaChartEx from "./AreaChartEx";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyGigs } = useAppContext();
  //console.log("Monthly Gigs", monthlyGigs);
  return (
    <Wrapper>
      <h4>Gigs by Stats</h4>
      <button
        type="button"
        onClick={() => {
          setBarChart(!barChart);
        }}
      >
        {barChart ? "Show Area Chart" : "Show Bar Chart"}
      </button>
      {barChart ? (
        <BarChartEx data={monthlyGigs}></BarChartEx>
      ) : (
        <AreaChartEx data={monthlyGigs}></AreaChartEx>
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
