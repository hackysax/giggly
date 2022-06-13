import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  if (!user) {
    //console.log("Where is user...");
    return <Navigate to="/landing"></Navigate>;
  }
  return children;
};

export default ProtectedRoute;
