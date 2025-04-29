import React, { useState } from "react";
import { FaTachometerAlt, FaMapMarkerAlt, FaChartPie, FaFileAlt, FaUser, FaEnvelopeOpenText, FaMoneyBill } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const AdminSideBar = () => {
  
  const [chartDropdown, setChartDropdown] = useState(false);

  return (
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
              <FaChartPie />Date-wise Report
            </a>
          </li>
     
               
             </ul>
    </aside>
  );
};

export default AdminSideBar;