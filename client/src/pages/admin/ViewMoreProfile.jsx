import React, { useState } from "react";
import AdminSideBar from "../../components/AdminSidebar";

const ViewMoreProfile = () => {
  const [role, setRole] = useState("customer"); // Default role

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Customer Details</h2>
          
          {/* Role Selection */}
          <div className="mb-4 flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="customer" checked={role === "customer"} onChange={() => setRole("customer")} />
              Customer
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="owner" checked={role === "owner"} onChange={() => setRole("owner")} />
              Owner
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="role" value="agent" checked={role === "agent"} onChange={() => setRole("agent")} />
              Agent
            </label>
          </div>

          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Phone:</strong> +1234567890</p>
          <p><strong>Role:</strong> {role}</p>
          
          {role === "agent" && (
            <>
              <p><strong>License Number:</strong> 12345-XYZ</p>
              <p><strong>Experience:</strong> 5 Years</p>
            </>
          )}
          
          <p className="mt-4 font-semibold text-green-600">Profile Status: Completed</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreProfile;