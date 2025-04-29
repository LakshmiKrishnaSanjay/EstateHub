import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileByUserIdAPI } from "../../services/propertyService";
import { addReviewToUserAPI, deleteReviewAPI } from "../../services/reviewServices";
import { getDecodedData } from "../../utils/storageHandler";
import { addComplaintAPI } from "../../services/complaintServices";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const ProfileView = () => {
  const { userId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [complaintText, setComplaintText] = useState("");


  // console.log("userId", userId)

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => getProfileByUserIdAPI(userId),
    enabled: !!userId,
  });
console.log(data);

  const addReviewMutation = useMutation({
    mutationKey: ["add-user-review"],mutationFn: ({ userId, reviewData }) =>
        addReviewToUserAPI(userId, reviewData),
      
    onSuccess: () => {
      alert("Review submitted successfully!");
      setRating(0);
      setComment("");
      queryClient.invalidateQueries(["user-profile", userId]);
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Failed to submit review.");
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: deleteReviewAPI,
    onSuccess: () => {
      toast.success("Review deleted");
      queryClient.invalidateQueries(["user-profile", userId]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete review");
    },
  });

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReviewMutation.mutate(reviewId);
    }
  };

  const submitReview = () => {
    const reviewData = {
      rating,
      comment,
    };
    addReviewMutation.mutate({ userId, reviewData });
  };
  

  const handleSubmitReview = () => {
    if (!comment || rating === 0) {
      return alert("Please add a comment and rating");
    }
    submitReview();
  };
  
  const handleSubmitComplaint = () => {
    setShowModal(true);
  };

  

  const handleSend = async () => {
    if (!complaintText.trim()) {
      return alert("Please enter a complaint before submitting.");
    }
  
    try {
      const payload = {
        targetUser: userId,            // from URL params
        description: complaintText,    // complaint text
      };
  
      await addComplaintAPI(payload);
  
      alert("Complaint submitted successfully!");
      setShowModal(false);
      setComplaintText("");
    } catch (err) {
      alert(err?.message || "Failed to submit complaint.");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;
  
  console.log("Profile data:", data);

  const { roleData, reviews, _id: profileUserId } = data;
  console.log("Reviews:", reviews);

  const loggedInUser = getDecodedData();
  const loggedInUserId = loggedInUser?.id;

  
  console.log(reviews);
  
  const hasUserReviewed = reviews.some(
    (review) => review.user?._id?.toString() === loggedInUserId?.toString()
  );
  
  
  // console.log("Review user IDs:", reviews.map(r => r.user?._id));
  // console.log("Logged in user ID:", loggedInUserId);
  
  // console.log("Has user reviewed:", hasUserReviewed);
  // console.log("decoded data",getDecodedData());

  
  
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded shadow bg-white">
      <div className="flex flex-col items-center">
        <img
          src={roleData?.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border mb-4"
        />
        <h2 className="text-2xl font-bold">{data?.username}</h2>
        <p className="text-gray-700">📧 {data?.email}</p>
        <p className="text-gray-700">📞 {data?.phone}</p>
        <p className="text-gray-700">{data?.role}</p>
        <p className="text-yellow-600 mt-2 font-medium">
          ⭐ Average Rating: {data?.averageRating || "N/A"}
        </p>
        {(data.role === "agent" ) && (
          <div className="mt-4 text-center">
            <p>🏢 License: {roleData.licenseNumber || "N/A"}</p>
            <p>🧑‍💼 Experience: {roleData.experience || "N/A"} years</p>
            <p>📝 Bio: {roleData.bio || "No bio provided."}</p>
          </div>
        )}
      </div>

{/* Add Review Section - only show if not already reviewed */}
{!hasUserReviewed && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
    <div className="flex items-center space-x-1 mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl cursor-pointer ${
            (hoveredStar || rating) >= star ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          ★
        </span>
      ))}
    </div>
    <textarea
      rows={4}
      className="w-full border p-2 rounded"
      placeholder="Leave your comment..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
    <button
      onClick={handleSubmitReview}
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Submit Review
    </button>
    
  </div>
)}




      {/* Show User Reviews */}
      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">User Reviews</h2>
        {reviews.length > 0 ? (
          <>
            <p className="text-yellow-600 font-medium mb-4">
              Average Rating: {(
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              ).toFixed(1)} ⭐
            </p>

            <div className="space-y-4">
            {reviews.map((review) => (
  <div key={review._id} className="relative border p-4 rounded-lg bg-gray-100">
    <p className="font-semibold text-gray-800">
      {review?.user?.name || "Anonymous"}
      {/* Check if this review belongs to the logged-in user */}
      {review.user?._id?.toString() === loggedInUserId?.toString() && (
        <span className="text-sm text-green-600 ml-2">(Your Review)</span>
      )}
    </p>
    <p className="text-yellow-600">Rating: {review.rating} ⭐</p>
    <p className="text-gray-700">{review.comment}</p>

    {/* Show delete button only for the logged-in user's review */}
    {review.user?._id?.toString() === loggedInUserId?.toString() && (
      <button
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
        onClick={() => handleDeleteReview(review._id)}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    )}
  </div>
))}

            </div>
          </>
        ) : (
          <p className="mt-4 text-gray-500">No reviews yet. Be the first to review!</p>
        )}
      </div>


      <div className="flex flex-col items-center mt-10">
      <button
        onClick={handleSubmitComplaint}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Write a Complaint
      </button>
      <p className="text-red-600 mt-2">
        *Please write clearly and respectfully
      </p>

      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-15 rounded shadow-lg w-300">
            <h2 className="text-lg font-bold mb-4">Write your complaint</h2>
            <textarea
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              rows="6"
              className="w-full p-5 border rounded mb-4"
              placeholder="Enter your complaint here..."
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>


    </div>
  );
};

export default ProfileView;
