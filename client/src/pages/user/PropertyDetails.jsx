import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showPropertyAPI } from "../../services/propertyService";
import { addToWishlistAPI, removeFromWishlistAPI } from "../../services/wishlistServices";

export default function PropertyDetails() {
  const { id } = useParams();
  const [wishlist, setWishlist] = useState(false);
  const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);

  const queryClient = useQueryClient();

  const wishlistMutation = useMutation({
    mutationKey: ["toggle-wishlist", id],
    mutationFn: () => (wishlist ? removeFromWishlistAPI(id) : addToWishlistAPI(id)),
    onSuccess: (data) => {
      const action = wishlist ? "removed from" : "added to";
      setWishlist((prev) => !prev);
      queryClient.invalidateQueries(["wishlist"]);
      alert(`Property ${action} wishlist`); // Or use a toast if you have one
    },
    onError: () => {
      alert("Something went wrong. Please try again.");
    },
  });
  
const toggleWishlist = () => {
  wishlistMutation.mutate();
};


  const { data, isLoading, error } = useQuery({
    queryKey: ["show-property", id], 
    queryFn: () => showPropertyAPI(id), 
    enabled: !!id, 
  });
  if (isLoading) return <p className="text-center">Loading property details...</p>;
  if (error) return <p className="text-center text-red-500">Error loading property</p>;
  console.log("Lat:", data?.property?.latitude, "Lng:", data?.property?.longitude, typeof data?.property?.latitude);

  
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
      {/* Property Info */}
     
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
      {/* Google Maps Embed */}
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

      {/* Enquiry & Wishlist Buttons */}
      <div className="mt-6 flex gap-4">
        <button 
          className="bg-blue-500 text-white px-6 py-2 rounded"
          onClick={() => setShowEnquiryPopup(true)}
        >
          Enquire Now
        </button>

        <button
          className={`p-2 rounded-full shadow-lg ${
            wishlist ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
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
            <Link to={`/user/chat/${data.property?.userId}`}>
              <button className="bg-blue-500 text-white px-6 py-2 rounded w-full">
                Chat
              </button>
            </Link>
            <button
              className="mt-4 text-gray-600 underline"
              onClick={() => setShowEnquiryPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
