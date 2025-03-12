import React from "react";
import AdminSideBar from "../../components/AdminSidebar";

const complaints = [
  {
    id: 1,
    customerName: "John Doe",
    email: "johndoe@example.com",
    complaint: "The listing images are not loading properly.",
    status: "Pending",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    email: "janesmith@example.com",
    complaint: "Payment issues while booking a property.",
    status: "Resolved",
  },
];

const ViewComplaints = () => {
  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-5xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Customer Complaints</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-6 text-left">Customer</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Complaint</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="border-t">
                    <td className="py-3 px-6">{complaint.customerName}</td>
                    <td className="py-3 px-6">{complaint.email}</td>
                    <td className="py-3 px-6">{complaint.complaint}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          complaint.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 flex gap-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        Resolve
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaints;
