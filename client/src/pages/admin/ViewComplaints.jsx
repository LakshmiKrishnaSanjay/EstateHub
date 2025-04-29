import React, { useState } from "react";
import AdminSideBar from "../../components/AdminSidebar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComplaintAPI, getAllComplaintsAPI, updateComplaintStatusAPI } from "../../services/complaintServices";
import { Link } from "react-router-dom";

const ViewComplaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const queryClient = useQueryClient();

  const { data: complaints = [], isLoading } = useQuery({
    queryKey: ["admin-complaints"],
    queryFn: getAllComplaintsAPI,
  });

  const updateMutation = useMutation({
    mutationFn: updateComplaintStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-complaints"]);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`); // Replace with toast notification if preferred
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComplaintAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-complaints"]);
    },
    onError: (err) => {
      alert("Failed to delete complaint");
    },
  });
  

  const { isPending: isUpdating } = updateMutation;

  const handleUpdate = (id, status, response = "") => {
    updateMutation.mutate({ id, status, response });
  };

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-7xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Customer Complaints</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-3 px-6 text-left">By</th>
                    <th className="py-3 px-6 text-left">Against</th>
                    <th className="py-3 px-6 text-left">Complaint</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">View</th>
                    <th className="py-3 px-6 text-left">Action</th>
                    <th className="py-3 px-6 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((c) => (
                    <tr key={c._id} className="border-t">
                      <td className="py-3 px-6">{c.user?.username}</td>
                      <td className="py-3 px-6">{c.targetUser?.username}</td>
                      <td className="py-3 px-6 truncate max-w-xs">{c.description}</td>
                      <td className="py-3 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            c.status === "Pending"
                              ? "bg-yellow-500"
                              : c.status === "Resolved"
                              ? "bg-green-500"
                              : c.status === "Rejected"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                          onClick={() => setSelectedComplaint(c)}
                        >
                          View More
                        </button>
                      </td>

                      <td className="py-3 px-6 flex gap-2 flex-wrap">
                        {c.status === "Pending" ? (
                          <>
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
                              onClick={() =>
                                handleUpdate(c._id, "Resolved", "Reviewed and marked as resolved")
                              }
                              disabled={isUpdating}
                            >
                              Resolve
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                              onClick={() =>
                                handleUpdate(c._id, "Rejected", "Rejected the complaint")
                              }
                              disabled={isUpdating}
                            >
                              Reject
                            </button>
                          </>

                            ):(
                      <span className="text-gray-500">No action available</span>
                        )}
                      </td>

                      <td className="py-3 px-6">
  <button
    onClick={() => {
      if (window.confirm("Are you sure you want to delete this complaint?")) {
        deleteMutation.mutate(c._id);
      }
    }}
    className="bg-gray-700 text-white px-3 py-1 rounded"
  >
    Delete
  </button>
</td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Modal for View More */}
              {selectedComplaint && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                    <h3 className="text-xl font-bold mb-4">Complaint Details</h3>
                    <p><strong>From:</strong> {selectedComplaint.user?.username}</p>
                    <p className="mt-2"><strong>Email:</strong> {selectedComplaint.user?.email}</p>
                    <p className="mt-2"><strong>Against:</strong> {selectedComplaint.targetUser?.username}</p>
                    <p className="mt-2"><strong>Complaint:</strong> {selectedComplaint.description}</p>
                    <p className="mt-2"><strong>Status:</strong> {selectedComplaint.status}</p>
                    {selectedComplaint.response && (
                      <p className="mt-2"><strong>Admin Response:</strong> {selectedComplaint.response}</p>
                    )}

                    <div className="mt-4 flex justify-between">
                      <Link to={`/admin/viewmore/${selectedComplaint.targetUser?._id}`}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded">
                          View Target User
                        </button>
                      </Link>

                      <button
                        onClick={() => setSelectedComplaint(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewComplaints;