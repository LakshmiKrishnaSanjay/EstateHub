import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    { question: 'How do I list a property?', answer: 'To list a property, sign in, go to your dashboard, and click on "Add Property".' },
    { question: 'Is there a fee to list my property?', answer: 'Basic listings are free, but premium listings require a small fee.' },
    { question: 'How do I contact a property owner?', answer: 'You can use the built-in chat feature or the contact details provided on the property listing.' },
    { question: 'What payment methods do you accept?', answer: 'We accept payments via Razorpay, including credit/debit cards and UPI.' },
    { question: 'Can I edit my listing after posting?', answer: 'Yes, you can edit or delete your listing anytime from your dashboard.' },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-md cursor-pointer" onClick={() => toggleFAQ(index)}>
              <h3 className="text-lg font-semibold text-gray-900 flex justify-between">
                {faq.question}
                <span>{openIndex === index ? '−' : '+'}</span>
              </h3>
              {openIndex === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;