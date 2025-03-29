import React from 'react';
import { useParams, Link } from 'react-router-dom';
'use server';


const ServicePage = () => {
  const { serviceType } = useParams();
  
  // Function to convert URL param to readable title
  const formatServiceTitle = (serviceType) => {
    return serviceType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // You can expand this with a database or larger object of service information
  const serviceContent = {
    'annual-checkups': {
      title: 'Annual Check-ups',
      description: 'Regular annual check-ups are essential for preventive healthcare and early detection of potential health issues.',
      features: [
        'Comprehensive physical examination',
        'Blood pressure and vitals check',
        'Review of medical history',
        'Age-appropriate screening tests'
      ]
    },
    'preventive-care': {
      title: 'Preventive Care',
      description: 'Our preventive care services help you maintain good health and prevent diseases before they start.',
      features: [
        'Immunizations and vaccinations',
        'Health risk assessments',
        'Lifestyle counseling',
        'Personalized prevention plans'
      ]
    },
    // Add more services as needed
  };
  
  // Fallback content for services not yet detailed in the database
  const defaultContent = {
    title: formatServiceTitle(serviceType),
    description: `Our ${formatServiceTitle(serviceType)} services provide comprehensive care tailored to your specific health needs.`,
    features: [
      'Personalized treatment plans',
      'Experienced healthcare providers',
      'State-of-the-art facilities',
      'Integrated care approach'
    ]
  };
  
  // Get content for this service (use default if not found)
  const content = serviceContent[serviceType] || defaultContent;
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/services" className="text-emerald-600 hover:text-emerald-800">
          ← Back to All Services
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{content.title}</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
        <div className="p-6">
          <p className="text-lg text-gray-700 mb-6">{content.description}</p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <ul className="space-y-2 mb-6">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Schedule an Appointment</h3>
            <p className="text-gray-700 mb-4">
              Contact us to schedule your appointment or learn more about our {content.title.toLowerCase()} services.
            </p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;