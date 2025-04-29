import React from "react";
import { useMutation } from "@tanstack/react-query";
import { processPaymentAPI } from "../../services/paymentService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const plans = {
  basic: { price: 200, listings: 10 },
  premium: { price: 400, listings: 15 },
  vip: { price: 600, listings: 25 },
};

const validationSchema = Yup.object({
  selectedPlan: Yup.string().required("Please select a plan"),
  paymentMethod: Yup.string().required("Select a payment method"),
  cardNumber: Yup.string().when("paymentMethod", {
    is: (val) => val === "credit-card" || val === "debit-card",
    then: (schema) =>
      schema
        .required("Card number is required")
        .matches(/^\d{12}$/, "Card number must be exactly 12 digits"),
  }),
  expiry: Yup.string().when("paymentMethod", {
    is: (val) => val === "credit-card" || val === "debit-card",
    then: (schema) =>
      schema
        .required("Expiry is required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY")
        .test("expiry-date", "Your card validity has expired", function (value) {
          if (!value) return false;
          const [mm, yy] = value.split("/");
          const expDate = new Date(`20${yy}`, mm);
          const now = new Date();
          return expDate > now;
        }),
  }),
  cvv: Yup.string().when("paymentMethod", {
    is: (val) => val === "credit-card" || val === "debit-card",
    then: (schema) =>
      schema
        .required("CVV is required")
        .matches(/^\d{3}$/, "CVV must be exactly 3 digits"),
  }),
  upiId: Yup.string().when("paymentMethod", {
    is: "upi",
    then: (schema) => schema.required("UPI ID is required"),
  }),
});

const AgentPayment = () => {
  const { mutateAsync: processPayment } = useMutation({
    mutationFn: processPaymentAPI,
    mutationKey: "agent-payment",
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await processPayment(values.selectedPlan, "owner");
      if (res.paymentStatus === "completed") {
        alert("✅ Payment successful!");
        // Navigate to the view property page after successful payment
        navigate("/agent/viewproperties"); // Adjust the path as needed
      } else {
        alert("ℹ️ Payment initiated. Please complete the process.");
      }
    } catch (error) {
      alert("❌ Payment failed: " + (error.response?.data?.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Agent Subscription Payment</h2>
      <Formik
        initialValues={{
          selectedPlan: "basic",
          paymentMethod: "credit-card",
          cardNumber: "",
          expiry: "",
          cvv: "",
          upiId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => {
          const { price } = plans[values.selectedPlan];

          return (
            <Form className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Choose Plan</label>
                <Field
                  as="select"
                  name="selectedPlan"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  {Object.entries(plans).map(([key, plan]) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} - ₹{plan.price} ({plan.listings -5} Extra listings)
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="selectedPlan" component="div" className="text-red-600 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Total Amount</label>
                <input
                  type="text"
                  value={`₹${price}`}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2">Payment Method</label>
                <Field
                  as="select"
                  name="paymentMethod"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="paypal">PayPal</option>
                </Field>
                <ErrorMessage name="paymentMethod" component="div" className="text-red-600 text-sm" />
              </div>

              {["credit-card", "debit-card"].includes(values.paymentMethod) && (
                <div className="mb-4">
                  <Field
                    name="cardNumber"
                    type="text"
                    placeholder="Card Number"
                    className="w-full p-3 border mb-2 rounded-lg"
                  />
                  <ErrorMessage name="cardNumber" component="div" className="text-red-600 text-sm" />
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <Field
                        name="expiry"
                        type="text"
                        placeholder="MM/YY"
                        className="w-full p-3 border rounded-lg"
                      />
                      <ErrorMessage name="expiry" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="w-1/2">
                      <Field
                        name="cvv"
                        type="text"
                        placeholder="CVV"
                        className="w-full p-3 border rounded-lg"
                      />
                      <ErrorMessage name="cvv" component="div" className="text-red-600 text-sm" />
                    </div>
                  </div>
                </div>
              )}

              {values.paymentMethod === "upi" && (
                <div className="mb-4">
                  <Field
                    name="upiId"
                    type="text"
                    placeholder="Enter UPI ID"
                    className="w-full p-3 border rounded-lg"
                  />
                  <ErrorMessage name="upiId" component="div" className="text-red-600 text-sm" />
                </div>
              )}

              {values.paymentMethod === "paypal" && (
                <div className="mb-4 text-lg text-gray-700">
                  You will be redirected to PayPal to complete the payment.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-green-600 text-white p-4 rounded-lg w-full hover:bg-green-700 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Processing..." : "Proceed to Pay"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AgentPayment;
