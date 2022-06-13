import React from "react";
import { useEffect } from "react";
import {
  StatsContainer,
  ChartsContainer,
  LoadingCircle,
} from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../../context/appContext";

const Stats = () => {
  const { showStats, isLoading, monthlyGigs } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);
  //console.log("monthly Gigs", monthlyGigs);
  if (isLoading) {
    return <LoadingCircle center />;
  }
  //dont show charts is user has no gigs in the system.
  return (
    <Wrapper>
      <StatsContainer>
        <h1>Stats</h1>;
      </StatsContainer>
      {monthlyGigs.length > 0 && (
        <ChartsContainer>
          <h1>Charts</h1>
        </ChartsContainer>
      )}
    </Wrapper>
  );
};

export default Stats;
