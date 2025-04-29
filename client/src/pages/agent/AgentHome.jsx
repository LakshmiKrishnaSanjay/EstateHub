import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaList } from "react-icons/fa";
import AgentFooter from "../../components/AgentFooter";
import { useSelector } from "react-redux";

const AgentHome = () => {
    const { verified } = useSelector((state) => state.user);
  
    useEffect(() => {
      console.log(verified);
    }, [verified]);
  
  return (
    <div className="bg-gray-100 pt-2">
      {/* Hero Section */}
      <div 
        className="about-banner bg-cover bg-center bg-no-repeat py-40 flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: "url('/images/banner19.jpg')" }}
      >
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-white drop-shadow-md">
            Manage Your Listings Efficiently!
          </h3>
          <p className="text-white max-w-2xl mx-auto mt-4 text-lg">
            Add new properties and track customer interactions with ease.
          </p>
          <Link to="/agent/agentprofile">
          {!verified && (
          <button
  className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
  disabled={verified}
>
  Complete Your Profile
</button>)}
{!verified && (
  <p className="mt-2 text-lg text-white">
    
    Kindly please wait... Your profile is under review.  Once verified, you'll be able to add, view, and delete properties. For verification , please complete your profile.
  </p>
)}
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 mt-12 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Agent Actions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaPlusCircle className="text-4xl text-blue-600 mx-auto mb-3" />
            <h4 className="text-xl font-semibold">Add a Property</h4>
            <p className="text-gray-600 mt-2">List new properties quickly.</p>
            <Link to="/agent/addpropertyy">
            <button
  className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
  disabled={!verified}
>
                Add Property
              </button>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FaList className="text-4xl text-green-600 mx-auto mb-3" />
            <h4 className="text-xl font-semibold">View Listings</h4>
            <p className="text-gray-600 mt-2">Check and manage your properties.</p>
            <Link to="/agent/viewproperties">
            <button
  className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
  disabled={!verified}
>  View Listings
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10"></div>

      <AgentFooter />
    </div>
  );
};

export default AgentHome;
