import React from "react";
import AdminSideBar from "../../components/AdminSidebar";

const PaymentHistory = () => {
    return (
        <div className="min-h-screen flex">
            <AdminSideBar />
            <div className="flex-1 p-8 bg-gray-100">
                <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-3 px-6 text-left">Username</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-left">Phone</th>
                                    <th className="py-3 px-6 text-left">Paid Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="py-3 px-6">John Doe</td>
                                    <td className="py-3 px-6">johndoe@example.com</td>
                                    <td className="py-3 px-6">9876543210</td>
                                    <td className="py-3 px-6 font-semibold text-green-600">₹5000</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-3 px-6">Jane Smith</td>
                                    <td className="py-3 px-6">janesmith@example.com</td>
                                    <td className="py-3 px-6">9123456789</td>
                                    <td className="py-3 px-6 font-semibold text-green-600">₹3000</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="text-center py-3 text-gray-500">
                                        No more payments.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
