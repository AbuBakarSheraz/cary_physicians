import { Helmet } from "react-helmet";
import React from "react";
'use server';

export default function InsuranceList() {
  const insuranceProviders = [
    ["Cigna", "Cigna Health Spring", "Humana", "Medcost", "Medicaid", "Medicare", "Molina"],
    ["Multiplan", "RR Medicare", "Tricare East", "Tricare For Life", "UHC", "United American Ins Company", "Wellcare"],
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        {/* <title>Accepted Insurance Providers | Our Clinic</title> */}
        <meta name="description" content="We accept various insurance providers including Cigna, Humana, Medicare, Medicaid, and more. Call us to confirm if we are in-network." />
        <meta name="keywords" content="health insurance, Medicare, Medicaid, Cigna, Humana, UHC, insurance coverage" />
        <meta name="author" content="Our Clinic" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": insuranceProviders.flat().map((provider) => ({
                "@type": "Question",
                "name": `Do you accept ${provider}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Yes, we accept ${provider}. Please call us to confirm in-network details.`,
                },
              })),
            }),
          }}
        />
                
      </Helmet>

      {/* Insurance List Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Accepted Insurance Providers</span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400 rounded-full"></span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We partner with a wide range of insurance providers to make quality healthcare accessible for you and your family.
            </p>
          </div>

          {/* Top Message Box */}
          <div className="bg-gray-800 border-l-4 border-emerald-400 rounded-lg p-5 mb-10 shadow-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-emerald-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-200">
                Our clinic accepts many major insurance plans. Our staff will verify your coverage before your appointment to ensure a seamless experience.
              </p>
            </div>
          </div>

          {/* Insurance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {insuranceProviders.map((column, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-70 rounded-xl p-6 shadow-lg border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-emerald-300">
                  {index === 0 ? "Primary Providers" : "Additional Providers"}
                </h3>
                <ul className="space-y-3">
                  {column.map((provider, idx) => (
                    <li key={idx} className="transition-all duration-200 hover:bg-gray-700 p-3 rounded-lg flex items-center">
                      <div className="bg-emerald-400 bg-opacity-20 p-2 rounded-full mr-3">
                        <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                      <span className="font-medium">{provider}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Box */}
          {/* <div className="bg-emerald-600 bg-opacity-20 rounded-xl p-6 shadow-lg border border-emerald-700 text-center"> */}
            {/* <h4 className="text-xl font-bold mb-3 text-emerald-300">Not Sure About Your Coverage?</h4>
            <p className="mb-5 text-gray-200">
              Insurance plans vary widely. Our dedicated team is here to help verify your benefits and explain your coverage options.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="tel:+1234567890" className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-200 w-full sm:w-auto justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Call Us Today
              </a>
              <a href="#request-form" className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200 w-full sm:w-auto justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Request Information
              </a>
            </div>
          </div> */}

          {/* Disclaimer */}
          <div className="mt-10 text-center">
            <p className="text-gray-400 text-sm">
              <span className="text-emerald-400">*</span> Most insurances have multiple variations, so please call your insurance provider to confirm if we are in-network.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}