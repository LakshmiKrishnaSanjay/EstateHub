import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSideBar from "../../components/AdminSidebar";
import { deleteUserById, getUserById, verifyUserById,  } from "../../services/adminService"; // adjust paths if needed

const ViewMoreProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(id)
      .then((res) => {
        console.log("Fetched user:", res);
        setUser(res.user); // access nested user
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUserById(id);
      alert("User deleted successfully.");
      navigate("/admin/viewcustomers");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete user.");
    }
  };

  

  const handleVerify = async () => {
    try {
      const res = await verifyUserById(user._id);
      setUser((prev) => ({ ...prev, verified: true })); // update UI
      alert("User verified successfully");
    } catch (err) {
      console.error("Verification failed:", err);
      alert("Failed to verify user");
    }
  };
  

  if (loading) return <div className="flex-1 p-6">Loading...</div>;
  if (!user) return <div className="flex-1 p-6">User not found.</div>;

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile
          </h2>

          <div className="flex gap-6 items-start mb-6">
            <img
              src={user.profilePic || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
              <p><strong>Role:</strong> {user.role}</p>


            </div>
          </div>

          {user.role === "agent" && (
            <div className="mb-4 space-y-2">
              <p><strong>License Number:</strong> {user.licenseNumber || "N/A"}</p>
              <p><strong>Experience:</strong> {user.experience || "N/A"} years</p>
            </div>
          )}
{user.role !== "customer" &&(
<p className="flex items-center gap-2">
  <strong>Average Rating:</strong> {user.averageRating || 0} / 5
  <span className="flex text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < Math.round(user.averageRating) ? "fill-yellow-400" : "fill-gray-300"
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.112 3.415a1 1 0 00.95.69h3.584c.969 0 1.371 1.24.588 1.81l-2.9 2.1a1 1 0 00-.364 1.118l1.113 3.415c.3.922-.755 1.688-1.54 1.118l-2.9-2.1a1 1 0 00-1.176 0l-2.9 2.1c-.784.57-1.838-.196-1.539-1.118l1.112-3.415a1 1 0 00-.364-1.118l-2.9-2.1c-.784-.57-.38-1.81.588-1.81h3.584a1 1 0 00.95-.69l1.113-3.415z" />
      </svg>
    ))}
  </span>
</p>)}
{user.role !== "customer" &&(
  <p className="flex items-center gap-2 mt-5">
  <strong>Subscription:</strong> 
  {(user.subscription === "vip" || user.subscription === "premium" || user.subscription === "basic" || user.subscription === "default") && (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded ${user.subscription === "vip"
          ? "bg-purple-600 text-white"
          : user.subscription === "premium"
          ? "bg-yellow-500 text-white"
          : user.subscription === "basic"
          ? "bg-blue-500 text-white"
          : "bg-gray-500 text-white"}`}
    >
      {user.subscription === "vip" ? "VIP Member" : 
       user.subscription === "premium" ? "Premium Member" : 
       user.subscription === "basic" ? "Basic Member" : "Default Member"}
    </span>
  )}
</p>

) }

          <p className="mt-6 text-green-600 font-semibold">
            Profile Status: {user.verified ? "Verified" : "Pending"}
          </p>

          <div className="flex gap-4 mt-6">
          {!user.verified && (
  <button
    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    onClick={handleVerify}
  >
    Verify
  </button>
)}


            <button
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreProfile;
