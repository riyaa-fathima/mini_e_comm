import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL;
  const API_URL = `${baseUrl}/product/${id}`;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const fetchProduct = async () => {
    try {
      const res = await axios.get(API_URL);
      setProduct(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error product detail", error);
    }
  };

  const handleAddCart = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/cart/add`,
        {
          productId: product._id,
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast("Product added to cart");
    } catch (error) {
      console.log("error adding to cart", error);
      toast.error("Failed to add");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  if (!product) {
    return <p className=" text-center py-5 text-muted">Loading Product</p>;
  }
  return (
    <div className="container py-5">
      <div className="row  g-5">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={product.image}
            style={{ maxHeight: "400px", objectFit: "cover" }}
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h5>{product.name}</h5>
          <p className="text-warning mb-1 ">
            ⭐⭐⭐<span className="text-muted">3.5</span>
          </p>
          <p className="mb-3 text-success">In stock</p>
          <div className="mb-3 text-muted me-2">
            <span className=" text-decoration-line-through">
              INR {product.price + 20}
            </span>
            <span className="fw-bold text-dark fs-4">INR {product.price}</span>
          </div>
          <p className="text-muted">{product.description}</p>
          <div className="d-flex align-items-center gap-2 mb-3">
            <label className="fw-semibold">Qty:</label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="form-control form-control-sm"
              style={{ width: "70px" }}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <button
            className="btn btn-dark btn-lg w-100 mb-3"
            onClick={handleAddCart}
          >
            Add to Cart
          </button>
          <button
            className="btn btn-outline-dark btn-lg w-100 mb-3"
            onClick={() =>
              navigate("/checkout", {
                state: {
                  productId: product._id,
                  quantity: qty,
                  directBuy: true,
                },
              })
            }
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
