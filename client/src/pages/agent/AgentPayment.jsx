import React, { useState } from "react";

const OwnerPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [numListings, setNumListings] = useState(5); // Default 5 listings
  const pricePerListing = 100; // Set price per listing
  const totalAmount = (numListings / 5) * pricePerListing; // Calculate total

  const handleListingsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 5 && value <= 50 && value % 5 === 0) {
      setNumListings(value);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Payment</h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        
        {/* Number of Listings */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Number of Listings</label>
          <select
            value={numListings}
            onChange={handleListingsChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            {Array.from({ length: 10 }, (_, i) => (i + 1) * 5).map((num) => (
              <option key={num} value={num}>
                {num} Listings
              </option>
            ))}
          </select>
        </div>

        {/* Total Amount */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Total Amount</label>
          <input
            type="text"
            value={`$${totalAmount}`}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
          />
        </div>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Select Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {/* Payment Details */}
        {paymentMethod === "card" && (
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">Card Details</label>
            <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-lg mb-2" />
            <input type="text" placeholder="MM/YY" className="w-full p-3 border border-gray-300 rounded-lg mb-2" />
            <input type="text" placeholder="CVV" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">UPI ID</label>
            <input type="text" placeholder="Enter UPI ID" className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="mb-4">
            <p className="text-lg">You will be redirected to PayPal to complete the payment.</p>
          </div>
        )}

        {/* Pay Button */}
        <button className="bg-green-600 text-white p-4 rounded-lg w-full hover:bg-green-700">
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default OwnerPayment;
