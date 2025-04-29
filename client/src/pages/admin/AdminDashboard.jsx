import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaMapMarkerAlt, FaChartPie, FaUser, FaEnvelopeOpenText, FaMoneyBill } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { getDashboardCountsAPI } from "../../services/adminService";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const [chartDropdown, setChartDropdown] = useState(false);

  const { data: counts = {}, isLoading, error } = useQuery({
    queryKey: ["counts"],
    queryFn: getDashboardCountsAPI,
  });
console.log("Counts:", counts);

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">Error loading data</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 text-white p-6 flex flex-col">
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
            <a href="/admin/propertytypebarchart" className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded">
              <FaChartPie /> Chart
            </a>
          </li>
          <li>
            <a href="/admin/datewisereport" className="flex items-center gap-3 py-2 px-4 hover:bg-gray-700 rounded">
              <FaChartPie /> Date-wise Report
            </a>
          </li>
        </ul>
        <div className="mt-auto"></div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Welcome Card */}
        <div>
          <h3 className="text-xl font-medium mb-4">Welcome Admin</h3>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
          {/* Total Customers */}
          <div className="bg-blue-400 rounded-lg shadow-md p-6 text-center">
            <h4 className="text-gray-900 text-lg mb-2">Total Customers</h4>
            <p className="text-2xl font-bold text-gray-900">{counts.totalUsers || 0}</p>
          </div>

          {/* Total Properties */}
          <div className="bg-red-800 rounded-lg shadow-md p-6 text-center">
            <h4 className="text-gray-900 text-lg mb-2">Total Properties</h4>
            <p className="text-2xl font-bold text-gray-900">{counts.totalProperties || 0}</p>
          
          </div>

          {/* Total Revenue */}
          <div className="bg-green-400 rounded-lg shadow-md p-6 text-center">
            <h4 className="text-gray-900 text-lg mb-2">Total Revenue</h4>
            <p className="text-2xl font-bold text-gray-900">₹{counts.totalAmount || 0}</p>
          </div>

          {/* VIP Customers */}
          <div className="bg-yellow-400 rounded-lg shadow-md p-6 text-center">
            <h4 className="text-gray-900 text-lg mb-2">VIP Customers </h4>
            <p className="text-2xl font-bold text-gray-900">{counts.totalVIPCustomers || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
