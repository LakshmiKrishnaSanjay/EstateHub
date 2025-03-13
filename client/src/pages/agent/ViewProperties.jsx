import React, { useState } from "react";
import { Link } from "react-router-dom";
import AgentFooter from "../../components/AgentFooter";

const ViewProperties = () => {
  const [properties] = useState([
    { id: 1, propertyType: "Home", price: "$250,000", bedrooms: 3, bathrooms: 2, propertyFor: "Sale", image: "property1.jpg" },
    { id: 2, propertyType: "Commercial Property", price: "$1,000,000", bedrooms: 0, bathrooms: 2, propertyFor: "Rent", image: "property2.jpg" },
    { id: 3, propertyType: "Apartment", price: "$500,000", bedrooms: 2, bathrooms: 1, propertyFor: "Sale", image: "property3.jpg" },
    { id: 4, propertyType: "Land", price: "$200,000", bedrooms: 0, bathrooms: 0, propertyFor: "Rent", image: "property4.jpg" },
    { id: 5, propertyType: "Villa", price: "$800,000", bedrooms: 4, bathrooms: 3, propertyFor: "Sale", image: "property5.jpg" },
  ]);

  const [selectedType, setSelectedType] = useState("All");
  const [selectedFor, setSelectedFor] = useState("All");

  // Filtered properties
  const filteredProperties = properties.filter((property) => {
    return (
      (selectedType === "All" || property.propertyType === selectedType) &&
      (selectedFor === "All" || property.propertyFor === selectedFor)
    );
  });

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Property Listings</h2>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="border px-4 py-2 rounded-md"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Home">Home</option>
            <option value="Commercial Property">Commercial Property</option>
            <option value="Apartment">Apartment</option>
            <option value="Land">Land</option>
          </select>

          <select
            className="border px-4 py-2 rounded-md"
            value={selectedFor}
            onChange={(e) => setSelectedFor(e.target.value)}
          >
            <option value="All">All Listings</option>
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>
        </div>

        {/* Property Table */}
        <table className="min-w-full table-auto bg-white border-collapse shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left border-b">Property Type</th>
              <th className="px-4 py-2 text-left border-b">Price</th>
              <th className="px-4 py-2 text-left border-b">Bedrooms</th>
              <th className="px-4 py-2 text-left border-b">Bathrooms</th>
              <th className="px-4 py-2 text-left border-b">For</th>
              <th className="px-4 py-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <tr key={property.id} className="border-b">
                  <td className="px-4 py-2">{property.propertyType}</td>
                  <td className="px-4 py-2">{property.price}</td>
                  <td className="px-4 py-2">{property.bedrooms}</td>
                  <td className="px-4 py-2">{property.bathrooms}</td>
                  <td className="px-4 py-2">{property.propertyFor}</td>
                  <td className="px-4 py-2 flex gap-4">
                    <Link to={`/owner/viewmoreproperty`}>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        View More
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No properties found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Add Property Button */}
        <div className="mt-8 text-center">
          <Link to="/owner/addproperty">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
              Add Property
            </button>
          </Link>
        </div>

        {/* Pay Now Button (Visible only if 5+ listings exist) */}
        {filteredProperties.length >= 5 && (
          <div className="mt-6 text-center">
            <Link to="/agent/payment">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
                Pay Now
              </button>
            </Link>
          </div>
        )}
      </div>
      <AgentFooter />
    </>
  );
};

export default ViewProperties;
