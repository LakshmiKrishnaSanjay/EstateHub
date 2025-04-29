import React from 'react';
import { FaBell, FaEnvelope, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { logout } from '../redux/userSlice';
import { getProfileAPI } from '../services/userService';
import { getNotificationsAPI } from '../services/notificationServices';

function UserNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAPI,
  });

    const { data: notifications = [] } = useQuery({
      queryKey: ["notifications"],
      queryFn: getNotificationsAPI,
    });

  const profilePic = data?.user?.profilePic || 'https://via.placeholder.com/40';
  const unreadCount = notifications.filter(n => !n.read).length;


  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      sessionStorage.clear();
      dispatch(logout());
      queryClient.invalidateQueries();
      navigate('/');
    }
  };

  return (
    <div className='bg-teal-900 text-white'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        {/* Left section for the logo */}
        <Link to='/user/home'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-white'>Estate</span>
            <span className='text-teal-100'>Hub</span>
          </h1>
        </Link>
  
        {/* Right section for navigation links */}
        <div className='flex items-center gap-4'>
          <ul className='flex gap-4 items-center'>
  
            {/* Profile link */}
            <Link to='/user/profile'>
              <li className='hover:underline flex items-center gap-2'>
                <img
                  src={profilePic}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover border border-white"
                />
                Profile
              </li>
            </Link>

            
                        {/* Notification Bell */}
                        <div className="relative">
                          <Link
                            to="/user/notifications"
                            className="relative hover:text-gray-300"
                          >
                            <FaBell />
                            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {unreadCount}
              </span>
            )}
            
            
                          </Link>
                        </div>
  
            {/* Wishlist link */}
            <Link to='/user/wishlist'>
              <li className='hover:underline flex items-center gap-2'>
                <FaHeart className="text-red-400" />
                Wishlist
              </li>
            </Link>

            {/* Messages Icon */}
            <Link to='/user/messages'>
              <li className='hover:underline flex items-center gap-2'>
                <FaEnvelope className="text-white" />
                Messages
              </li>
            </Link>
  
            {/* Logout */}
            <li
              className='hover:underline cursor-pointer'
              onClick={handleLogout}
            >
              Sign Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
  
}

export default UserNavBar;
