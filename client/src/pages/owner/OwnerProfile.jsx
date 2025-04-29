import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { changePasswordAPI, editProfileAPI, getProfileAPI } from "../../services/userService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Star } from "lucide-react";

// Validation Schemas
const validationSchema = Yup.object({
  name: Yup.string().min(2).max(50).required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone is required"),
  address: Yup.string().min(5).max(100).required("Address is required"),
});

// Password change validation
const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().min(6, "Min 6 characters").required("New password is required"),
});

const OwnerProfile = () => {
  const [preview, setPreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { data, refetch } = useQuery({ queryKey: ["profile"], queryFn: getProfileAPI });
  const user = data?.user || {};

  const { mutateAsync } = useMutation({ mutationFn: editProfileAPI });
  const { mutateAsync: updatePassword } = useMutation({ mutationFn: changePasswordAPI });

  const formik = useFormik({
    initialValues: {
      profilePic: user?.profilePic || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => formData.append(key, val));
      if (selectedImage) formData.append("image", selectedImage);
      await mutateAsync(formData);
      refetch();
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { resetForm }) => {
      await updatePassword(values);
      alert("Password changed successfully");
      resetForm();
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-6"> Owner Profile</h2>

        <div className="flex flex-col items-center">
          <img
            src={preview || user?.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
          />
          <label className="mt-3 cursor-pointer text-md text-sky-600 hover:underline">
            Change Image
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
          <div className="my-2 ">
          <p className="text-lg text-black">Average Rating : {user.averageRating}⭐</p>
                  
          </div>
        </div>

                {/* Reviews */}
                {data?.reviews?.length > 0 && (
          <div className="mt-10">
            <h3
              className=" font-semibold text-green-700 mb-4 cursor-pointer hover:underline flex items-center justify-between"
              onClick={() => setShowReviews(!showReviews)}
            >
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </h3>

            {showReviews && (
              <div className="space-y-4">
                {data.reviews.map((review) => (
                  <div key={review._id} className="bg-gray-50 p-4 rounded-md shadow">
                    <p className="font-semibold">{review.user?.username || "Anonymous"}</p>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-sm text-yellow-600">Rating: {review.rating} ⭐</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
{!showReviews && (
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label className="block text-gray-700 capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="text-red-500 text-sm">{formik.errors[field]}</div>
              )}
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="bg-sky-900 text-white px-5 py-2 rounded-md hover:bg-sky-800 transition"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
)}


{/* Change Password */}
{!showReviews && (
  <div className="my-4 pt-2">
    <div className="text-center mb-2">
      <button
        onClick={() => setShowPasswordForm(!showPasswordForm)}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
      >
        {showPasswordForm ? "Hide Password Form" : "Change Password"}
      </button>
    </div>

    {showPasswordForm && (
      <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Current Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="currentPassword"
            className="w-full border px-3 py-2 rounded-md"
            value={passwordFormik.values.currentPassword}
            onChange={passwordFormik.handleChange}
            onBlur={passwordFormik.handleBlur}
          />
          {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword && (
            <div className="text-red-500 text-sm">{passwordFormik.errors.currentPassword}</div>
          )}
        </div>

        <div>
          <label className="block text-gray-700">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              className="w-full border px-3 py-2 rounded-md"
              value={passwordFormik.values.newPassword}
              onChange={passwordFormik.handleChange}
              onBlur={passwordFormik.handleBlur}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
            <div className="text-red-500 text-sm">{passwordFormik.errors.newPassword}</div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            disabled={passwordFormik.isSubmitting}
          >
            {passwordFormik.isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    )}
  </div>
)}


      </div>
    </div>
  );
};

export default OwnerProfile;
