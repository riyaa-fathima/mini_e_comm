import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const baseUrl = import.meta.env.VITE_API_URL;
  const token = user?.token;

  const fetchCartCount = async () => {
    try {
      if (!token) return;
      const res = await axios.get(`${baseUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("cart", res.data.items.length);

      setCartCount(res.data.items.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartCount();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm py-2">
      <div className="container">
        <Link className="navbar-brand fw-bold" to={"/"}>
          Mini Shop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse flow-column flex-lg justify-content-lg-between align-items-center "
          id="navbarContent"
        >
          <form className="d-flex w-100 w-lg-auto justify-content-start my-2 my-lg-0">
            <input
              type="search"
              style={{ maxWidth: "400px" }}
              placeholder="search products..."
            />
          </form>
          <div className="d-flex align-items-center gap-3 mt-2 mt-lg-0">
            
            <Link className="nav-link position-relative " to={"/cart"}>
             
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </Link>
             {cartCount > 0 && (
                <span
                  className="position-abslute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "10px" }}
                >
                  {cartCount}
                </span>
              )}

            {user ? (
              <>
                <span className="fw-semi-bold"> Hi,{user?.name}</span>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-dark btn-sm" to={"/login"}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
