import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    // TODO: Replace with API call to fetch order details by orderId
    const mockOrderDetail = {
      id: orderId,
      customer: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        address: "123 Main St, City, Country",
      },
      date: "2025-07-29",
      status: "Delivered",
      products: [
        {
          id: "prod1",
          name: "Sneakers Model A",
          quantity: 2,
          price: 50,
          imageUrl: "https://i.pravatar.cc/60?img=12",
        },
        {
          id: "prod2",
          name: "Formal Shoes Model B",
          quantity: 1,
          price: 130,
          imageUrl: "https://i.pravatar.cc/60?img=15",
        },
      ],
      shippingFee: 10,
      totalAmount: 240,
      paymentMethod: "Credit Card",
    };

    setOrder(mockOrderDetail);
  }, [orderId]);

  if (!order) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Loading order details...
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
        Order Details - {order.id}
      </h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 dark:text-gray-200">
        <div>
          <h3 className="font-semibold mb-2">Customer Info</h3>
          <p><strong>Name:</strong> {order.customer.name}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Address:</strong> {order.customer.address}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Order Info</h3>
          <p><strong>Order Date:</strong> {order.date}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Shipping Fee:</strong> ${order.shippingFee}</p>
          <p className="font-bold text-lg">Total Amount: ${order.totalAmount}</p>
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
              <tr key={prod.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border border-gray-300 dark:border-gray-700 p-2 flex items-center gap-3">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span>{prod.name}</span>
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                  {prod.quantity}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-right">
                  ${prod.price}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-right">
                  ${prod.price * prod.quantity}
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
