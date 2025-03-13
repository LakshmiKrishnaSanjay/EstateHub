import React, { useState , useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import OwnerFooter from "../../components/OwnerFooter";
import axios from "axios";

const AddProperties = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showExtraFields, setShowExtraFields] = useState(true);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  // Handle Video Upload
  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);
  };

  const handlePropertyTypeChange = (e) => {
    const selectedType = e.target.value;
    formik.setFieldValue("propertyType", selectedType);
    setShowExtraFields(selectedType === "home" || selectedType === "flat"|| selectedType === "both");
  };
  
  

  // Validation Schema
  const validationSchema = Yup.object({
    propertyType: Yup.string().required("Property Type is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    propertyFor: Yup.string().oneOf(["buy", "rent"], "Invalid option").required(),
    bedrooms: Yup.number()
      .min(0, "Minimum 0")
      .max(20, "Maximum 20")
      .required("Number of Bedrooms is required"),
    bathrooms: Yup.number()
      .min(0, "Minimum 0")
      .max(20, "Maximum 20")
      .required("Number of Bathrooms is required"),
    kitchens: Yup.number()
      .min(0, "Minimum 0")
      .max(10, "Maximum 10")
      .required("Number of Kitchens is required"),
    parkingSpot: Yup.string().oneOf(["yes", "no"], "Invalid selection").required(),
    landArea: Yup.number().required("Land area is required"),
    location: Yup.string().required("Location is required"),
    district: Yup.string().required("District is required"),
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required"),
    
  });

  const formik = useFormik({
    initialValues: {
      propertyType: "home",
      price: "",
      description: "",
      propertyFor: "buy",
      bedrooms: "",
      bathrooms: "",
      kitchens: "",
      parkingSpot: "yes",
      district:"",
      location:"",
      landArea: "",
      latitude: "",
      longitude: "",
      features: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  useEffect(() => {
    if (formik.values.location.length > 2) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${formik.values.location}`
          );
          if (response.data.length > 0) {
            formik.setFieldValue("latitude", response.data[0].lat);
            formik.setFieldValue("longitude", response.data[0].lon);
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      };
      const delayDebounce = setTimeout(fetchCoordinates, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [formik.values.location]);


  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Add a New Property</h2>
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">

        
<select
  value={formik.values.propertyType}
  onChange={handlePropertyTypeChange}
  className="w-full p-3 border border-gray-300 rounded-lg"
>
  <option value="home">Home</option>
  <option value="land">Land</option>
  <option value="both">Home & Land</option>
  <option value="flat">Flat</option>
  <option value="cp">Commercial Property</option>
</select>


<div className="mb-4">
  <label className="block text-lg font-semibold mb-2">Property For</label>
  <div className="flex gap-4">
    <label>
      <input
        type="radio"
        name="propertyFor"
        value="buy"
        checked={formik.values.propertyFor === "buy"}
        onChange={formik.handleChange}
      /> Buy
    </label>
    <label>
      <input
        type="radio"
        name="propertyFor"
        value="rent"
        checked={formik.values.propertyFor === "rent"}
        onChange={formik.handleChange}
      /> Rent
    </label>
  </div>
</div>

{showExtraFields && (
  <>
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Bedrooms</label>
      <input type="number" {...formik.getFieldProps("bedrooms")} className="w-full p-3 border border-gray-300 rounded-lg" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Bathrooms</label>
      <input type="number" {...formik.getFieldProps("bathrooms")} className="w-full p-3 border border-gray-300 rounded-lg" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Kitchens</label>
      <input type="number" {...formik.getFieldProps("kitchens")} className="w-full p-3 border border-gray-300 rounded-lg" />
    </div>
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Parking Spot</label>
      <select {...formik.getFieldProps("parkingSpot")} className="w-full p-3 border border-gray-300 rounded-lg">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">Water Source</label>
      <select {...formik.getFieldProps("waterSource")} className="w-full p-3 border border-gray-300 rounded-lg">
        <option value="pipe">Pipe</option>
        <option value="well">Well</option>
      </select>
    </div>
  </>
)}

          {/* Price */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Price</label>
            <input
              type="text"
              {...formik.getFieldProps("price")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter price"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500">{formik.errors.price}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Description</label>
            <textarea
              {...formik.getFieldProps("description")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Enter property description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500">{formik.errors.description}</p>
            )}
          </div>

          {/* Land Area */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Land Area (sqft)</label>
            <input
              type="number"
              {...formik.getFieldProps("landArea")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter land area in square feet"
            />
            {formik.touched.landArea && formik.errors.landArea && (
              <p className="text-red-500">{formik.errors.landArea}</p>
            )}
          </div>

          {/* District */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">District</label>
            <input
              type="text"
              {...formik.getFieldProps("district")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter district of your property..."
            />
            {formik.touched.district && formik.errors.district && (
              <p className="text-red-500">{formik.errors.district}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Location</label>
            <input
              type="text"
              {...formik.getFieldProps("location")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter location of your property..."
            />
            {formik.touched.location && formik.errors.location && (
              <p className="text-red-500">{formik.errors.location}</p>
            )}
          </div>

         
         
 {/* Latitude */}
<div className="mb-4">
  <label className="block text-lg font-semibold mb-2">Latitude</label>
  <input
    type="text"
    value={formik.values.latitude}
    readOnly
    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
  />
</div>

{/* Longitude */}
<div className="mb-4">
  <label className="block text-lg font-semibold mb-2">Longitude</label>
  <input
    type="text"
    value={formik.values.longitude}
    readOnly
    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
  />
</div>

    



        {/* Media Upload (Images & Videos) */}
<div className="mb-4 flex flex-col gap-4">
  {/* Image Upload */}
  <div>
    <label className="block text-lg font-semibold mb-2">Upload Property Images</label>
    <input 
      type="file" 
      accept="image/*" 
      multiple 
      onChange={handleImageUpload} 
      className="w-full p-3 border border-gray-300 rounded-lg"
    />
    {images.length > 0 && (
      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <img 
              src={URL.createObjectURL(image)} 
              alt={`Property Image ${index + 1}`} 
              className="w-full h-32 object-cover rounded-md" 
            />
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Video Upload */}
  <div>
    <label className="block text-lg font-semibold mb-2">Upload Property Videos</label>
    <input 
      type="file" 
      accept="video/*" 
      multiple 
      onChange={handleVideoUpload} 
      className="w-full p-3 border border-gray-300 rounded-lg"
    />
    {videos.length > 0 && (
      <div className="mt-4 grid grid-cols-2 gap-4">
        {videos.map((video, index) => (
          <div key={index}>
            <video 
              src={URL.createObjectURL(video)} 
              controls 
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    )}
  </div>
</div>



          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 text-white p-4 rounded-lg w-45 hover:bg-teal-700"
          >
            Submit Property
          </button>
        </form>
      </div>
      <OwnerFooter />
    </>
  );
};

export default AddProperties;
