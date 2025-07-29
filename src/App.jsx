import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/productPage/Products";
import AddProduct from "./pages/productPage/AddProduct";
import UpdateProduct from "./pages/productPage/UpdateProduct";
import Login from "./pages/Login"; // ✅ Import Login
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext"; // ✅ Import Auth Context
import Admins from "./pages/Admins";
import AdminProfile from "./pages/AdminProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Customers from "./pages/Customers";
import OrdersPage from "./pages/orders/OrdersPage";
import OrderDetails from "./pages/orders/OrderDetails";
import OfferPage from "./pages/OfferPage";

// ✅ Private Route Component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen">
        <Routes>
          {/* ✅ Public Route */}
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <div className="flex bg-gray-100 dark:bg-black transition-all">
                  <Sidebar />
                  <div className="flex-1 md:ml-64">
                    <Topbar
                      toggleDarkMode={() => setDarkMode((prev) => !prev)}
                      darkMode={darkMode}
                    />
                    <main className="p-4 text-black dark:text-white">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                          path="/products/addproduct"
                          element={<AddProduct />}
                        />
                        <Route
                          path="/products/updateproduct/:id"
                          element={<UpdateProduct />}
                        />
                        <Route path="/admins" element={<Admins />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/offers" element={<OfferPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route
                          path="/orders/:orderId"
                          element={<OrderDetails />}
                        />

                        <Route
                          path="/adminprofile"
                          element={
                            currentUser ? (
                              <AdminProfile />
                            ) : (
                              <Navigate to="/adminlogin" />
                            )
                          }
                        />
                      </Routes>
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
