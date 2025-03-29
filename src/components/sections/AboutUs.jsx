

'use server';
import React from 'react'
import ContactInfo from './ContactInfo'
import Gallery from './Gallery'

function AboutUs() {
  return (
    <>
    <div className="flex justify-center m-12">
    <div className="h-1 w-36 bg-emerald-400 rounded-full"></div>
  </div>
    <div className="container mx-auto px-6  max-w-7xl">

    
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - About Information */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Welcome to <span className="text-emerald-500">Cary Physicians</span>
          </h1>
          
          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="mb-4">
              At <strong>Cary Physicians Primary Care PLLC</strong>, we provide 
              <strong> comprehensive primary care</strong> for individuals and families 
              in Cary, NC.
            </p>
            
            <p className="mb-4">
              Our experienced <strong>Doctors, nurses, and healthcare professionals</strong> are 
              committed to delivering personalized, high-quality <strong>medical care</strong> to 
              meet your health needs.
            </p>
            
            <p className="mb-4">
              Whether you need <strong>routine check-ups, preventive care, chronic disease 
              management, or urgent medical attention</strong>, we are here to support you with 
              compassionate, patient-focused healthcare.
            </p>
          </div>
          
          <div className="border-2 border-gray-200 rounded-lg p-6 shadow-sm bg-gray-50">
            <h4 className="font-semibold text-xl text-emerald-500 mb-2">Accreditations</h4>
            <p className="mb-4">ABIM Board Certified</p>
            
            <h4 className="font-semibold text-xl text-emerald-500 mb-2">Specialties</h4>
            <ul className="list-disc pl-5">
              <li className="mb-1">Internal Medicine</li>
              <li>Primary Care</li>
            </ul>
          </div>
          <div>
            <Gallery />
        </div>
        </div>
        
        {/* Right Column - Contact Information */}
        <div className="w-full md:w-1/2">
          <ContactInfo />
        </div>
       
      </div>
      
    </div>
    </>
  )
}

export default AboutUs