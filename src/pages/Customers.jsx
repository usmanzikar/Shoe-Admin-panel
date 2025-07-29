// src/pages/customers/Customers.jsx
import React, { useEffect, useState } from "react";
// import { fetchCustomers } from "../../utils/api"; // later when API ready

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // For now, mock customers — replace with API call
    const mockData = [
      { id: 1, name: "John Doe", email: "john@example.com", totalOrders: 5, totalAmount: 250 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", totalOrders: 3, totalAmount: 150 },
      { id: 3, name: "Ali Khan", email: "ali@example.com", totalOrders: 8, totalAmount: 480 },
    ];
    setCustomers(mockData);

    // When API ready:
    // fetchCustomers().then(res => setCustomers(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Customers
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-sm text-left bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3 text-center">Total Orders</th>
              <th className="p-3 text-center">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className={`border-b dark:border-gray-600 ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="p-3 text-gray-800 dark:text-gray-200">{customer.name}</td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">{customer.email}</td>
                  <td className="p-3 text-center text-gray-800 dark:text-gray-200">{customer.totalOrders}</td>
                  <td className="p-3 text-center text-gray-800 dark:text-gray-200">
                    ${customer.totalAmount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
