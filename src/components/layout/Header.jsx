'use server';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from "lucide-react";
import logo from '/logos/logo.webp';
import Button from '../ui/Button';
import { Helmet } from 'react-helmet';

export default function Header({ aboutref, providerref, appref, haref }) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile drawer when location changes
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location]);
  const scrollToSection = (event, ref, path) => {
    event.preventDefault();
    
    // If we're already on the homepage, just scroll to the section
    if (location.pathname === '/') {
      const header = document.querySelector("header");
      const offset = header ? header.offsetHeight : 80;
      const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      
      // Use pushState instead of replaceState to create proper history entries
      if (path !== window.location.pathname + window.location.hash) {
        window.history.pushState(null, "", path);
      }
    } 
    // For non-homepage, use standard navigation with hash
    else {
      // Navigate to homepage with the hash in the URL
      window.location.href = `/${path}`;
      // The browser will automatically scroll to the element with matching ID
    }
  }
  
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  }
  
  // Healthcare services data organized in columns
  const healthcareServices = [
    {
      title: "Primary Care",
      services: [
        { name: "Annual Check-ups", link: "/services/annual-checkups" },
        { name: "Preventive Care", link: "/services/preventive-care" },
        { name: "Vaccinations", link: "/services/vaccinations" },
        { name: "Chronic Disease Management", link: "/services/chronic-disease" }
      ]
    },
    {
      title: "Specialty Services",
      services: [
        { name: "Cardiology", link: "/services/cardiology" },
        { name: "Dermatology", link: "/services/dermatology" },
        { name: "Endocrinology", link: "/services/endocrinology" },
        { name: "Gastroenterology", link: "/services/gastroenterology" }
      ]
    },
    {
      title: "Mental Health",
      services: [
        { name: "Counseling", link: "/services/counseling" },
        { name: "Depression Treatment", link: "/services/depression" },
        { name: "Anxiety Management", link: "/services/anxiety" },
        { name: "Behavioral Health", link: "/services/behavioral-health" }
      ]
    },
    {
      title: "Testing & Diagnostics",
      services: [
        { name: "Lab Services", link: "/services/lab-services" },
        { name: "X-Ray & Imaging", link: "/services/imaging" },
        { name: "EKG", link: "/services/ekg" },
        { name: "Allergy Testing", link: "/services/allergy-testing" }
      ]
    }
  ];
  
  // Schema.org JSON-LD data for healthcare organization
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Cary Physicians",
    "logo": "/logos/logo.webp",
    "url": "https://caryphysicians.com",
    "telephone": "919 230 7439",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "115 Parkway Office Ct, suite 104",
      "addressLocality": "Cary",
      "addressRegion": "NC",
      "postalCode": "27518",
      "addressCountry": "US"
    },
    "openingHours": "Mo,Tu,We,Th,Fr 08:00-17:00",
    "sameAs": [
      "https://facebook.com/caryphysicians",
      "https://twitter.com/caryphysicians",
      "https://linkedin.com/company/caryphysicians"
    ],
    "medicalSpecialty": [
      "Primary Care",
      "Family Medicine"
    ]
  };

  // Utility function for navigation links that handles both routes and sections
  const handleNavigation = (e, ref, path) => {
    if (ref && ref.current) {
      scrollToSection(e, ref, path);
    } else {
      navigate(path);
    }
    setDropdown(false);
  };
  
  return (
    <>
      {/* Schema.org structured data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <meta name="description" content="Cary Physicians provides comprehensive healthcare services for patients in Cary, NC and surrounding areas." />
        <meta name="keywords" content="Cary healthcare, physicians, medical services, family medicine, primary care" />
      </Helmet>
      
      <header className="sticky top-0 z-50 w-full bg-emerald-400 shadow-md" itemScope itemType="https://schema.org/MedicalOrganization">
        <div className="container relative  mx-auto px-4">
          <div className="flex  items-center justify-between py-2">
            {/* Logo with schema.org markup */}
            <div className="flex  items-center">
              <Link to="/">
                <img src={logo} alt="Cary Physicians Logo" className="h-23 w-auto" itemProp="logo" />
              </Link>
              <span className="ml-2 text-xl md:text-2xl tracking-wide font-bold text-gray-800" itemProp="name">Cary Physicians</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden relative lg:flex items-center space-x-10" role="navigation" aria-label="Main Navigation">
              <Link to="/" className="text-gray-700 text-lg font-medium hover:text-white transition-all duration-500 ease-in-out">
                Home
              </Link>
              
              {/* Using Link for SPA navigation */}
              <Link 
                className="text-gray-700 text-lg font-medium hover:text-white  transition-all duration-500 ease-in-out"
                to="/about"
                onClick={(e) => aboutref && scrollToSection(e, aboutref, "#about")}
              >
                About
              </Link>  
              
              <Link 
                className="text-gray-700 text-lg font-medium hover:text-white  transition-all duration-500 ease-in-out"
                to="/provider"
                onClick={(e) => providerref && scrollToSection(e, providerref, "#provider")}
              >
                Provider
              </Link> 
              
              {/* Healthcare Services with Dropdown */}
              <div 
                className="" 
                ref={dropdownRef}
                onMouseEnter={() => setDropdown(true)}
              >
                <Link 
                  to="/services"
                  className="text-gray-700 text-lg font-medium hover:text-white   transition-all duration-500 ease-in-out"
                >
                  Healthcare Services
                </Link>
                
                {/* Multi-column dropdown menu */}
                {dropdown && (
                  <div 
                  onMouseLeave={() => setDropdown(false)}

                  className="absolute left-0 top-15 mt-2 w-screen max-w-4xl bg-emerald-400 rounded-md shadow-lg py-4 z-50 grid grid-cols-4 gap-6 px-6 border border-gray-200">
                    {healthcareServices.map((column, index) => (
                      <div key={index} className="flex flex-col">
                        <h3 className="text-emerald-600 font-semibold text-lg border-b border-emerald-200 pb-2 mb-2">{column.title}</h3>
                        <ul className="space-y-2">
                          {column.services.map((service, serviceIndex) => (
                            <li key={serviceIndex}>
                              <Link 
                                to={service.link}
                                className="text-gray-700 hover:text-emerald-500 transition-colors duration-200"
                                onClick={() => setDropdown(false)}
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
             
              <Link 
                to="/healthaccess"
                onClick={(e) => haref && scrollToSection(e, haref, "#healthaccess")} 
                className="text-gray-700 text-lg font-medium hover:text-white  transition-all duration-500 ease-in-out"
              >
                Health Access
              </Link>
            </nav>
            
            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="primary" onClick={() => window.open("https://link.clover.com/urlshortener/VKbGDj", "_blank")}>
                Pay
              </Button>
              <Link 
              to="/create-appointments"
               className='bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 text-sm font-semibold rounded-lg transition duration-300 ease-in-out' 
               >
                Request Apppointment
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button 
                onClick={toggleNavbar} 
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                aria-expanded={mobileDrawerOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileDrawerOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Drawer */}
        {mobileDrawerOpen && (
          <div className="lg:hidden bg-gray-800 border-t py-4 px-6">
            <nav className="flex flex-col space-y-4 mb-6" role="navigation" aria-label="Mobile Navigation">
              <Link 
                to="/" 
                className="text-white text-lg font-medium hover:text-white hover:border hover:border-white hover:py-1 hover:px-3 rounded-md transition-all duration-500 ease-in-out"
                onClick={() => setMobileDrawerOpen(false)}
              >
                Home
              </Link>
              <Link 
                className="text-white text-lg font-medium hover:text-white hover:border hover:border-white hover:py-1 hover:px-3 rounded-md transition-all duration-500 ease-in-out"
                to="/about"
                onClick={(e) => {
                  aboutref && scrollToSection(e, aboutref, "#about");
                  setMobileDrawerOpen(false);
                }}
              >
                About
              </Link>  
              <Link 
                className="text-white text-lg font-medium hover:text-white hover:border hover:border-white hover:py-1 hover:px-3 rounded-md transition-all duration-500 ease-in-out"
                to="/provider" 
                onClick={(e) => {
                  providerref && scrollToSection(e, providerref, "#provider");
                  setMobileDrawerOpen(false);
                }}
              >
                Provider
              </Link> 
              
              {/* Mobile Healthcare Services (expand/collapse) */}
              <div className="relative">
                <div className="flex justify-between items-center">
                  <Link 
                    to="/services"
                    className="text-white text-lg font-medium hover:text-white hover:border hover:border-white hover:py-1 hover:px-3 rounded-md transition-all duration-500 ease-in-out"
                    onClick={() => setMobileDrawerOpen(false)}
                  >
                    Healthcare Services
                  </Link>
                  <button 
                    onClick={() => setDropdown(!dropdown)} 
                    className="text-white p-1"
                    aria-label={dropdown ? "Hide services" : "Show services"}
                  >
                    {dropdown ? '−' : '+'}
                  </button>
                </div>
                
                {dropdown && (
                  <div className="mt-2 pl-4 space-y-4">
                    {healthcareServices.map((column, index) => (
                      <div key={index} className="mt-2">
                        <h3 className="text-emerald-300 font-semibold border-b border-gray-700 pb-1 mb-2">{column.title}</h3>
                        <ul className="space-y-2 pl-3">
                          {column.services.map((service, serviceIndex) => (
                            <li key={serviceIndex}>
                              <Link 
                                to={service.link}
                                className="text-gray-300 hover:text-white transition-colors duration-200"
                                onClick={() => setMobileDrawerOpen(false)}
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
             
              <Link 
                to="/healthaccess"
                onClick={(e) => {
                  haref && scrollToSection(e, haref, "#healthaccess");
                  setMobileDrawerOpen(false);
                }} 
                className="text-white text-lg font-medium hover:text-white hover:border hover:border-white hover:py-1 hover:px-3 rounded-md transition-all duration-500 ease-in-out"
              >
                Health Access
              </Link>
            </nav>
            <div className="flex flex-col space-y-3">
              <Button 
                variant="primary" 
                onClick={() => {
                  window.open("https://link.clover.com/urlshortener/VKbGDj", "_blank");
                  setMobileDrawerOpen(false);
                }}
              >
                Pay
              </Button>
              <Button 
                variant="primary" 
                onClick={() => {
                  window.open("https://mycw243.ecwcloud.com/portal28343/jsp/100mp/login_otp.jsp", "_blank");
                  setMobileDrawerOpen(false);
                }}
              >
                Login
              </Button>
            </div>
          </div>
        )}
        
        {/* Hidden semantic content for SEO */}
        <div className="hidden" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">115 Parkway Office Ct, suite 104</span>
          <span itemProp="addressLocality">Cary</span>
          <span itemProp="addressRegion">NC</span>
          <span itemProp="postalCode">27518</span>
          <span itemProp="addressCountry">US</span>
        </div>
        <div className="hidden">
          <span itemProp="telephone">919 230 7439</span>
        </div>
      </header>
    </>
  );
}