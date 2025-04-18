import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, UserCircle, FileText, Stethoscope } from 'lucide-react';

function Goto() {
  const links = [
    { 
      name: "Appointment Form", 
      path: "/create-appointments", 
      external: false, 
      icon: <Calendar className="h-5 w-5 text-emerald-600" /> 
    },
    { 
      name: "Patient Portal",
      path: "https://mycw243.ecwcloud.com/portal28343/jsp/100mp/login_otp.jsp", 
      external: true, 
      icon: <UserCircle className="h-5 w-5 text-emerald-600" /> 
    },
    { 
      name: "New Patient Packet", 
      path : "New-Patient-Packet",
      external: false, 
      icon: <FileText className="h-5 w-5 text-emerald-600" /> 
    },
    { 
      name: "Services", 
      path: "/services", 
      external: false, 
      icon: <Stethoscope className="h-5 w-5 text-emerald-600" /> 
    }
  ];

  return (
    <section className="bg-emerald-400 py-10 md:py-12">
      <div className="container px-4 mx-auto md:max-w-7xl">
        <h1 className="font-bold text-3xl md:text-4xl text-white mb-6 md:mb-8">Take me to</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map((item, index) => (
            item.external ? (
              <a 
                key={index}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-emerald-800 py-4 px-5 rounded-lg shadow-md hover:bg-emerald-50 transition-all duration-300 flex justify-between items-center group"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <Link 
                key={index}
                to={item.path}
                className="bg-white text-emerald-800 py-4 px-5 rounded-lg shadow-md hover:bg-emerald-50 transition-all duration-300 flex justify-between items-center group"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                <ArrowRight className="h-5 w-5 text-emerald-600 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

export default Goto;