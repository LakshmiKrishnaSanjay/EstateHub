import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { changePasswordAPI, editProfileAPI, getProfileAPI } from "../../services/userService";
import { useFormik } from "formik";
import * as Yup from "yup";

// Profile form validation
const profileSchema = Yup.object({
  name: Yup.string().min(2).max(50).required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Phone is required"),
  address: Yup.string().min(5).max(100).required("Address is required"),
});

// Password change validation
const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string().min(6, "Min 6 characters").required("New password is required"),
});

const UserProfile = () => {
  const [preview, setPreview] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, refetch } = useQuery({
    queryKey: ["userprofile"],
    queryFn: getProfileAPI,
  });

  const { mutateAsync: updateProfile } = useMutation({ mutationFn: editProfileAPI });
  const { mutateAsync: updatePassword } = useMutation({ mutationFn: changePasswordAPI });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const user = data?.user || {};

  const profileFormik = useFormik({
    initialValues: {
      profilePic: user?.profilePic || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        if (selectedImage) formData.append("image", selectedImage);
        await updateProfile(formData);
        refetch();
        alert("Profile updated successfully");
      } catch (err) {
        console.error(err);
        alert("Failed to update profile");
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
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-lg mx-auto mt-16 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">User Profile</h2>

        <div className="flex flex-col items-center">
          <img
            src={preview || user?.profilePic || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
          <label className="mt-3 bg-gray-200 px-4 py-2 rounded cursor-pointer text-sm hover:bg-gray-300">
            Change Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Profile Form */}
        <form onSubmit={profileFormik.handleSubmit} className="mt-4">
          {["name", "email", "phone", "address"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-600 capitalize">{field}</label>
              <input
                type="text"
                name={field}
                className="w-full border px-3 py-2 rounded"
                value={profileFormik.values[field]}
                onChange={profileFormik.handleChange}
                onBlur={profileFormik.handleBlur}
              />
              {profileFormik.touched[field] && profileFormik.errors[field] && (
                <div className="text-red-500 text-sm mt-1">{profileFormik.errors[field]}</div>
              )}
            </div>
          ))}

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-sky-950 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={profileFormik.isSubmitting}
            >
              {profileFormik.isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Password Change Form */}
        <div className=" border-gray-300 my-6" />

<div className="text-center">
  <button
    onClick={() => setShowPasswordForm(!showPasswordForm)}
    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
  >
    {showPasswordForm ? "Hide Password Form" : "Change Password"}
  </button>
</div>

{showPasswordForm && (
  <form onSubmit={passwordFormik.handleSubmit} className="mt-6">

    <div className="mb-4">
      <label className="block text-gray-600">Current Password</label>
      <input
        type="password"
        name="currentPassword"
        placeholder="Enter ypur current password...."
        className="w-full border px-3 py-2 rounded"
        value={passwordFormik.values.currentPassword}
        onChange={passwordFormik.handleChange}
        onBlur={passwordFormik.handleBlur}
      />
      {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword && (
        <div className="text-red-500 text-sm mt-1">{passwordFormik.errors.currentPassword}</div>
      )}
    </div>

    <div className="mb-4">
      <label className="block text-gray-600">New Password</label>
      <input
        type="password"
        name="newPassword"
        placeholder="eg:#dfJfSd*12"
        className="w-full border px-3 py-2 rounded"
        value={passwordFormik.values.newPassword}
        onChange={passwordFormik.handleChange}
        onBlur={passwordFormik.handleBlur}
      />
      {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
        <div className="text-red-500 text-sm mt-1">{passwordFormik.errors.newPassword}</div>
      )}
    </div>

    <div className="text-center">
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        disabled={passwordFormik.isSubmitting}
      >
        {passwordFormik.isSubmitting ? "Updating..." : "Change Password"}
      </button>
    </div>
  </form>
)}

      </div>
    </div>
  );
};

export default UserProfile;
