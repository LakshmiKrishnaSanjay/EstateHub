import React from "react";
import UserFooter from "../../components/UserFooter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    deleteAllNotificationsAPI,
  deleteNotificationAPI,
  getNotificationsAPI,
  markNotificationAsReadAPI,
} from "../../services/notificationServices";

const UserNotification = () => {
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotificationsAPI,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsReadAPI,
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotificationAPI,
    onSuccess: () => queryClient.invalidateQueries(["notifications"]),
  });
    const deleteAllMutation = useMutation({
      mutationFn: deleteAllNotificationsAPI,
      onSuccess: () => {
        queryClient.invalidateQueries(["notifications"]);
        alert("All notifications deleted successfully.");
      },
      onError: () => {
        alert("Failed to delete notifications.");
      },
    });
    
    const handleDeleteAll = () => {
      if (window.confirm("Are you sure you want to delete all notifications?")) {
        deleteAllMutation.mutate();
      }
    };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading notifications...</div>;
  if (isError) return <div className="min-h-screen flex items-center justify-center">Failed to load notifications.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">🔔 UserNotification</h2>
        <div className="space-y-6">
          {notifications.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">No notifications found.</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-6 rounded-lg shadow-md border ${
                  notification.read ? "bg-white" : "bg-yellow-50 border-yellow-300"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p
                      className="text-base text-gray-800"
                      dangerouslySetInnerHTML={{ __html: notification.message }}
                    ></p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {new Date(notification.date).toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                  {notification.complaintId && (
                    <a
                      href={`/complaints/${notification.complaintId}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      View Complaint
                    </a>
                  )}

                  {!notification.read && (
                    <button
                      onClick={() => markAsReadMutation.mutate(notification._id)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => deleteMutation.mutate(notification._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
                    {notifications.length > 0 && (
  <div className="flex justify-end mb-4">
    <button
      onClick={handleDeleteAll}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Delete All
    </button>
  </div>
)}
        </div>
      </main>
      <UserFooter />
    </div>
  );
};

export default UserNotification;
