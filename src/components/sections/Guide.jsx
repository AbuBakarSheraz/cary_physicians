import React from "react";
import { Helmet } from "react-helmet";
'use server';


export default function HealowSetupGuide() {
  const steps = [
    {
      id: 1,
      description: "Download the healow app from App Store (iPhone) or Google Play (Android Phone)."
    },
    {
      id: 2,
      description: "Search for our practice by entering this unique code on the healow app - GFAHDD."
    },
    {
      id: 3,
      description: "Enter your portal username and password."
    },
    {
      id: 4,
      description: "Set up your PIN to securely access your health record."
    }
  ];

  return (
    <>
    
      <Helmet>
        {/* <title>Set Up Healow App | Patient Portal Access in 4 Easy Steps</title> */}
        <meta name="description" content="Set up the healow app in four easy steps to access your health records. Use our unique practice code GFAHDD to connect with our clinic." />
        <meta name="keywords" content="healow app, patient portal, healthcare app, medical records, GFAHDD" />
        <link rel="canonical" href="https://caryphysician.com/patient-resources/healow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Set Up the Healow Smartphone App",
              "description": "Follow these four easy steps to set up the healow smartphone app and access your patient portal.",
              "step": steps.map((step) => ({
                "@type": "HowToStep",
                "position": step.id,
                "name": `Step ${step.id}`,
                "text": step.description
              }))
            })
          }}
        />
      </Helmet>

      <section className="bg-gradient-to-b  py-6">
        <div className="container px-6 mx-auto max-w-7xl">
          {/* Decorative top element */}
          <div className="flex justify-center mb-4">
            <div className="h-1 w-28 bg-emerald-400 rounded-full"></div>
          </div>
          
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800">
            Set up the healow smartphone app in four easy steps!
          </h2>
          
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {steps.map((step) => (
              <div key={step.id} className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-emerald-400">
                <div className="p-4 flex items-start">
                  <div className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-3 flex-shrink-0">
                    {step.id}
                  </div>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Practice Code */}
          <div className="bg-white mt-6 rounded-lg shadow-md p-5 border-l-4 border-emerald-400">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Use this unique code to search our practice on the healow app
              </h3>
              <div className="inline-block mt-2 mb-2">
                <p className="text-sm text-gray-600 mb-1">Practice Unique Code</p>
                <div className="bg-emerald-50 text-emerald-600 text-4xl font-bold py-2 px-6 rounded-md">
                  GFAHDD
                </div>
              </div>
            </div>
            
            {/* App Store Links */}
            <div className="flex justify-center space-x-3 mt-4">
              <a 
                href="https://apps.apple.com/us/app/healow/id595012291" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.healow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181.181-.29.423-.29.684V1.13c0 .261.109.503.29.684zm10.831 10.833l2.651-2.54 3.366 1.99c.671.396.67 1.365-.01 1.755l-3.356 1.98-2.651-2.54 2.651-2.54-2.651 2.895zm-1.325-1.263L4.278 3.242l9.755 5.773-1.999 1.999 1.081 1.371zm0 .841l-.918 1.453 1.92.847 2.138-1.181-3.14-1.119zm-8.66 7.564l8.837-8.837 1.999-1.999-9.755 5.773-1.081 5.063z" />
                </svg>
                Google Play
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}