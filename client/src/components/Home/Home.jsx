import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "axios";

function Home() {
  const [sortType, setSortType] = useState("default");
  const [products, setProducts] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL;
  const API_URL = `${baseUrl}/product`;

  const fetchProduct = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    console.log(a, b);

    if (sortType === "low-high") return a.price - b.price;
    if (sortType === "high-low") return b.price - a.price;
    return 0;
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <Carousel />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">Featured Products</h4>
          <select
            className="form-select form-select-sm w-auto"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="default">sort by</option>
            <option value="low-high"> Price:Low to High</option>
            <option value="high-low"> Price:High to Low</option>
          </select>
        </div>

        <div className="row g-4">
          {sortedProducts.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p._id}>
              <Link  to={`/product/${p._id}`} className="text-decoration-none text-dark">
                <div className="card border-0 rounded-4 shadow-sm product-card h-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="card-img-top rounded-top-4 product-img"
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title fw-semi-bold">{p.name}</h6>
                    <p className=" product-descreption"> {p.description}</p>

                    <div className="mb-2">
                      <span className="text-decoration-line-through text-muted me-2">
                        {p.price+20}
                      </span>
                      <span className="fw-bold text-dark"> INR {p.price}</span>
                      <span className="badge bg-danger ms-2"> 20% off</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
