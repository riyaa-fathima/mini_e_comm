import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icons: "bi-speedometer2" },
    { name: "Product", path: "/admin/products", icons: "bi-box-seam" },
    { name: "Orders", path: "/admin/orders", icons: "bi-bag-check" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div
      className="bg-white border-end shadow-sm position-fixed h-100 d-flex flex-column justify-content-between"
      style={{
        width: isOpen ? "240px" : "70px",
      }}
    >
      <div className="text-center py-3 border-bottom">
        <h5
          className="m-0 fw-bold text-dark"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.3s ",
          }}
        >
          MiniShop
        </h5>
      </div>

      <nav className="flex-grow-1">
        {menuItems.map((item, key) => (
          <div
            key={key}
            className="d-flex align-items-center px-3 py-2 text-secondary sidebar-items
            "
            style={{
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 0.3s ease",
            }}
            onClick={() => handleNavigate(item.path)}
          >
            <i className={`${item.icons}`}></i>
            <span
              className="ms-3"
              style={{
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {" "}
              {item.name}
            </span>
          </div>
        ))}
      </nav>

      <div
        className="text-center py-3 border-top small text-danger"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
