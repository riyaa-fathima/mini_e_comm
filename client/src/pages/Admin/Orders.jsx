import axios from "axios";
import React, { useEffect, useState } from "react";

function Orders() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const baseUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const filterOrder = orders.filter((order) => {
    return order.user?.name?.toLowerCase().includes(search.toLocaleLowerCase());
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${baseUrl}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data);
      } catch (error) {
        console.log("error fetching order", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  console.log(search);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Orders</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      {!loading && (
        <div className="card shadow-sm">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th># Order</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {filterOrder.map((order) => (
                <tr key={order._id}>
                  <td className="fe-semibold">{order._id}</td>
                  <td>{order.user?.name || "unknown"}</td>
                  <td>{order.user?.email}</td>
                  <td>{order.items?.length}items</td>
                  <td>{order.totalAmount}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {filterOrder.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-3  text-muted">
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
