import React from "react";
import { Home, Package, Users, Percent, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClasses = (path) =>
    `flex items-center gap-3 px-2 py-2 rounded-md ${
      pathname === path
        ? "bg-orange-100 text-orange-600 dark:bg-orange-600 dark:text-white"
        : "text-gray-700 dark:text-gray-200 hover:text-orange-500"
    }`;

  return (
    <div className="w-64 h-screen bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 p-6 hidden md:block transition-all">
      <h2 className="text-2xl font-bold text-orange-600 mb-10">Shoe Admin</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className={linkClasses("/")}>
            <Home size={20} /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products" className={linkClasses("/products")}>
            <Package size={20} /> Products
          </Link>
        </li>
        <li>
          <Link to="/orders" className={linkClasses("/orders")}>
            <Percent size={20} /> Orders
          </Link>
        </li>
        <li>
          <Link to="/admins" className={linkClasses("/admins")}>
            <Users size={20} /> Admins
          </Link>
        </li>
        <li>
          <Link to="/customers" className={linkClasses("/customers")}>
            <Users size={20} /> Customers
          </Link>
        </li>
        <li>
          <Link to="/offers" className={linkClasses("/offers")}>
            <Percent size={20} /> Offers
          </Link>
        </li>
        {/* <li>
          <span className="flex items-center gap-3 text-gray-700 dark:text-gray-200 hover:text-orange-500 cursor-pointer">
            <Settings size={20} /> Settings
          </span>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
