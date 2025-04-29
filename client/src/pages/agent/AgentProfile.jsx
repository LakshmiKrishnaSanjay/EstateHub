import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePasswordAPI, editProfileAPI, getProfileAPI } from "../../services/userService";
import { Eye, EyeOff, Star } from "lucide-react";
// Validation schema using Yup (matching OwnerProfile where applicable)
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must not exceed 100 characters")
    .required("Address is required"),
  experience: Yup.number()
    .min(0, "Experience cannot be negative")
    .required("Experience is required"),
    licenseNumber: Yup.string()
    .matches(/^K-RERA\/AG\/\d{4}\/\d{4}$/, "Invalid license number format")
    .required("License number is required"),
  
  bio: Yup.string()
    .max(500, "Bio must not exceed 500 characters")
    .required("Bio is required"),
});

// Password change validation
const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().min(6, "Min 6 characters").required("New password is required"),
});


const AgentProfile = () => {
  const [preview, setPreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
    const [showReviews, setShowReviews] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["agent-profile"],
    queryFn: getProfileAPI,
  });

  const { mutateAsync } = useMutation({
    queryKey: ["edit-profile"],
    mutationFn: editProfileAPI,
    onSuccess: () => refetch(),
  });
const { mutateAsync: updatePassword } = useMutation({ mutationFn: changePasswordAPI });
const [showPasswordForm, setShowPasswordForm] = useState(false);

  const user = data?.user || {};

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      experience: user.experience || "",
      licenseNumber: user.licenseNumber || "",
      bio: user.bio || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        if (selectedImage) {
          formData.append("image", selectedImage);
        }
        await mutateAsync(formData);
        setPreview(""); // Reset preview after upload
        setSelectedImage(null);
      } catch (error) {
        console.error("Error updating profile", error);
      }
    },
  });

    const passwordFormik = useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
      },
      validationSchema: passwordSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          await updatePassword(values);
          alert("Password changed successfully");
          resetForm();
        } catch (err) {
          console.error(err);
          alert("Failed to change password");
        }
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
        <h2 className="text-3xl font-bold text-center text-sky-900 mb-6"> Agent Profile</h2>
 <div className="flex flex-col items-center">
          <img
            src={preview || user.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
         />
          <label className="mt-3 cursor-pointer text-md text-sky-600 hover:underline">
          Change Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
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
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              className="w-full border px-3 py-2 rounded"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border px-3 py-2 rounded"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Experience</label>
            <input
              type="number"
              name="experience"
              className="w-full border px-3 py-2 rounded"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.experience && formik.errors.experience && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.experience}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              className="w-full border px-3 py-2 rounded"
              value={formik.values.licenseNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.licenseNumber && formik.errors.licenseNumber && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.licenseNumber}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Bio</label>
            <input
              type="text"
              name="bio"
              className="w-full border px-3 py-2 rounded"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.bio && formik.errors.bio && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.bio}</div>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-sky-950 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form> )}

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

export default AgentProfile;