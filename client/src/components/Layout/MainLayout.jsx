import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
    </>
  );
}

export default MainLayout;
