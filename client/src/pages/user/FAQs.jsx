import React, { useState } from 'react';

const FAQs = () => {
  const faqs = [
    { question: 'How do I contact a property owner?', answer: 'You can contact the owner via the built-in chat feature or call them if their contact number is provided in the listing.' },
    { question: 'How do I buy or rent a property?', answer: 'Once you find a suitable property, contact the owner or agent directly to negotiate terms and complete the transaction offline.' },
    { question: 'How do I add a review?', answer: 'Go to the property page, scroll to the reviews section, and click "Add Review" to share your experience.' },
    { question: 'How do I check a property location?', answer: 'Each listing includes a map feature that shows the property location. You can also use the given address for navigation.' },
    { question: 'How do I make a payment?', answer: 'Payments are handled directly between buyers and sellers. We do not process transactions on the platform, so users must ensure safety before making any payments.' },
    { question: 'Is there any risk in payments?', answer: 'Since transactions are done outside the platform, the risk is in the hands of the users. Always verify the seller before making any payments.' },
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

export default FAQs;
