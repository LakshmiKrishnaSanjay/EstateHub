import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";

import OwnerFooter from "../../components/OwnerFooter";
import { deletePropertyAPI,  showPropertyAPI } from "../../services/propertyService";
import { toast } from "react-toastify";

const ViewMoreProperty = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["show-property", id], // Include ID in the queryKey to refetch when ID changes
    queryFn: () => showPropertyAPI(id), // Pass ID to API function
    enabled: !!id, // Ensures the query runs only when ID is available
  });
console.log(data);
const [showReviews, setShowReviews] = useState(false);

  const navigate = useNavigate();

const handleDelete = async () => {
  if (window.confirm("Are you sure you want to delete this property?")) {
    try {
      await deletePropertyAPI(id); // id from useParams
      toast.success("Property deleted successfully");
      navigate("/owner/viewproperty"); // Redirect to list
    } catch (err) {
      toast.error(err.message || "Failed to delete property");
    }
  }
};


  
  return (
    <div>
        <div className="mt-2"></div>
      {/* Property Banner */}
      {/* <div className="relative w-full h-[600px] overflow-x-auto whitespace-nowrap">
  {data?.property?.photos?.map((photo, index) => (
    <img
      key={index}
      src={photo}
      alt={`Property ${index + 1}`}
      className="inline-block w-full h-96 object-cover mr-2 rounded"
    />
  ))}
</div> */}
  

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

      

      

      {/* Property Details Section */}
      <div className="container mx-auto p-6">
  <h2 className="text-3xl font-bold mb-4">{data?.property?.title}</h2>
  <p className="text-lg text-gray-700 mb-6">
    {data?.property?.description}
  </p>

  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <h3 className="text-2xl font-semibold mb-2">Property Details</h3>
      <p className="text-lg mb-2"><strong>Property For: </strong> 
    {data?.property?.propertyFor === "buy" ? "Sale" : "Rent"}
  </p>
      <p className="text-lg mb-2"><strong>Price:</strong> {data?.property?.price.toLocaleString()}</p>
      {data?.property?.bedrooms != null && (
  <p className="text-lg mb-2"><strong>Bedrooms:</strong> {data?.property?.bedrooms}</p>
)}

{data?.property?.bathrooms != null && (
  <p className="text-lg mb-2"><strong>Bathrooms:</strong> {data?.property?.bathrooms}</p>
)}

{data?.property?.kitchens != null && (
  <p className="text-lg mb-2"><strong>Kitchen:</strong> {data?.property?.kitchens}</p>
)}

<p className="text-lg mb-2">
  <strong>Available:</strong> {data?.property?.isAvailable ? "Yes" : "No"}
</p>


      <p className="text-lg mb-2"><strong>Area:</strong> {data?.property?.area} sq. ft.</p>
      <p className="text-lg mb-2">
  <strong>Location:</strong>{" "}
  {(data?.property?.location || "").trim()}


</p>
{data?.property?.propertyFor === "rent" && (
      <p className="text-lg mb-2"><strong>Average Rating:</strong> {data?.property?.averageRating} ⭐</p>

)}  

      <h3 className="text-xl font-semibold mt-4">Features</h3>
      <ul className="list-disc pl-5">
      {data?.property?.features} 
        {/* {data?.features?.map((feature, index) => (
          <li key={index} className="text-lg">{feature}</li>
        ))} */}
      </ul>

      {data?.reviews?.length > 0 && (
  <div className="mt-10">
    <h3
      className="text-2xl font-semibold mb-4 cursor-pointer text-green-600 hover:underline"
      onClick={() => setShowReviews(!showReviews)}
    >
      {showReviews ? "Hide Reviews" : "Show Reviews"}
    </h3>

    {showReviews && (
      <div className="space-y-4 bg-gray-100 p-4 rounded-lg shadow-md">
        {data.reviews.map((review) => (
          <div key={review._id} className="p-3 bg-white rounded shadow">
            <p className="font-medium text-gray-800">
              {review.user?.username || "Anonymous"}
            </p>
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-gray-500">Rating: {review.rating} ⭐</p>
          </div>
        ))}
      </div>
    )}
  </div>
)}

    </div>

    <div>
      <h3 className="text-2xl font-semibold mb-2">Images</h3>
      <div className="grid grid-cols-2 gap-2">
        {data?.property?.photos?.map((photo, index) => (
          <img key={index} src={photo} alt={`Property ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
        ))}
      </div>

      <h3 className="text-2xl font-semibold mt-4">Video Tour</h3>
      {data?.property?.videos?.length > 0 && (
        <video controls className="w-full rounded-lg mt-2">
          <source src={data.property?.videos[0]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>



  </div>


        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          {/* <Link to="owner/viewproperty"
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600 transition"
          >
            Back to Listings
          </Link> */}
          <div className="flex gap-4">
          <Link to={`/owner/editproperty/${id}`}
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Property
            </Link>
            <button
  className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 transition"
  onClick={handleDelete}
>
  Delete Property
</button>


          </div>
        </div>
      </div>

      <OwnerFooter />
    </div>
  );
};

export default ViewMoreProperty;
