import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPropertyAPI, searchPropertiesAPI } from "../../services/propertyService";

export default function RentAProperty() {
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filters, setFilters] = useState({
    district: "",
    minPrice: "",
    maxPrice: "",
    propertyType: "",
  });

  const { data } = useQuery({
    queryKey: ["view-property"],
    queryFn: getPropertyAPI,
  });

  const { mutateAsync } = useMutation({
    mutationFn: searchPropertiesAPI,
    mutationKey: ["search-property"],
    onSuccess: (result) => {
      console.log("Filtered result:", result);
      setFilteredData(result);
    },
  });

  const handleFilter = async () => {
    try {
      setIsFiltered(true);
  
      const payload = {
        district: filters.district,
        propertyType: filters.propertyType,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        propertyFor: "rent",
      };
  
      // Remove empty fields
      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== "")
      );
  
      console.log("Sending filters:", cleanedPayload);
      const result = await mutateAsync(cleanedPayload);
      setFilteredData(result);
    } catch (err) {
      console.error("Filtering failed", err);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const properties = isFiltered ? filteredData : (data || []);



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rent Properties</h1>

      {/* Filter Inputs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border p-2 rounded"
          name="propertyType"
          value={filters.propertyType}
          onChange={handleInputChange}
        >
          <option value="">Property Types</option>
          <option value="home">Home</option>
          <option value="flat">Flat</option>
          <option value="land">Land</option>
          <option value="both">Land & Building </option>
          <option value="commercial">Commercial Property</option>
        </select>

        <input
          className="border p-2 rounded"
          placeholder="District"
          name="district"
          value={filters.district}
          onChange={handleInputChange}
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Min Price"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleInputChange}
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Max Price"
          name="maxPrice"
          value={filters.maxPrice}
          onChange={handleInputChange}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleFilter}
        >
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {properties.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No properties found for the selected filters.
          </p>
        ) : (
          properties
            .filter((property) => property.propertyFor === "rent")
            .map((property) => (
              <div key={property._id} className="border rounded-lg shadow p-4 relative flex flex-col">
                <img
                  src={property?.photos?.[0]}
                  alt="Property"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="mt-2 flex-1">
                  <h2 className="text-lg font-semibold">{property.title}</h2>
                  <p className="text-gray-500">{property.area} sq ft</p>
                  <p className="font-bold">${property.price}</p>
                  <Link
                    to={`/user/rentpropertydetails/${property._id}`}
                    className="block text-blue-500 mt-2 font-semibold"
                  >
                    View More
                  </Link>
                </div>

              </div>
            ))
        )}
      </div>
    </div>
  );
}
