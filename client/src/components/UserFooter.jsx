import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function UserFooter() {
  return (
    <footer className="bg-gradient-to-r from-teal-900 to-teal-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-teal-300">EstateHub</h2>
          <p className="text-teal-100 mt-3 text-sm leading-relaxed">
            Explore the finest properties available. Making home buying and renting effortless.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center">
          <div>
            <h2 className="text-lg font-bold text-teal-300 mb-3">Quick Links</h2>
            <ul className="space-y-2 text-center md:text-left">
              <li><Link to="/user/home" className="text-teal-100 hover:text-teal-400 transition">Home</Link></li>
              <li><Link to="/user/contact" className="text-teal-100 hover:text-teal-400 transition">Contact</Link></li>
              <li><Link to="/user/FAQ" className="text-teal-100 hover:text-teal-400 transition">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex justify-center">
          <div>
            <h2 className="text-lg font-bold text-teal-300 mb-3">Contact Info</h2>
            <p className="text-teal-100 text-sm">📍 456 EstateHub Lane, City, Country</p>
            <p className="text-teal-100 text-sm mt-2">📞 +91 9874561230 </p>
            <p className="text-teal-100 text-sm mt-2">✉️ estatehub2k25@gmail.com</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center md:justify-end space-x-4">
          <a href="#" className="text-teal-100 hover:text-teal-400 transition transform hover:scale-110">
            <FaFacebook size={28} />
          </a>
          <a href="#" className="text-teal-100 hover:text-pink-400 transition transform hover:scale-110">
            <FaInstagram size={28} />
          </a>
          <a href="#" className="text-teal-100 hover:text-teal-400 transition transform hover:scale-110">
            <FaTwitter size={28} />
          </a>
          <a href="#" className="text-teal-100 hover:text-gray-400 transition transform hover:scale-110">
            <FaGithub size={28} />
          </a>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-teal-700 mt-8 pt-6 text-center">
        <p className="text-sm text-teal-100">
          © 2025 EstateHub. All Rights Reserved | Designed by 
          <a href="#" className="text-teal-400 hover:underline ml-1">EstateHub</a>
        </p>
      </div>
    </footer>
  );
}

export default UserFooter;