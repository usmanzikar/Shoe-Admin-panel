import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderById } from "../../utils/api"; // ✅ Add this API function in utils/api.js

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        setLoading(true);
        const { data } = await fetchOrderById(orderId); // API call
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };
    getOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 mt-10">
        Order not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow mt-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-orange-500 hover:underline"
      >
        &larr; Back to Orders
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Order Details - {order.orderId}
      </h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 dark:text-gray-200">
        <div>
          <h3 className="font-semibold mb-2">Customer Info</h3>
          <p><strong>Name:</strong> {order.shippingAddress.fullName}</p>
          <p><strong>Email:</strong> {order.customerEmail}</p>
          <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
          <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Order Info</h3>
          <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Shipping Fee:</strong> {order.shippingFee ? `${order.shippingFee} PKR` : "Free"}</p>
          <p className="font-bold text-lg">Total Amount: {order.totalAmount} PKR</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">Products Ordered</h3>
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              <th className="border border-gray-300 dark:border-gray-700 p-2">Product</th>
              <th className="border border-gray-300 dark:border-gray-700 p-2">Quantity</th>
              <th className="border border-gray-300 dark:border-gray-700 p-2">Price</th>
              <th className="border border-gray-300 dark:border-gray-700 p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((prod) => (
              <tr key={prod.productId} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-700 p-2 flex items-center gap-3">
                  <span>{prod.name}</span>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                  {prod.quantity}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-right">
                  {prod.price} PKR
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-right">
                  {prod.price * prod.quantity} PKR
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
