import React from "react";
import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
//import { useAppContext } from "../context/appContext";

const AreaChartEx = ({ data }) => {
  //console.log("data", data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray={"3 3"} />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip></Tooltip>
        <Area
          type="monotone"
          fill="#515100"
          dataKey="Requested"
          stroke="black"
        />
        <Area type="monotone" fill="#9be80c" dataKey="Booked" stroke="black" />
        <Area
          type="monotone"
          dataKey="Completed"
          fill="#199eff"
          stroke="black"
        />
        <Area
          type="monotone"
          fill="#df2332"
          dataKey="Canceled"
          stroke="black"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartEx;
