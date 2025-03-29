import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
'use server';


export default function PatientToolsTabs() {
  // Define the tab data
  const tabData = [
    {
      id: "check-in",
      label: "Easy Check-in",
      iframeSrc: "https://mgdportal.eclinicalweb.com/portalNew/jsp/PP_Interim_Page/new-pp-local/kiosk.html",
      iframeId: "i-checkin-content",
      iframeClass: "mgdiframe-checkin"
    },
    {
      id: "reminders",
      label: "Reminders & Notifications",
      iframeSrc: "https://mgdportal.eclinicalweb.com/portalNew/jsp/PP_Interim_Page/new-pp-local/reminders.html",
      iframeId: "i-reminders-content",
      iframeClass: "mgdiframe-reminders"
    },
    {
      id: "virtual-visits",
      label: "Virtual Visits",
      iframeSrc: "https://mgdportal.eclinicalweb.com/portalNew/jsp/PP_Interim_Page/new-pp-local/televisit.html", 
      iframeId: "i-virtual-visits",
      iframeClass: "mgdiframe-visits"
    }
  ];

  // Set the active tab state
  const [activeTab, setActiveTab] = useState("check-in");

  // Function to resize iframes (emulating the original functionality)
  const resizeIframe = (iframeId) => {
    try {
      const iframe = document.getElementById(iframeId);
      if (iframe && iframe.contentWindow) {
        const height = iframe.contentWindow.document.body.scrollHeight;
        iframe.height = `${height + 20}px`;
      }
    } catch (error) {
      console.error("Error resizing iframe:", error);
    }
  };

  // Add the schema.org structured data for healthcare services
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Cary Physicians Practice",
    "url": "https://caryphysicians.com",
    "logo": "https://caryphysicians.com/logo.png",
    "serviceType": [
      {
        "@type": "MedicalProcedure",
        "name": "Easy Check-in",
        "description": "Digital check-in process for appointments"
      },
      {
        "@type": "MedicalProcedure",
        "name": "Virtual Visits",
        "description": "Telehealth appointments with healthcare providers"
      }
    ],
    "availableService": {
      "@type": "MedicalTherapy",
      "name": "Patient Reminders",
      "description": "Automated reminder system for appointments and medication"
    }
  };

  return (
    <>
    <HelmetProvider>
      <Helmet>
        {/* <title>Patient Tools | Digital Healthcare Services</title> */}
        <meta name="description" content="Digital tools for patients' convenience including easy check-in, appointment reminders, and virtual visits." />
        <meta name="keywords" content="patient tools, easy check-in, virtual visits, appointment reminders, telehealth" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      </HelmetProvider>

      <section id="patient-tools" className="py-8  ">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Decorative element */}
          <div className="flex justify-center mb-4">
            <div className="h-1 w-28 bg-emerald-400 rounded-full"></div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            Tools for Patients' Convenience
          </h2>

          {/* Tab navigation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex justify-center flex-wrap">
                {tabData.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-block py-4 px-6 font-medium text-sm md:text-base border-b-2 transition-colors
                    ${activeTab === tab.id
                      ? "border-emerald-500 text-emerald-600"
                      : "border-transparent text-gray-500 hover:text-emerald-500 hover:border-emerald-300"
                    }`}
                    aria-current={activeTab === tab.id ? "page" : undefined}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content */}
            <div className="p-6">
              {tabData.map((tab) => (
                <div
                  key={tab.id}
                  className={`transition-opacity duration-300 ${
                    activeTab === tab.id ? "block opacity-100" : "hidden opacity-0"
                  }`}
                  role="tabpanel"
                  aria-labelledby={`${tab.id}-tab`}
                >
                  <iframe
                    id={tab.iframeId}
                    className={`w-full min-h-[500px] rounded ${tab.iframeClass}`}
                    src={tab.iframeSrc}
                    frameBorder="0"
                    scrolling="no"
                    onLoad={() => resizeIframe(tab.iframeId)}
                    title={tab.label}
                  />
                </div>
              ))}
            </div>
          </div>

        
        </div>
      </section>
    </>
  );
}