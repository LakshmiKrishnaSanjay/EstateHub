import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerAPI } from "../../services/userService";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const SignUpAgent = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    username: Yup.string().min(5, "username must be at least 5 characters").required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const { mutateAsync } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register-user"],
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "agent",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { confirmPassword, ...payload } = values; // exclude confirmPassword from payload
        const data = await mutateAsync(payload);
        if (data?.token) {
          alert("Account created successfully! Please login.");
          resetForm();
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Signup Error:", error);
        alert(error?.response?.data?.message || "Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/banner155.jpg')" }}
    >
      <div className="max-w-md w-full p-4 bg-white shadow-lg rounded-lg bg-opacity-70">
        <h2 className="text-xl font-bold text-center mb-4">Agent Registration</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            autoComplete="off"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm">{formik.errors.username}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="off"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 block mx-auto"
          >
            Register as Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpAgent;
