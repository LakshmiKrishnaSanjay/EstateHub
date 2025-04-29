import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getWishlistAPI } from "../../services/wishlistServices";

export default function WishlistPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlistAPI,
  });

  if (isLoading) return <p className="text-center">Loading wishlist...</p>;
  if (error) return <p className="text-center text-red-500">Error loading wishlist</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>

      {data.wishlist.length === 0 ? (
        <p>No properties in wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.wishlist.map((property) => {
            if (property.propertyFor === "rent") {
              return (
                <div key={property._id} className="border rounded-lg shadow p-4 relative flex flex-col">

                    <img
                      src={property.photos[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
                    <p className="text-gray-600">${property.price}</p>
                    <p className="text-sm text-gray-500">{property.city}</p>
                                 <Link
                                        to={`/user/buypropertydetails/${property._id}`}
                                        className="block text-blue-500 mt-2 font-semibold"
                                      >
                                        View More
                                      </Link>
                  
                </div>
              );
            }
            if (property.propertyFor === "buy") {
              return (
                <div key={property._id} className="border rounded-lg shadow p-4 relative flex flex-col">
              
                    <img
                      src={property.photos[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
                    <p className="text-gray-600">${property.price}</p>
                    <p className="text-sm text-gray-500">{property.city}</p>
                                 <Link
                                        to={`/user/buypropertydetails/${property._id}`}
                                        className="block text-blue-500 mt-2 font-semibold"
                                      >
                                        View More
                                      </Link>
                    
                 
                </div>
              );
            }
            return null; // Return null for properties that don't match the condition
          })}
        </div>
      )}
    </div>
  );
}