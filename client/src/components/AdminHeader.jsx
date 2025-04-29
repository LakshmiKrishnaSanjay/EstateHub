import React from "react";
import { FaSignOutAlt, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
const AdminHeader = () => {

  const navigate = useNavigate()
  const queryClient=useQueryClient()
  const dispatch = useDispatch()
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      sessionStorage.clear() 
      dispatch(logout())
      queryClient.invalidateQueries()
      navigate('/'); 
    }
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold flex items-center gap-2">
        <FaBuilding className="text-2xl text-white" />
        <span>EstateHub</span>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={handleLogout} className="bg- text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          <FaSignOutAlt className="text-lg" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
