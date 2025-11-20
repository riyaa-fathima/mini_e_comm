import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CartPage() {
  const [cart, setCart] = useState(null);
  const cartItems = cart?.items;
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${baseUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
      console.log(res.data);
    } catch (error) {
      console.log("error fetching cart", error);
    }
  };
  const total = cartItems?.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const removeItem = async (productId) => {
    try {
      const res = await axios.post(
        `${baseUrl}/cart/remove`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(res.data);
    } catch (error) {
      console.log("error remove cart", error);
    }
  };

  const updateQty = async (productId, qtychange) => {
    try {
      const res = await axios.put(
        `${baseUrl}/cart`,
        { productId, quantity: qtychange },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(res.data);
    } catch (error) {
      console.log("error updating cart", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) {
    return <p className="text-center py-5  text-muted">Cart Empty...</p>;
  }

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4">Shopping Cart</h3>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-3">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="d-flex align-items-center border-bottom py-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="rounded-3 me-3"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />

                <div className="flex-grow-1">
                  <h6 className="fw-semibold mb-1">{item.name}</h6>
                  <p className="text-muted small mb-1">
                    Price: ₹{item.product.price.toFixed(2)}
                  </p>

                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQty(item.product._id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => updateQty(item.product._id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-end">
                  <p className="mb-1 fw-semibold">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeItem(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4n= p-4">
            <h5 className="fw-bold mb-3">Order Summery</h5>

            <div className="d-flex justify-content-between mb-2"></div>
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <div className=" d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <span className="text-success">Free</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-4">
            <span className="fw-semibold">Total</span>
            <span className="fw-bold">₹{total.toFixed(2)}</span>
          </div>
          <button className="btn btn-dark w-100 rounded-2" onClick={()=>navigate("/checkout")}>
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
