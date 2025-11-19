import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";

function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="d-flex min-vh-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className="flex-grow-1 p-4 "
        style={{
          marginLeft: isOpen ? "240px" : "70px",
          transition:"margin-left 0.3s ease"
        }}
      >
        <div className="d-md-none mb-3">
          <button className="btn btn-outline-dark"
          onClick={()=>setIsOpen(!isOpen)}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
