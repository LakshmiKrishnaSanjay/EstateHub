import React from "react";
import { Link } from "react-router-dom";
import AgentFooter from "../../components/AgentFooter";
import { useQuery } from "@tanstack/react-query";
import { viewPropertyAPI } from "../../services/propertyService";
import { getPropertyLimitAPI } from "../../services/paymentService";
import { useSelector } from "react-redux";

const ViewProperties = () => {
  const { data: properties  } = useQuery({
    queryKey: ["view-property"],
    queryFn: viewPropertyAPI,
  });

  const { data: propertyLimit, isLoading, error } = useQuery({
    queryKey: ["agent-payment-details"],
    queryFn: getPropertyLimitAPI,
  });

  console.log("Property Limit:", propertyLimit);
  console.log("Properties:", properties);

  const handleAddPropertyClick = () => {
    if (Array.isArray(properties) && properties.length >= propertyLimit) {
      window.location.href = "/agent/payment";
    } else {
      window.location.href = "/agent/addpropertyy";
    }
  };

  const renderPropertyType = (type) => {
    if (type === "both") return "Land and Building";
    if (!type) return "N/A";
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-3xl font-bold mb-6 text-center">Property Listings</h2>

        {isLoading && (
  <div className="text-center text-gray-600">Loading property limit...</div>
)}
{error?.message && (
  <div className="text-center text-red-600">
    Error loading property limit: {error.message}
  </div>
)}
{!isLoading && !error && (
  <div className="text-center text-gray-700 mb-4">
    Property Limit: {propertyLimit ?? 5}
  </div>
)}


        {Array.isArray(properties) && properties.length > 0 ? (
          <div className="overflow-auto bg-white shadow-md rounded-lg">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-3 text-left border-b">Property Type</th>
                  <th className="px-6 py-3 text-left border-b">Price</th>
                  <th className="px-6 py-3 text-left border-b">Area (Sq Ft)</th>
                  <th className="px-6 py-3 text-left border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property._id} className="border-b hover:bg-gray-100">
                    <td className="px-6 py-3">{renderPropertyType(property.propertyType)}</td>
                    <td className="px-6 py-3">{property.price}</td>
                    <td className="px-6 py-3">{property.area}</td>
                    <td className="px-6 py-3">
                      <Link to={`/agent/viewmoreproperties/${property._id}`}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                          View More
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-6 text-gray-600 text-lg font-medium">
            No properties added.
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={handleAddPropertyClick}
            className={`${
              Array.isArray(properties) && properties.length >= propertyLimit
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white px-6 py-3 rounded-lg`}
            disabled={isLoading}
          >
            {Array.isArray(properties) && properties.length >= propertyLimit
              ? "Make Payment"
              : "Add Property"}
          </button>
        </div>
      </div>

      <AgentFooter />
    </div>
  );
};

export default ViewProperties;