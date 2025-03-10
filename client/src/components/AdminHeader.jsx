// components/AdminHeader.jsx
import React from "react";
import { FaUserCircle, FaSignOutAlt, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  return (
    <header className="bg-gray-900 text-white p-.5 flex justify-between items-center">
      <div className="p-5 text-xl font-bold flex items-center gap-2">
          <FaBuilding className="text-2xl" />
          EstateHub
        </div>
      <div className="flex items-center gap-4">
        <Link to="/admin/profile" className="flex items-center gap-2">
          <FaUserCircle className="text-2xl" /> Profile
        </Link>
        <button className="bg-red-500 px-4 py-2 rounded flex items-center gap-2">
          <FaSignOutAlt /> Sign Out
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
