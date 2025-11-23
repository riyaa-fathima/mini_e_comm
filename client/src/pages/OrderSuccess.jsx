import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card border-0 shadow-sm rounded-4 p-5 text-center"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="mb-4">
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "70px" }}
          ></i>
        </div>
        <h3 className="fw-bold mb-2">Order Confirmed</h3>
        <p className="text-muted mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <Link to="/" className="btn btn-dark rounded-pill px-4 py-2">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
