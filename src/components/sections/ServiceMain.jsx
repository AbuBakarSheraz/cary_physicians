import React from 'react';
import { Link } from 'react-router-dom';
'use server';

const ServicesMain = () => {
  // Healthcare services data organized in columns (same as in Header)
  const healthcareServices = [
    {
      title: "Primary Care",
      description: "Comprehensive primary care services for patients of all ages.",
      services: [
        { name: "Annual Check-ups", link: "/services/annual-checkups" },
        { name: "Preventive Care", link: "/services/preventive-care" },
        { name: "Vaccinations", link: "/services/vaccinations" },
        { name: "Chronic Disease Management", link: "/services/chronic-disease" }
      ]
    },
    {
      title: "Specialty Services",
      description: "Specialized medical care for specific conditions and needs.",
      services: [
        { name: "Cardiology", link: "/services/cardiology" },
        { name: "Dermatology", link: "/services/dermatology" },
        { name: "Endocrinology", link: "/services/endocrinology" },
        { name: "Gastroenterology", link: "/services/gastroenterology" }
      ]
    },
    {
      title: "Mental Health",
      description: "Supportive mental health services for your overall wellbeing.",
      services: [
        { name: "Counseling", link: "/services/counseling" },
        { name: "Depression Treatment", link: "/services/depression" },
        { name: "Anxiety Management", link: "/services/anxiety" },
        { name: "Behavioral Health", link: "/services/behavioral-health" }
      ]
    },
    {
      title: "Testing & Diagnostics",
      description: "Advanced diagnostic testing for accurate health assessments.",
      services: [
        { name: "Lab Services", link: "/services/lab-services" },
        { name: "X-Ray & Imaging", link: "/services/imaging" },
        { name: "EKG", link: "/services/ekg" },
        { name: "Allergy Testing", link: "/services/allergy-testing" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Healthcare Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive medical care designed to meet your healthcare needs at every stage of life.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {healthcareServices.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-emerald-600 mb-3">{category.title}</h2>
              <p className="text-gray-600 mb-4">{category.description}</p>
              
              <ul className="space-y-2 mb-6">
                {category.services.map((service, serviceIndex) => (
                  <li key={serviceIndex}>
                    <Link 
                      to={service.link}
                      className="text-emerald-500 hover:text-emerald-700 flex items-center group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity">→</span>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Assistance?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Contact us to learn more about our services or to schedule an appointment.
        </p>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-8 rounded-md transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default ServicesMain;