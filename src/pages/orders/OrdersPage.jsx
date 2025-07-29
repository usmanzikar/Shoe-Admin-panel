import React, { useEffect, useState } from "react";

const STATUS_OPTIONS = ["Processing", "Shipped", "Delivered", "Cancelled"];

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    // TODO: Replace with API call to fetch orders
    const mockOrders = [
      {
        id: "ORD1001",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        date: "2025-07-29",
        totalAmount: 230,
        status: "Delivered",
      },
      {
        id: "ORD1002",
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        date: "2025-07-28",
        totalAmount: 150,
        status: "Processing",
      },
      {
        id: "ORD1003",
        customerName: "Ali Khan",
        customerEmail: "ali@example.com",
        date: "2025-07-27",
        totalAmount: 480,
        status: "Shipped",
      },
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Search & filter effect
  useEffect(() => {
    let filtered = [...orders];

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(lowerSearch) ||
          o.customerName.toLowerCase().includes(lowerSearch) ||
          o.customerEmail.toLowerCase().includes(lowerSearch)
      );
    }

    if (filterStatus) {
      filtered = filtered.filter((o) => o.status === filterStatus);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, filterStatus, orders]);

  // Handle status change for an order
  const handleStatusChange = (orderId, newStatus) => {
    // TODO: Call API to update status on backend
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Orders</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Order ID or Customer"
          className="flex-grow p-2 border rounded text-gray-800 dark:text-white dark:bg-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-2 border rounded text-gray-800 dark:text-white dark:bg-gray-700"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Filter by Status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-sm text-left bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Total Amount</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`border-b dark:border-gray-600 ${
                    idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="p-3 text-gray-800 dark:text-gray-200">{order.id}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {order.customerName} <br />
                    <small className="text-xs text-gray-500 dark:text-gray-400">{order.customerEmail}</small>
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{order.date}</td>
                  <td className="p-3 text-right text-gray-800 dark:text-gray-200">${order.totalAmount}</td>
                  <td className="p-3 text-center">
                    <select
                      className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm cursor-pointer text-gray-800 dark:text-white"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 text-center">
                    <a
                      href={`/orders/${order.id}`}
                      className="text-orange-500 hover:underline"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500 dark:text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
