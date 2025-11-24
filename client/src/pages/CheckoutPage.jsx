import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function CheckoutPage() {
  const location = useLocation();
  const directBuy = location.state?.directBuy || false;
  const directProductId = location.state?.productId || null;
  const directQuantity = location.state?.quantity || 1;
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shipping, SetShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const baseUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const handleChange = (e) => {
    SetShipping({ ...shipping, [e.target.name]: e.target.value });
  };
  console.log("ship", shipping);

  console.log("directbuy", directBuy);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${baseUrl}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItem(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log("error fetching cart in checkout", error);
    }
  };

  const total = cartItem.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const fetchDirectBuy = async () => {
    try {
      const res = await axios.get(`${baseUrl}/product/${directProductId}`);
      console.log("product", res);

      setCartItem([
        {
          product: res.data,
          quantity: directQuantity,
        },
      ]);
    } catch (error) {
      console.log("fetch direct buy", error);
    }
  };

  const handlePlaceOrder = async () => {
    for (let key in shipping) {
      if (!shipping[key]) {
        alert("please fill all field");
        return;
      }
    }

    const orderData = {
      shippingInfo: shipping,
      items: cartItem.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      directBuy: directBuy,
    };
    try {
      const res = await axios.post(`${baseUrl}/order`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast("Order Placed successfully");
      window.location.href = "success";
    } catch (error) {
      console.log(error);
      toast("failed to order");
    }
  };

  useEffect(() => {
    if (directBuy) {
      fetchDirectBuy();
    } else {
      fetchCart();
    }
  }, []);

  return (
    <div className="container py-5">
      <h3 className="fw-bold mb-4"> Checkout</h3>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
            <h5 className="fw-bold mb-3">Shipping info</h5>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label"> First Name :</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control rounded-3"
                  value={shipping.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label"> Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control rounded-3"
                  value={shipping.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label"> Email :</label>
                <input
                  type="text"
                  name="email"
                  className="form-control rounded-3"
                  value={shipping.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label"> Address :</label>
                <input
                  type="text"
                  name="address"
                  className="form-control rounded-3"
                  value={shipping.address}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label"> City :</label>
                <input
                  type="text"
                  name="city"
                  className="form-control rounded-3"
                  value={shipping.city}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label"> Postal Code :</label>
                <input
                  type="number"
                  name="postalCode"
                  className="form-control rounded-3"
                  value={shipping.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label"> Phone Number : </label>
                <input
                  type="number"
                  name="phone"
                  className="form-control rounded-3"
                  value={shipping.phone}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-semibold mb-3"> Your Item</h5>
            {cartItem.map((item) => (
              <div
                key={item.product._id}
                className="d-flex border-0 shadow-sm rounded-4 p-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  width={70}
                  height={70}
                  className="rounded-3"
                  style={{ objectFit: "cover" }}
                />
                <div className="ms-3 flex-grow-1">
                  <h6 className="fw-semibold mb-1">{item.product.name}</h6>
                  <p className="text-muted small mb-1">Qty:{item.quantity}</p>
                </div>

                <div>INR {(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* {*right section} */}
        <div className="col-lg-4">
          <h5 className="fw-semibold mb-3">Order summary</h5>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span>INR{total.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Shipping</span>
            <span className="text-success">Free</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">Total</span>
            <span className="fw-semibold">INR{total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-outline-dark w-100 rounded-3 py-2"
            onClick={() => handlePlaceOrder()}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
