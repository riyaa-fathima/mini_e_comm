import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function AdminDashboard() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${baseUrl}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const customers = new Set(orders.map((o) => o.user?._id)).size;

  const salesByDate = {};
  orders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!salesByDate[date]) salesByDate[date] = 0;
    salesByDate[date] += order.totalAmount;
    console.log(salesByDate);
  });

  const chartLabels = Object.keys(salesByDate);
  const chartValues = Object.values(salesByDate);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "sales(INR)",
        data: chartValues,
        backgroundColor: "rgba(35, 50, 98, 0.6)",
        borderRadius: 6,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">Dashboard </h2>
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 rounded-4">
            <h6>Total orders</h6>
            <h3 className="fw-bold"> {totalOrders}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm p-4 rounded-4">
            <h6>Total Revenue</h6>
            <h3 className="fw-bold">{totalRevenue}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 rounded-4">
            <h6>Total Ordered costomers</h6>
            <h3 className="fw-bold"> {customers}</h3>
          </div>
        </div>

        <div className="card shadow-sm p-4 rounded">
          <h5 className="semi-bold mb-3">Sales overview</h5>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
