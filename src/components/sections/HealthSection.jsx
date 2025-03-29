import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
'use server';


const PatientPortal = () => {
  return (
    <section id="patient-portal" className=" pt-10 px-8">
      <div className="container mx-auto max-w-7xl pt-4 px-5">
        {/* Decorative top element */}
        <div className="flex justify-center mb-4">
          <div className="h-1 w-28 bg-emerald-400 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          <span className="text-emerald-400">Patient</span> Portal
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105">
            <img
              className="w-full h-auto"
              src="https://mgdportal.eclinicalweb.com/portalNew/jsp/PP_Interim_Page/new-pp-local/images/portal.png"
              alt="Patient Portal"
            />
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h4 className="text-xl font-semibold text-emerald-600 mb-4">
              Our Patient Portal gives you secure online access to your health information
            </h4>
            
            <p className="mt-4 text-gray-700 leading-relaxed">
              Patient Portal is a secure, convenient, and easy-to-use website that gives you round-the-clock 
              access to your health information. View labs, medications, and immunization records. 
              Get reminders. Exchange messages with your doctor. Stay informed and take charge of your health!
            </p>
            
            <div className="mt-8">
              <h6 className="text-lg font-medium text-emerald-500">Here's what you can do with our portal</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <ul className="space-y-3">
                  {[
                    "View lab results",
                    "Send & receive messages securely",
                    "Access health records"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 text-emerald-400 mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3">
                  {[
                    "Book appointments online",
                    "Get statements and receipts online",
                    "View doctors' notes"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 text-emerald-400 mr-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
              <a
                href="https://mycw243.ecwcloud.com/portal28343/jsp/100mp/login_otp.jsp" 
                className="block w-full text-center bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Patient Portal Login
              </a>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Need help logging in? Call us at <a href="tel:919 230 7439" className="text-blue-500 hover:underline font-medium">(919) 230-7439</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const HealthAccess = () => {
  return (
    <section id="healow-app" className="bg-white px-8 mt-8">
      <div className="container mx-auto max-w-7xl px-5 mb-8">
        {/* Decorative top element */}
        <div className="flex justify-center mb-4">
          <div className="h-1 w-28 bg-emerald-400 rounded-full"></div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-10">
          Health <span className="text-emerald-400">Access</span> App
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="p-6 bg-white rounded-xl shadow-md order-2 md:order-1">
            <h4 className="text-xl font-semibold text-emerald-600 mb-4">
              Online health access on your smartphone
            </h4>
            
            <p className="mt-4 text-gray-700 leading-relaxed">
              Access your health record with the healow™ smartphone app. Along with the features 
              you get with our Patient Portal, the healow app can manage multiple accounts (all family members), 
              set medication and appointment reminders, and use trackers to help manage health.
            </p>
            
            <p className="mt-4 text-gray-700 leading-relaxed">
              healow is available free on the 
              <a href="https://goo.gl/LhQBBk" target="_blank" rel="noopener noreferrer" className="text-blue-500 mx-1 hover:underline">Apple App Store</a> 
              and 
              <a href="https://goo.gl/vssCoR" target="_blank" rel="noopener noreferrer" className="text-blue-500 mx-1 hover:underline">Google Play Store</a>.
            </p>
            
            <div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
              <h6 className="text-lg font-medium text-emerald-500 mb-4">Download the healow smartphone app</h6>
              
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <a 
                  href="https://goo.gl/LhQBBk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  <img className="w-36 h-auto"   src="https://mgdportal.eclinicalweb.com/portalNew/jsp/PP_Interim_Page/new-pp-local/images/app_store_button.png"
                   alt="App Store"  />
                </a>
                <a 
                  href="https://goo.gl/vssCoR" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  <img className="w-36 h-auto" src="https://mgdportal.eclinicalweb.com/portalNew/jsp/PP_Interim_Page/new-pp-local/images/play_store_button.png"
                  alt="Play Store" />
                </a>
              </div>
              
              <p className="text-sm text-gray-600 mt-6 text-center md:text-left">
                To learn more about healow, 
                <a href="https://healow.com/healowHomeRedirect.jsp" target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-1 hover:underline">
                  click here
                </a>
              </p>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden ml-18 transform transition-all duration-300 hover:scale-105 order-1 md:order-2">
            <img
              className="w-full h-auto"
              src="https://mgdportal.eclinicalweb.com/portalNew/jsp/PP_Interim_Page/new-pp-local/images/healow-image.jpg"
              width="394" height="328" alt="healow app" />
            
          </div>
        </div>
      </div>
    </section>
  );
};

const HealthSections = () => {
  return (
    <>
    <HelmetProvider>
      <Helmet>
        {/* <title>Patient Portal & Health Access | Manage Your Health Online</title> */}
        <meta name="description" content="Access your health information online through our secure Patient Portal and healow smartphone app. View lab results, book appointments, and more." />
        <meta name="keywords" content="patient portal, healow app, online health access, medical records, telemedicine" />
        <link rel="canonical" href="https://yourhealthclinic.com/patient-resources" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Patient Portal & Health Access",
              "mainEntity": {
                "@type": "MedicalOrganization",
                "name": "Your Health Clinic",
                "url": "https://yourhealthclinic.com/patient-portal",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+9192307439",
                  "contactType": "customer support"
                },
                "serviceType": "Online Patient Portal",
                "provider": {
                  "@type": "MedicalOrganization",
                  "name": "Your Health Clinic"
                }
              }
            })
          }}
        />
      </Helmet>
      </HelmetProvider>
    
      <div className="overflow-hidden ">
        <PatientPortal />
        
        <HealthAccess />
      </div>
    </>
  );
};

export default HealthSections;