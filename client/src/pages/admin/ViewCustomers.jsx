import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminSideBar from "../../components/AdminSidebar";

const ViewCustomers = () => {
    const [selectedRole, setSelectedRole] = useState("customer"); // Default to "customer"

    const customers = [
        { id: 1, name: "John Doe", email: "johndoe@example.com", image: "https://via.placeholder.com/40", role: "customer" },
        { id: 2, name: "Jane Smith", email: "janesmith@example.com", image: "https://via.placeholder.com/40", role: "owner" },
        { id: 3, name: "Mark Johnson", email: "markjohnson@example.com", image: "https://via.placeholder.com/40", role: "agent" }
    ];

    // Filter customers based on selected role
    const filteredCustomers = customers.filter(customer => customer.role === selectedRole);

    return (
        <div className="min-h-screen flex">
            <AdminSideBar />
            <div className="flex-1 p-6 bg-gray-100">
                <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Customer List</h2>

                    {/* Role Selection */}
                    <div className="mb-4 flex gap-4">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="role" value="customer" checked={selectedRole === "customer"} onChange={() => setSelectedRole("customer")} />
                            Customers
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="role" value="owner" checked={selectedRole === "owner"} onChange={() => setSelectedRole("owner")} />
                            Owners
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="role" value="agent" checked={selectedRole === "agent"} onChange={() => setSelectedRole("agent")} />
                            Agents
                        </label>
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
                                    filteredCustomers.map((customer) => (
                                        <tr key={customer.id} className="border-t">
                                            <td className="py-3 px-6 flex items-center">
                                                <img src={customer.image} alt="Profile" className="w-10 h-10 rounded-full" />
                                            </td>
                                            <td className="py-3 px-6">{customer.name}</td>
                                            <td className="py-3 px-6">{customer.email}</td>
                                            <td className="py-3 px-6">
                                                <Link to="/admin/viewmore">
                                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                                        View More
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-3">No {selectedRole}s found.</td>
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
