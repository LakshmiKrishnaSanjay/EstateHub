import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../services/adminService";
import AdminSideBar from "../../components/AdminSideBar";

const ViewCustomers = () => {
  const [selectedRole, setSelectedRole] = useState("customer");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log("Fetched users:", res);
        const userList = Array.isArray(res) ? res : res?.users;
        setUsers(Array.isArray(userList) ? userList : []);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
        setUsers([]);
      });
  }, []);

  const filteredCustomers = users?.filter(
    (user) => user?.role?.toLowerCase() === selectedRole
  ) || [];

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Customer List</h2>

          {/* Role Selection */}
          <div className="mb-4 flex gap-4">
            {["customer", "owner", "agent"].map((role) => (
              <label key={role} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value={role}
                  checked={selectedRole === role}
                  onChange={() => setSelectedRole(role)}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}s
              </label>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-6 text-left">Profile</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((user) => (
                    <tr key={user._id} className="border-t">
                      <td className="py-3 px-6 flex items-center">
                      <img src={user?.profilePic || "/images/l1.jpg"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                           e.target.onerror = null;
                            e.target.src = "/images/l1.jpg";
                                   }}
                                       />

                      </td> 
                      <td className="py-3 px-6">{user.name}</td>
                      <td className="py-3 px-6">{user.email}</td>
                      <td className="py-3 px-6">
                        <Link to={`/admin/viewmore/${user._id}`}>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            View More
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      No {selectedRole}s found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomers;
