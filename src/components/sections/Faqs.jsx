import React, { useState } from "react";
'use server';


export default function FAQSection() {
  const faqs = [
    {
      id: 1,
      question: "Do I have to pay to get access to the Patient Portal and healow app?",
      answer: "Access to our Portal and the healow app are completely free. We share this information with our patients to give them access to their health records and help them make better healthcare decisions."
    },
    {
      id: 2,
      question: "Is having online access secure?",
      answer: "Yes, the information is completely secure. It is protected with a username and password / PIN number of your choice and through SSL encryption."
    },
    {
      id: 3,
      question: "What can I access through the healow mobile app and Patient Portal?",
      answer: "We share information with our patients that we feel can help them and keep them informed. Every practice is different, and we try to provide patients with key information regarding their health. For a complete list of features, ask our friendly staff."
    },
    {
      id: 4,
      question: "How do I sign up?",
      answer: "Sign-up is simple and outlined in the steps above. You should receive a username and password from our practice via email that you can print out and customize after your initial login. Access can be made via any web browser, or through the smartphone app."
    },
    {
      id: 5,
      question: "What if I forget my username and/or password?",
      answer: "The app and our Portal allow you to reset your username and/or password. You can also call the front desk and we can reset the username and/or password for you."
    },
    {
      id: 6,
      question: "What if I need technical assistance?",
      answer: "User support is built into the web portal and the app, or you can ask a member of our staff."
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="bg-gradient-to-b py-6">
      <div className="container px-6 mx-auto max-w-7xl">
        {/* Decorative top element */}
        <div className="flex justify-center mb-4">
          <div className="h-1 w-28 bg-emerald-400 rounded-full"></div>
        </div>
        
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          Frequently Asked Questions
        </h2>
        
        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-emerald-400"
            >
              <button
                className="w-full p-4 text-left flex items-center justify-between focus:outline-none"
                onClick={() => toggleFaq(faq.id)}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200">
                  {openFaq === faq.id ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg> 
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  }
                </span>
              </button>
              {openFaq === faq.id && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}