// src/pages/admin/AdminProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // ✅ fixed path

const AdminProfile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/adminlogin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center space-y-6">
        <img
          src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`}
          alt="Admin Avatar"
          className="w-28 h-28 rounded-full mx-auto border-4 border-orange-500"
        />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Profile</h2>

        <div className="text-left space-y-2 text-gray-700 dark:text-gray-300">
          <p><strong>Name:</strong> {currentUser?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {currentUser?.email || 'N/A'}</p>
          <p><strong>Role:</strong> {currentUser?.role || 'Admin'}</p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
