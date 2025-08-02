import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const { data } = await API.get("/users/all"); // ✅ fixed endpoint
      setCustomers(data.customers); // ✅ store array only
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchCustomers();
}, []);


  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Customers
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        {loading ? (
          <div className="text-center p-6 text-gray-500 dark:text-gray-400">
            Loading customers...
          </div>
        ) : (
          <table className="w-full text-sm text-left bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3 text-center">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customers, index) => (
                  <tr
                    key={customers._id}
                    className={`border-b dark:border-gray-600 ${
                      index % 2 === 0
                        ? "bg-gray-50 dark:bg-gray-900"
                        : "bg-white dark:bg-gray-800"
                    } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    <td className="p-3">{customers.name}</td>
                    <td className="p-3">{customers.email}</td>
                    <td className="p-3 text-center">
                      {new Date(customers.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Customers;
