import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCustomersAPI } from "../../services/chatServices";
import { useSelector } from "react-redux";

export default function Message() {
  const { data: chats = [], isLoading } = useQuery({
    queryKey: ["user-chats"],
    queryFn: getCustomersAPI,
  });

  const userId = useSelector((state) => state.user.id);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-semibold mb-4">Owner/Agents</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : chats.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {chats.map((chat) => (
            <li
              key={chat._id}
              className="p-4 border rounded hover:bg-gray-50 transition flex items-center gap-4"
            >
              {/* Profile Pic */}
              <img
                src={chat.profilePic || "/default-avatar.png"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border"
              />

              {/* Username and link */}
              <div>
                <div className="font-medium text-lg">
                  {chat.username || "Unknown User"}
                </div>
                <Link
                  to={`/user/chat/${chat.id}/${userId}`}
                  className="text-blue-500 text-sm mt-1 inline-block"
                >
                  View Chat
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
