import React from "react";
'use server';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* First Column */}
          <div>
            <ul className="space-y-2">
              <li>
                <a href="#backtop" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#practice-description" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#practice-intro-content" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#patient-tools" className="text-gray-300 hover:text-white transition-colors">
                  Patient Tools
                </a>
              </li>
            </ul>
          </div>
          
          {/* Second Column */}
          <div>
            <ul className="space-y-2">
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faqs" className="text-gray-300 hover:text-white transition-colors">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#practice-description" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Third Column */}
          <div>
            <h6 className="font-bold text-emerald-400 mb-2">Cary Physicians Primary Care, PLLC</h6>
            <address className="not-italic text-gray-300 leading-relaxed">
              115 Parkway Office Ct, suite 104, Cary NC, 27518<br />
              <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:919 230 7439" className="text-emerald-300 hover:text-emerald-200 transition-colors">
                919 230 7439
              </a><br />
              <span className="font-semibold">Fax:</span>{" "}
              <a href="fax:1 855 576 4929" className="text-emerald-300 hover:text-emerald-200 transition-colors">
                1 855 576 4929
              </a><br />
              <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:office@caryphysicians.com" className="text-emerald-300 hover:text-emerald-200 transition-colors">
                office@caryphysicians.com
              </a>
            </address>
          </div>
        </div>
        
        {/* Bottom Row with Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 flex justify-between items-center">
          <div>
            <a href="/" className="flex items-center">
              <span className="bg-emerald-400 h-8 w-8 rounded-full flex items-center justify-center mr-2">
                <span className="text-gray-800 font-bold">CP</span>
              </span>
              <span className="text-white font-medium">Cary Physicians</span>
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            Made with love on Earth By {" "}
            <a 
              href="www.linkedin.com/in/abubakar-sheraz-350085222" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-emerald-300 hover:text-emerald-200 transition-colors underline"
            >
              Sheraz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}