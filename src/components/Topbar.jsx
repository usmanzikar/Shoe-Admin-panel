import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

const Topbar = ({ toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();

  const goToAdminProfile = () => {
    navigate('/adminprofile');
  };

  return (
    <div className="h-16 bg-white dark:bg-gray-900 shadow-sm px-4 flex items-center justify-between sticky top-0 left-0 z-10">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>

      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={goToAdminProfile}
        title="Admin Profile"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDarkMode();
          }}
          className="text-gray-600 dark:text-yellow-400 hover:text-orange-500 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Admin</span>
        <img
          src="https://i.pravatar.cc/30"
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Topbar;
