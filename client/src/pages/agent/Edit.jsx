import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AgentFooter from "../../components/AgentFooter";
import { editPropertyAPI, getPropertiesAPI } from "../../services/propertyService";
import axios from "axios";

const Edit = () => {
  const { id: propertyId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Add QueryClient for cache invalidation
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showExtraFields, setShowExtraFields] = useState(true);

  console.log("propertyId from useParams:", propertyId);

  const { data, refetch } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertiesAPI(propertyId),
    enabled: !!propertyId,
  });

  const { mutateAsync } = useMutation({
    mutationFn: editPropertyAPI,
    mutationKey: ["edit-property"],
    onSuccess: () => {
      queryClient.invalidateQueries(["property", propertyId]); // Invalidate cache
      console.log("Mutation successful, cache invalidated");
    },
  });

  const property = data?.property || {};

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);
  };

  const handlePropertyTypeChange = (e) => {
    const selectedType = e.target.value;
    formik.setFieldValue("propertyType", selectedType);
    setShowExtraFields(selectedType === "home" || selectedType === "flat" || selectedType === "both");
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    propertyType: Yup.string().required("Property Type is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    propertyFor: Yup.string().oneOf(["buy", "rent"], "Invalid option").required(),
    bedrooms: showExtraFields
      ? Yup.number()
          .min(0, "Minimum 0")
          .max(20, "Maximum 20")
          .required("Number of Bedrooms is required")
      : Yup.number().notRequired(),
    bathrooms: showExtraFields
      ? Yup.number()
          .min(0, "Minimum 0")
          .max(20, "Maximum 20")
          .required("Number of Bathrooms is required")
      : Yup.number().notRequired(),
    kitchens: showExtraFields
      ? Yup.number()
          .min(0, "Minimum 0")
          .max(10, "Maximum 10")
          .required("Number of Kitchens is required")
      : Yup.number().notRequired(),
    parkingSpot: Yup.boolean().required("Parking spot selection is required"),
    area: Yup.number().required("Land area is required"),
    location: Yup.string().required("Location is required"),
    district: Yup.string().required("District is required"),
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: property?.title || "",
      propertyType: property?.propertyType || "home",
      price: property?.price || "",
      description: property?.description || "",
      propertyFor: property?.propertyFor || "buy",
      bedrooms: property?.bedrooms || "",
      bathrooms: property?.bathrooms || "",
      kitchens: property?.kitchens || "",
      parkingSpot: property?.parkingSpot !== undefined ? property.parkingSpot : true,
      district: property?.district || "",
      location: property?.location || "",
      area: property?.area || "",
      latitude: property?.latitude || "",
      longitude: property?.longitude || "",
      features: property?.features || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value); // Append all form values
        });

        images.forEach((img) => formData.append("photos", img));
        videos.forEach((vid) => formData.append("videos", vid));

        console.log("Submitting with propertyId:", propertyId);
        console.log("Form values:", values);
        console.log("FormData entries:");
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await mutateAsync({ id: propertyId, data: formData });
        console.log("Server response:", response);

        resetForm();
        navigate("/agent/viewproperties");
      } catch (error) {
        console.error("Submission error:", error);
      }
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
    // Form JSX remains unchanged; omitted for brevity
    // Ensure all fields are present as in your original code
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Edit Property</h2>
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              {...formik.getFieldProps("title")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500">{formik.errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Property Type</label>
            <select
              name="propertyType"
              value={formik.values.propertyType}
              onChange={handlePropertyTypeChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="home">Home</option>
              <option value="land">Land</option>
              <option value="both">Home & Land</option>
              <option value="flat">Flat</option>
              <option value="commercial">Commercial Property</option>
            </select>
            {formik.touched.propertyType && formik.errors.propertyType && (
              <p className="text-red-500">{formik.errors.propertyType}</p>
            )}
          </div>

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
                />{" "}
                Sale
              </label>
              <label>
                <input
                  type="radio"
                  name="propertyFor"
                  value="rent"
                  checked={formik.values.propertyFor === "rent"}
                  onChange={formik.handleChange}
                />{" "}
                Rent
              </label>
            </div>
          </div>

          {showExtraFields && (
            <>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Bedrooms</label>
                <input
                  type="number"
                  {...formik.getFieldProps("bedrooms")}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {formik.touched.bedrooms && formik.errors.bedrooms && (
                  <p className="text-red-500">{formik.errors.bedrooms}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Bathrooms</label>
                <input
                  type="number"
                  {...formik.getFieldProps("bathrooms")}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {formik.touched.bathrooms && formik.errors.bathrooms && (
                  <p className="text-red-500">{formik.errors.bathrooms}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Kitchens</label>
                <input
                  type="number"
                  {...formik.getFieldProps("kitchens")}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {formik.touched.kitchens && formik.errors.kitchens && (
                  <p className="text-red-500">{formik.errors.kitchens}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Parking Spot</label>
                <select
                  {...formik.getFieldProps("parkingSpot")}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Price</label>
            <input
              type="number"
              {...formik.getFieldProps("price")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter price"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500">{formik.errors.price}</p>
            )}
          </div>

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

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Land Area (sqft)</label>
            <input
              type="number"
              {...formik.getFieldProps("area")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter land area in square feet"
            />
            {formik.touched.area && formik.errors.area && (
              <p className="text-red-500">{formik.errors.area}</p>
            )}
          </div>

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

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-lg font-semibold mb-2">Latitude</label>
              <input
                type="number"
                readOnly
                {...formik.getFieldProps("latitude")}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter latitude"
              />
              {formik.touched.latitude && formik.errors.latitude && (
                <p className="text-red-500">{formik.errors.latitude}</p>
              )}
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2">Longitude</label>
              <input
                type="number"
                readOnly
                {...formik.getFieldProps("longitude")}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter longitude"
              />
              {formik.touched.longitude && formik.errors.longitude && (
                <p className="text-red-500">{formik.errors.longitude}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Features</label>
            <textarea
              {...formik.getFieldProps("features")}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter property features (comma-separated)"
              rows="3"
            />
          </div>

          <div className="mb-4 flex flex-col gap-4">
            <div>
              <label className="block text-lg font-semibold mb-2">Upload Property Photos</label>
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

          <button
            type="submit"
            className="bg-green-600 text-white p-4 rounded-lg w-45 hover:bg-teal-700"
          >
            Submit Property
          </button>
        </form>
      </div>
      <AgentFooter />
    </>
  );
};

export default Edit;