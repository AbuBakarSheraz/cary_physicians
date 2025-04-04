import React from "react";
import docpic from '../../assets/images/DocPicture.webp';
import { Helmet } from 'react-helmet';
'use server';

const AboutProvider = () => {
  return (
    <>
      <Helmet>
        {/* <title>Dr. Muhammad A Ghani, MD - Board Certified Internal Medicine | Cary Physicians</title> */}
        <meta name="description" content="Meet Dr. Muhammad A Ghani, MD, a board-certified internal medicine physician with 15+ years of experience. Providing compassionate care in Cary, NC." />
        <meta name="keywords" content="Dr. Muhammad Ghani, internal medicine, Cary NC, physician, board certified, primary care doctor" />
        <link rel="canonical" href="https://caryphysicians.com/about/provider" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y2436H04DJ">
        </script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)
          }
            gtag('js', new Date());

            gtag('config', 'G-Y2436H04DJ');
          </script>
      </Helmet>


      <section
        id="meet-doctor"
        className="bg-gradient-to-b from-white to-emerald-50 py-8"
        itemScope
        itemType="https://schema.org/Physician"
      >
        <div className="container px-8 mx-auto md:max-w-7xl md:p-5">
          {/* Decorative top element */}
          <div className="flex justify-center mb-6">
            <div className="h-1 w-36 bg-emerald-400 rounded-full"></div>
          </div>
          
          {/* Heading */}
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-3 text-gray-800" 
            itemProp="name"
          >
            Meet Your Provider
          </h2>
          
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Dedicated to providing compassionate, evidence-based care tailored to your unique health needs
          </p>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Doctor Image and Credentials Card - Responsive fixes for medium screens */}
            <div className="w-full lg:w-1/3 md:max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:shadow-2xl">
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-emerald-900 to-transparent opacity-20"></div>
                  <img
                    className="w-full aspect-[3/4] object-cover object-center"
                    src={docpic}
                    alt="Dr. Muhammad A Ghani, MD - Board Certified Internal Medicine Physician"
                    itemProp="image"
                    loading="eager"
                  />
                </div>
                
                <div className="p-6 border-t-4 border-emerald-400">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    <span itemProp="name">Dr. Muhammad A Ghani, MD</span>
                  </h3>
                  <p className="text-emerald-600 font-medium mb-4" itemProp="medicalSpecialty">
                    Board Certified Internal Medicine
                  </p>
                  
                  <div className="flex flex-col space-y-3 text-sm">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"></path>
                      </svg>
                      <span className="text-gray-600">15+ Years Experience</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                      </svg>
                      <span className="text-gray-600">Languages: English, Urdu, Hindi, Punjabi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="w-full lg:w-2/3">
              {/* Philosophy of Care */}
              <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border-l-4 border-emerald-400">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                  My Philosophy{'\u00A0'}  <span className="text-emerald-400"> of Care</span>
                </h4>
                <div className="text-gray-700 leading-relaxed" itemProp="description">
                  <p className="mb-4">
                    My philosophy of care revolves in balancing evidence-based scientific research
                    with the realities of patient lives, to make perfect, best health care for every
                    patient.
                  </p>
                  <p className="mb-4">
                    I encourage patients to make early healthy choices and preventive care 
                    now to avoid larger problems later. I also want patients to understand their own
                    health issues well, so that they are better equipped to make informed decisions 
                    about their care.
                  </p>
                  <p>
                    My 15 years of experience working in hospital treating patients
                    give me crucial knowledge for your medical needs. 
                    I look forward to being your adviser to lead a healthy happy life.
                  </p>
                </div>
              </div>

              {/* Background */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-emerald-400">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <svg className="w-6 h-6 text-emerald-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  About My{'\u00A0'} <span className="text-emerald-400"> Journey</span>
                </h4>
                <div className="text-gray-700 leading-relaxed" itemProp="alumniOf">
                  <p className="mb-4">
                    I was born in Pakistan and spent my high school and college years attending 
                    <span className="font-medium"> Nishtar Medical University Multan</span> and then post-graduation in 
                    <span className="font-medium"> King Edward Medical University, Lahore, Pakistan</span>. I then pursued my Internal Medicine Residency Training from the 
                    <span className="font-medium"> University of Tennessee Health Science Center Memphis, Tennessee</span>. While there, I was involved in studies on inpatient hospital medicine.
                  </p>
                  <p>
                    After completing my training, I started my career as traditional medicine with primary care and inpatient hospital medicine in Scotland Memorial Hospital/Scotland Medical Center for 3 years. After that I pursued working as an inpatient hospital medicine in UNC Nash Healthcare system and then UNC Rex healthcare. I enjoy both hospital work and outpatient preventative care.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials & Experience */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Education & Certification */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="bg-emerald-400 px-6 py-4">
                <h4 className="font-bold text-lg text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Education & Certification
                </h4>
              </div>
              <div className="p-6">
                <div className="mb-6" itemProp="hasCredential">
                  <h5 className="font-semibold text-gray-800 mb-2">Medical Education</h5>
                  <p className="text-gray-600">Nishtar Medical University, Multan Pakistan</p>
                </div>
                <div className="mb-6" itemProp="hasCredential">
                  <h5 className="font-semibold text-gray-800 mb-2">Residency Training</h5>
                  <p className="text-gray-600">University of Tennessee Health Science Center, Memphis TN</p>
                </div>
                <div itemProp="hasCredential">
                  <h5 className="font-semibold text-gray-800 mb-2">Board Certification</h5>
                  <p className="text-gray-600">Internal Medicine - Board Certified</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="bg-emerald-400 px-6 py-4">
                <h4 className="font-bold text-lg text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Professional Experience
                </h4>
              </div>
              <div className="p-6" itemProp="workLocation">
                <h5 className="font-semibold text-gray-800 mb-3">Primary and Hospital Internal Medicine at:</h5>
                <ul className="space-y-3">
                  {[
                    "Scotland Medical Center, Laurinburg NC",
                    "UNC Nash Healthcare System, Rocky Mount NC",
                    "UNC Rex Healthcare, Raleigh NC",
                    "North Carolina Specialty Hospital, Durham NC"
                  ].map((experience, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{experience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Additional structured data for SEO - hidden but helpful for search engines */}
          <div className="hidden" itemScope itemType="https://schema.org/MedicalSpecialty">
            <meta itemProp="name" content="Internal Medicine" />
            <meta itemProp="relevantSpecialty" content="Primary Care" />
          </div>
          
          <div className="hidden">
            <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <meta itemProp="addressLocality" content="Cary" />
              <meta itemProp="addressRegion" content="NC" />
            </span>
            <meta itemProp="medicalSpecialty" content="Internal Medicine" />
            <meta itemProp="availableLanguage" content="English, Urdu, Hindi, Punjabi" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutProvider;