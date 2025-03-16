import React from 'react';

const Services = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold">Our Services</h1>
        <p className="text-gray-600 mt-4">Explore the services we offer to enhance your real estate experience.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
        {/* Service 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <img src="/images/list.jpeg" alt="Property Listings" className="w-full h-48 object-cover rounded-lg"/>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Property Listings</h3>
          <p className="text-gray-600">View and list properties with ease. Post your property details and connect with potential buyers or tenants.</p>
        </div>

        {/* Service 2 */}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <img src="/images/admin.png" alt="Admin Dashboard" className="w-full h-48 object-cover rounded-lg"/>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Admin Dashboard</h3>
          <p className="text-gray-600">Manage property listings, users, inquiries, and payments seamlessly from a centralized dashboard.</p>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <img src="/images/search.png" alt="Property Search & Filters" className="w-full h-48 object-cover rounded-lg"/>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Property Search & Filters</h3>
          <p className="text-gray-600">Find properties quickly with advanced search and filters based on location, price, property type, and more.</p>
        </div>


        {/* Service 4 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <img src="/images/chat1.png" alt="Chat Area" className="w-full h-48 object-cover rounded-lg"/>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Chat Area</h3>
          <p className="text-gray-600">Communicate directly with property owners, agents, and buyers through our integrated chat feature.</p>
        </div>

        
        

        {/* Service 5 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <img src="/images/payment.png" alt="Secure Payments" className="w-full h-48 object-cover rounded-lg"/>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Secure Payments</h3>
          <p className="text-gray-600">Make hassle-free payments with Razorpay integration for transactions.</p>
        </div>


        

        {/* Service 6 */}
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <img src="/images/c2.jpeg" alt="Property Counseling" className="w-full h-48 object-cover rounded-lg"/>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Property Counseling</h3>
          <p className="text-gray-600">Get expert advice on buying, selling, and investing in real estate to make informed decisions.</p>
        </div>

        
      </div>
    </section>
  );
};

export default Services;