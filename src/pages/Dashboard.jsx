import React, { useEffect, useState,useRef } from "react";
import { Bell, Users, ShoppingBag, Clock } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import API from "../utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lastCustomer: null,
    recentOrders: [],
  });

  const [notifications, setNotifications] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const lastOrderIds = useRef(new Set());


  useEffect(() => {
    fetchStats(); // initial load

    const interval = setInterval(() => {
      fetchStats();
      checkNewOrders();
    }, 2000); // every 2s
    
    return () => clearInterval(interval);
  }, []);
const fetchStats = async () => {
  try {
    const customersRes = await API.get("/users/all");
    const ordersRes = await API.get("/orders");

    const customers = customersRes.data.customers || [];
    const orders = ordersRes.data || [];

    const paidDeliveredOrders = orders.filter(
      (order) =>
        order.paymentStatus === "Paid" && order.status === "Delivered"
    );

    const monthlyData = groupByMonth(paidDeliveredOrders);
    const dailyData = groupByDay(orders);

    setSalesData(monthlyData);
    setOrdersData(dailyData);

    setStats({
      totalCustomers: customers.length,
      totalOrders: orders.length,
      totalRevenue: paidDeliveredOrders.reduce(
        (acc, order) => acc + (order.totalAmount || 0),
        0
      ),
      lastCustomer: customers[customers.length - 1] || null,
      recentOrders: orders.slice(-5).reverse(),
    });

  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
  }
};

const checkNewOrders = async () => {
  try {
    const ordersRes = await API.get("/orders");
    const orders = ordersRes.data || [];

    const newOrders = orders.filter((o) => !lastOrderIds.current.has(o._id));

    if (newOrders.length > 0) {
      const newMessages = newOrders.map((order) => {
        const customerName = order.customer?.trim() || "Unknown Customer";
        const status = order.status || "Unknown Status";

        const productDetails =
          order.products?.map((product) => {
            return `${product.name} ($${product.price})`;
          }).join(", ") || "No products";

        return {
          id: order._id, // unique ID for React key & tracking
          createdAt: new Date(order.createdAt).getTime(), // timestamp for sorting
          message: `🛍️ Order from ${customerName}`,
          status,
          details: `Status: ${status} | Items: ${productDetails}`,
        };
      });

      // Add new order IDs to the ref
      newOrders.forEach((order) => lastOrderIds.current.add(order._id));

      setNotifications((prev) => {
        // Combine old and new notifications
        const combined = [...prev, ...newMessages];
        // Sort descending by createdAt timestamp (newest first)
        combined.sort((a, b) => b.createdAt - a.createdAt);
        return combined;
      });
    }
  } catch (err) {
    console.error("Error checking new orders:", err);
  }
};




  // Group Orders by Month
  const groupByMonth = (orders) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const grouped = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const month = monthNames[date.getMonth()];
      grouped[month] = (grouped[month] || 0) + (order.totalAmount || 0);
    });

    return Object.entries(grouped).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  };

  // Group Orders by Day
  const groupByDay = (orders) => {
    const grouped = {};
    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      grouped[day] = (grouped[day] || 0) + 1;
    });

    return Object.entries(grouped).map(([day, orders]) => ({
      day,
      orders,
    }));
  };

  return (
    <div className="p-6 text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users />}
          title="Total Customers"
          value={stats.totalCustomers}
          color="orange"
        />
        <StatCard
          icon={<ShoppingBag />}
          title="Total Orders"
          value={stats.totalOrders}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={`${stats.totalRevenue} PKR`}
          color="green"
        />
        <StatCard
          icon={<Clock />}
          title="Last Customer"
          value={stats.lastCustomer?.name || "No Data"}
          color="purple"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Sales Growth">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders Overview">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-8">
        <h3 className="text-xl font-bold p-5 border-b border-gray-200 dark:border-gray-700">
          Recent Orders
        </h3>
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentOrders.length > 0 ? (
              stats.recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.customer || "Unknown"}</td>
                  <td className="p-3">${order.totalAmount}</td>
                  <td className="p-3">{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No recent orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    {/* Notifications */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
  <h3 className="text-xl font-bold p-5 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
    <Bell /> Notifications
  </h3>
  <div className="p-5 space-y-3">
    {notifications.length > 0 ? (
  notifications.map((note) => {
    const statusColor =
      note.status === "Delivered"
        ? "bg-green-100 dark:bg-green-700"
        : note.status === "Pending"
        ? "bg-yellow-100 dark:bg-yellow-700"
        : "bg-red-100 dark:bg-red-700";

    return (
      <div
        key={note.id}
        className={`animate-fade-in transition-all duration-500 p-4 rounded-lg shadow ${statusColor}`}
      >
        <p className="font-semibold text-sm">{note.message}</p>
        <p className="text-xs mt-1 text-gray-700 dark:text-gray-300">
          {note.details}
        </p>
      </div>
    );
  })
) : (
  <p className="text-gray-500">No new notifications.</p>
)}

  </div>

  {/* Fade-in animation */}
  <style>
    {`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
    `}
  </style>
</div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 flex items-center gap-4">
    {icon && (
      <div className={`p-3 rounded-full bg-${color}-500 text-white`}>
        {icon}
      </div>
    )}
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

// Chart Card Component
const ChartCard = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    {children}
  </div>
);

export default Dashboard;
