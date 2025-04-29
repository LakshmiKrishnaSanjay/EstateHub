import React, { useEffect, useState } from "react";

import { getAllPayments } from "../../services/adminService";
import AdminSideBar from "../../components/AdminSideBar";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getAllPayments();
        setPayments(res.data); // assuming your API returns { data: [...] }
      } catch (err) {
        console.error("Failed to fetch payments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  console.log(payments);
  
  

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-1 p-8 bg-gray-100">
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

          {loading ? (
            <p>Loading...</p>
          ) : payments.length === 0 ? (
            <p className="text-gray-500">No payment records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Role</th>
                    <th className="py-3 px-4 text-left">Plan</th>
                    <th className="py-3 px-4 text-left">Property Limit</th>
                    <th className="py-3 px-4 text-left">Method</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => {
                    const user = payment.agentId || payment.ownerId;
                    const role = payment.agentId ? "Agent" : payment.ownerId ? "Owner" : "N/A";

                    return (
                      <tr key={index} className="border-t">
                        <td className="py-3 px-4">{user?.name || "N/A"}</td>
                        <td className="py-3 px-4">{user?.email || "N/A"}</td>
                        <td className="py-3 px-4">{user?.role}</td>
                        <td className="py-3 px-4 capitalize">{payment.paymentPlan}</td>
                        <td className="py-3 px-4">{payment.propertyLimit}</td>
                        <td className="py-3 px-4 capitalize">{payment.paymentMethod}</td>

                        <td className="py-3 px-4 font-semibold text-green-600">₹{payment.amount}</td>

                        <td className="py-3 px-4 capitalize">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              payment.paymentStatus === "completed"
                                ? "bg-green-500"
                                : payment.paymentStatus === "pending"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          >
                            {payment.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
