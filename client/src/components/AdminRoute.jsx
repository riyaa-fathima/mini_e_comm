import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({children}) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.isAdmin === true ? children : <Navigate to="/login" />;
}
