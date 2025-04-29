import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPaymentReportAPI } from "../../services/chartServices";
import AdminSideBar from "../../components/AdminSideBar";

const DateWiseReport = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["payment-report", from, to],
    queryFn: () => getPaymentReportAPI(from, to),
  });

  const handleClearFilters = () => {
    setFrom("");
    setTo("");
  };
console.log(data);

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="p-6 bg-blue-50 rounded-lg shadow w-full  mx-auto">
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">Date-Wise Report</h2>

        <div className="flex gap-4 mb-6">
          <div className="flex flex-col w-1/2">
            <label className="mb-1 text-blue-700 font-medium">From Date</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border border-blue-300 p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-1 text-blue-700 font-medium">To Date</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border border-blue-300 p-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-2 text-blue-800 font-medium mb-6">
  <h3>Total Revenue: ₹{data?.totalRevenue || 0}</h3>
  <h3 className="text-green-600">Agent Revenue: ₹{data?.agentRevenue || 0}</h3>
  <h3 className="text-blue-600">Owner Revenue: ₹{data?.ownerRevenue || 0}</h3>
</div>

          {(from || to) && (
            <button
              onClick={handleClearFilters}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Clear Filters
            </button>
          )}
        </div>

        {isLoading ? (
          <p className="text-blue-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-200">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="border border-blue-200 p-3 text-left font-semibold">User</th>
                  <th className="border border-blue-200 p-3 text-left font-semibold">Plan</th>
                  <th className="border border-blue-200 p-3 text-left font-semibold">Date</th>
                  <th className="border border-blue-200 p-3 text-left font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
              {data?.payments?.length > 0 ? (
  data.payments.map((p) => (
    <tr key={p._id} className="hover:bg-blue-50 transition">
      <td className="border border-blue-200 p-3">
        {p.user?.name || "Unknown"}{" "}
        <span
          className={`ml-1 font-semibold ${
            p.user?.role === "agent"
              ? "text-green-600"
              : p.user?.role === "owner"
              ? "text-blue-600"
              : "text-gray-500"
          }`}
        >
          ({p.user?.role})
        </span>
      </td>
      <td className="border border-blue-200 p-3">{p.paymentPlan}</td>
      <td className="border border-blue-200 p-3">
        {new Date(p.paymentDate).toLocaleDateString()}
      </td>
      <td className="border border-blue-200 p-3">₹{p.amount}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="4" className="border border-blue-200 p-3 text-center text-blue-600">
      No payments found
    </td>
  </tr>
)}

              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateWiseReport;