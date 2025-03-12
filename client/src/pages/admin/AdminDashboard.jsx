import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaMapMarkerAlt,  FaChartPie,  FaUser, FaEnvelopeOpenText,  FaMoneyBill } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const AdminDashboard = () => {
  const [chartDropdown, setChartDropdown] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white p-6 flex flex-col">
        
        <ul className="space-y-4 flex-1">
          <li>
            <a href="/admin/dashboard" className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded">
              <FaTachometerAlt /> Dashboard
            </a>
          </li>
         

          <li>
            <a href="/admin/viewcustomers" className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded">
              <FaUser /> View User
            </a>
          </li>

          <li>
            <a href="/admin/viewcomplaints" className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded">
              <FaEnvelopeOpenText /> Complaints
            </a>
          </li>
          
          
          <li>
            <a href="/admin/paymentdetails" className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded">
              <FaMoneyBill /> Payment History
            </a>
          </li>


          <li>
            <button onClick={() => setChartDropdown(!chartDropdown)} className="w-full flex items-center justify-between py-2 px-4 hover:bg-gray-700 rounded">
              <div className="flex items-center gap-3">
                <FaChartPie /> Charts
              </div>
              <IoMdArrowDropdown />
            </button>
            {chartDropdown && (
              <ul className="pl-6 mt-2 space-y-2">
                <li><a href="/admin/piechart" className="block py-2 px-4 hover:bg-gray-600 rounded">Pie Chart</a></li>
                <li><a href="/admin/datewisereport" className="block py-2 px-4 hover:bg-gray-600 rounded">Date-wise Report</a></li>
              </ul>
            )}
          </li>

          
        </ul>
        <div className="mt-auto">
          
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4">Welcome to EstateHub Admin</h3>
          <p>Manage real estate services efficiently.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
