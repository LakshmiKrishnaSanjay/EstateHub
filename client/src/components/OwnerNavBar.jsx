import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaBell,
  FaBuilding,
  FaSignOutAlt,
  FaIdBadge,
  FaEnvelope,
} from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { getProfileAPI } from "../services/userService";
import { getNotificationsAPI } from "../services/notificationServices";

const OwnerNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true);
  const [hasmessages, setHasMessages] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const location = useLocation(); // <-- added
  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotificationsAPI,
  });
  

  const profilePic = data?.user?.profilePic;
  const unreadCount = notifications.filter(n => !n.read).length;


  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      sessionStorage.clear();
      dispatch(logout());
      queryClient.invalidateQueries();
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md pr-20">
      {/* Logo */}
      <h1 className="font-bold text-lg flex items-center space-x-2">
        <FaBuilding className="text-blue-400" />
        <span>
          <span className="text-blue-100">Estate</span>
          <span className="text-blue-400">Hub</span>
        </span>
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-8 relative">
        {/* Show only if not on profile page */}
        {location.pathname !== "/owner/profile" && (
          <>

{/* Messages Icon */}

<div className="relative">
              <Link
                to="/owner/messages"
                className="relative hover:text-gray-300"
              >
                <FaEnvelope size={24} />

              </Link>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <Link
                to="/owner/notifications"
                className="relative hover:text-gray-300"
              >
                <FaBell size={20} color="gold"/>
                {unreadCount > 0 && (
  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
    {unreadCount}
  </span>
)}


              </Link>
            </div>
          </>
        )}

        {/* Profile Icon + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="focus:outline-none"
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border"
              />
            ) : (
              <FaUserCircle size={24} />
            )}
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-lg w-44 z-50">
              <Link
                to="/owner/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
              >
                <FaIdBadge /> View Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavBar;
