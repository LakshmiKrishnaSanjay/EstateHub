import React from "react";
import { FaSignOutAlt, FaBuilding } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold flex items-center gap-2">
        <FaBuilding className="text-2xl text-white" />
        <span>EstateHub</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          <FaSignOutAlt className="text-lg" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
