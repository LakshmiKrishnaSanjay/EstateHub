import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showPropertyAPI } from "../../services/propertyService";
import { addToWishlistAPI, removeFromWishlistAPI } from "../../services/wishlistServices";
import { addReviewAPI, deleteReviewAPI, getReviewsAPI } from "../../services/reviewServices";
import { toast } from 'react-toastify';

export default function RentPropertyDetails() {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showReviewSection, setShowReviewSection] = useState(false);
  const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);

  const queryClient = useQueryClient();
  const userId = useSelector((state) => state.user.id);
  


  const wishlistMutation = useMutation({
    mutationKey: ["toggle-wishlist", id],
    mutationFn: () => (wishlist ? removeFromWishlistAPI(id) : addToWishlistAPI(id)),
    onSuccess: () => {
      setWishlist((prev) => !prev);
      queryClient.invalidateQueries(["wishlist"]);
      alert(`Property ${wishlist ? "removed from" : "added to"} wishlist`);
    },
    onError: () => {
      alert("Something went wrong. Please try again.");
    },
  });

  const toggleWishlist = () => {
    wishlistMutation.mutate();
  };

  const addReviewMutation = useMutation({
    mutationKey: ["add-review"],
    mutationFn: addReviewAPI,
    onSuccess: () => {
      alert("Review submitted successfully!");
      setRating(0);
      setComment("");
      setShowReviewSection(false);
      queryClient.invalidateQueries(["reviews", id]);
    },
    onError: (error) => {
      alert(error.message || "Failed to submit review.");
    },
  });

  const submitReview = () => {
    const reviewData = {
      propertyId: id,
      rating,
      comment,
    };
    addReviewMutation.mutate(reviewData);
  };

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviewsAPI({ propertyId: id }),
    enabled: !!id,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["show-property", id],
    queryFn: () => showPropertyAPI(id),
    enabled: !!id,
  });
  const deleteReviewMutation = useMutation({
    mutationFn: deleteReviewAPI,
    onSuccess: () => {
      // Optional: show toast, refetch reviews, etc.
      toast.success("Review deleted");
      queryClient.invalidateQueries(["reviews", id]); // or however you fetch them
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
  
  

  useEffect(() => {
    if (data) {
      console.log("Agent Profile Pic:", data?.property?.agentId?.profilePic);
      console.log("Owner Profile Pic:", data?.property?.ownerId?.profilePic);
    }
  }, [data]);
  
  const hasUserReviewed = reviews.some(
    (review) => review.user?._id?.toString() === userId?.toString()
  );
  
 
  // console.log("Logged-in userId:", userId);
  // reviews.forEach((review, index) => {
  //   console.log(`Review ${index + 1} - user._id:`, review.user?._id);
  // });


  if (isLoading) return <p className="text-center">Loading property details...</p>;
  if (error) return <p className="text-center text-red-500">Error loading property</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Images */}
      <div className="relative w-full h-[600px] overflow-x-auto whitespace-nowrap">
  {data?.property?.photos?.map((photo, index) => (
    <img
      key={index}
      src={photo}
      alt={`Property ${index + 1}`}
      className="inline-block w-full h-[600px] object-cover mr-2 rounded"
    />
  ))}
</div>

      {/* Info */}
      <h1 className="text-3xl font-bold">{data?.property?.title}</h1>
      <p className="mt-4 text-gray-700">{data?.property?.description}</p>
      <p className="text-xl font-bold mt-2">${data?.property?.price}</p>
      
      
      {/* Details */}
<div className="mt-4">
  <h2 className="text-xl font-semibold">Property Details</h2>
  <ul className="list-disc list-inside mt-2 text-gray-700">
  <li>Type : {data?.property?.propertyType}</li>
    {/* Show Bedrooms and Kitchen only if not land or commercial */}
    {data?.property?.propertyType !== "land" && data?.property?.propertyType !== "commercial" && (
      <>
        <li>Bedrooms: {data?.property?.bedrooms}</li>
        <li>Kitchen: {data?.property?.kitchens || "N/A"}</li>
        <li>Bathrooms: {data?.property?.bathrooms}</li>
      </>
    )}
    <li>Area: {data?.property?.area} sq.ft</li>
    <li>Parking Spot: {data?.property?.parkingSpot ? "Yes" : "No"}</li>
    <li>Features: {data?.property?.features}</li>
    <li>Available: {data?.property?.isAvailable ? "Yes" : "No"}</li>
  </ul>
</div>

<h3 className="text-xl font-bold mt-2">Video Tour</h3>
      <div className="grid grid-cols-4 gap-2">
       
      {data?.property?.videos?.length > 0 && (
        <video controls className="w-full rounded-lg mt-2">
          <source src={data.property?.videos[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}</div>


      {/* Map */}
      <p className="text-xl font-bold mt-3">Location </p>
      <p className="text-gray-700 mt-2">{data?.property?.location}  {data?.property?.district}</p>
      {data?.property?.latitude && data?.property?.longitude && (
        <iframe
          className="w-full md:w-2/3 h-64 rounded-lg shadow-md mt-4"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${data.property?.longitude - 0.01},${data.property?.latitude - 0.01},${data.property?.longitude + 0.01},${data.property?.latitude + 0.01}&layer=mapnik&marker=${data.property?.latitude},${data.property?.longitude}`}
          allowFullScreen
          loading="lazy"
        ></iframe>
      )}

      

<div className="flex flex-col mt-6">
  <p className="text-gray-900 text-xl mb-3">
    Property posted by : {data?.property?.agentId?.username || data?.property?.ownerId?.username}
  </p>

  <Link to={`/user/profileview/${data?.property?.agentId?._id || data?.property?.ownerId?._id}`}>

  <img
    src={data?.property?.agentId?.profilePic || data?.property?.ownerId?.profilePic || "/default-avatar.png"}
    className="w-20 h-20 rounded-full object-cover"
    alt="Profile"
  />
</Link>


</div>


      {/* Buttons */}
      <div className="mt-6 flex gap-4">


        <button className="bg-blue-500 text-white px-6 py-2 rounded" onClick={() => setShowEnquiryPopup(true)}>Enquire Now</button>
        <button
          className={`p-2 rounded-full shadow-lg ${wishlist ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"}`}
          onClick={toggleWishlist}
        >
          <HeartIcon className="w-6 h-6" />
        </button>
      </div>

      
      {/* Enquiry Popup */}
      {showEnquiryPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[url('/images/banner1.jpg')] bg-cover bg-center">
          <div className="bg-white/30 backdrop-blur-md p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Contact Owner/Agent</h2>
            <button
              className="bg-green-500 text-white px-6 py-2 rounded mb-2 w-full"
              onClick={() => window.location.href = `tel:${data?.property?.contactNumber}`}
            >
              Call
            </button>
            {(data?.property?.ownerId)&&(
              <Link to={`/user/chat/${data?.property?.ownerId?._id}/${userId}`}>
                <button className="bg-blue-500 text-white px-6 py-2 rounded w-full">Chat</button>
              </Link>
            )}
            {(data?.property?.agentId)&&(data?.property?.agentId !== data?.property?.ownerId)&&(
              <Link to={`/user/chat/${data?.property?.agentId?._id}/${userId}`}>
                <button className="bg-blue-500 text-white px-6 py-2 rounded w-full">Chat with Agent</button>
              </Link>
            )}
            <button className="mt-4 text-gray-600 underline" onClick={() => setShowEnquiryPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

{/* Review Button (conditionally hidden or disabled) */}
{!hasUserReviewed && (
  <button
    className="mt-6 bg-purple-500 text-white px-6 py-2 rounded"
    onClick={() => setShowReviewSection((prev) => !prev)}
    disabled={hasUserReviewed}  // Disable button if the user has already reviewed
  >
    {showReviewSection ? "Hide Review Section" : "Write a Review"}
  </button>
)}

      {/* Review Form */}
      {showReviewSection && !hasUserReviewed && (
        <div className="mt-6 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">Rate & Comment</h2>
          <label className="block text-lg font-semibold">Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <label className="block text-lg font-semibold">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="3"
            placeholder="Write your review here..."
          />
          <button onClick={submitReview} className="bg-green-500 text-white px-6 py-2 rounded mt-2">
            Submit Review
          </button>
        </div>
      )}

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
    {review.user?._id === userId && (
      <span className="text-sm text-green-600 ml-2">(Your Review)</span>
    )}
  </p>
  <p className="text-yellow-600">Rating: {review.rating} ⭐</p>
  <p className="text-gray-700">{review.comment}</p>

  {review.user?._id === userId && (
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
    </div>
  );
}
