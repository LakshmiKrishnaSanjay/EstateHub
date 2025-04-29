import React from 'react';
import { FaSearch, FaHome, FaBuilding, FaDollarSign, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
import UserFooter from '../../components/UserFooter';
import { useQuery } from '@tanstack/react-query';
import { getFeaturedPropertiesAPI, getGoodReviewsAPI } from '../../services/propertyService';

function UserHome() {

  const { data: featured, isLoading } = useQuery({
    queryKey: ["featured-properties"],
    queryFn: getFeaturedPropertiesAPI,
  });

  const { data: goodReviews = [] } = useQuery({
    queryKey: ["good-reviews"],
    queryFn: getGoodReviewsAPI,
  });
  
  return (
    <div className="bg-gray-100 pt-2" >
      {/* Hero Section */}
      <div 
        className=" about-banner bg-cover bg-center bg-no-repeat py-40 flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: "url('/images/banner18.jpg')" }}
      >
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-white drop-shadow-md">
            Find Your Dream Property Today!
          </h3>
          <p className="text-white max-w-2xl mx-auto mt-4 text-lg">
            Buy, rent, or sell properties effortlessly with our trusted platform.
          </p>

        

        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 mt-12 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaHome className="text-4xl text-blue-600 mx-auto mb-3" />
            <h4 className="text-xl font-semibold">Buy a Home</h4>
            <p className="text-gray-600 mt-2">Find your perfect home among thousands of listings.</p>
            <Link to='/user/buyaproperty'>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                View Listings
              </button>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaBuilding className="text-4xl text-green-600 mx-auto mb-3" />
            <h4 className="text-xl font-semibold">Rent a Property</h4>
            <p className="text-gray-600 mt-2">Discover rental homes, apartments, and spaces.</p>
            <Link to='/user/rentaproperty'>
              <button className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Explore Rentals
              </button>
            </Link>
          </div>
          
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="container mx-auto px-4 mt-12">
  <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">Featured Properties</h3>

  {isLoading ? (
    <p className="text-center">Loading...</p>
  ) : (
    <div className="grid md:grid-cols-3 gap-6">
      {featured?.map((property) => (
        <div key={property._id} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={property.photos?.[0] || "/images/placeholder.jpg"}
            alt={property.title}
            className="rounded-md w-full h-48 object-cover"
          />
          <h4 className="text-xl font-semibold mt-4">{property.title}</h4>
          <p className="text-gray-600 mt-2">${property.price}</p>
          <Link to={`/user/${property.propertyFor}propertydetails/${property._id}`}>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  )}
</div>



      {/* Call to Action */}
      <div className="container mx-auto px-4 mt-12 text-center">
      

      </div>

       <UserFooter />
    </div>
  );
}

export default UserHome;
