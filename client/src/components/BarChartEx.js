import React from "react";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
//import { useAppContext } from "../context/appContext";

const BarChartEx = ({ data }) => {
  //console.log("data", data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray={"3 3 "} />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />

        <Tooltip className="alternate"></Tooltip>

        <Bar fill="#515100" dataKey="Requested"></Bar>
        <Bar fill="#9be80c" dataKey="Booked"></Bar>
        <Bar fill="#199eff" dataKey="Completed"></Bar>
        <Bar fill="#df2332" dataKey="Canceled"></Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartEx;
