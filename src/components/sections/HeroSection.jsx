import React from 'react';
'use server';
import Button from '../ui/Button';
import heroimage from '../../assets/images/hero-bg.webp';
import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom left, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0) ), url(${heroimage})`,
          height: "650px",
        }}
        className="bg-cover bg-center bg-no-repeat flex h-full justify-end"
      >
        <div className="h-full w-full px-4 sm:px-6 md:w-[520px] flex flex-col justify-center text-end sm:mr-6 md:mr-10 lg:mr-50">
          <h1 
            style={{ textShadow: "2px 1px white" }}        
            className="text-heading text-[26px] tracking-wider mt-2 font-bold md:text-3xl lg:text-[53px]"
          >
            Cary Physicians Primary Care, PLLC
          </h1>
          <h3 
            className="mt-6 font-semibold tracking-normal text-[18px] md:text-lg leading-9 text-white text-end"
          >
            Dedicated to providing comprehensive primary care services for individuals and families in our community.
          </h3>
                   
          <h3 className="text-white mt-6 text-xl sm:text-2xl">
  Call: <a href="tel:9192307439" className="underline hover:text-gray-300">919 230 7439</a>
</h3>


          
              ///

          <div className="grid grid-cols-1 mr-0 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 max-w-5xl mx-auto">
  <Button 
    variant="primary" 
    onClick={() => window.open("https://mycw243.ecwcloud.com/portal28343/jsp/100mp/login_otp.jsp", "_blank")}
    size="sm" 
    className="py-3 w-full hover:bg-red-500 transition-transform hover:scale-105 duration-300 linear"
  >
    Patient Portal Login
  </Button>

  <Link
    to="/create-appointments"
    className="px-4 py-3 w-full hover:bg-red-500 rounded-lg font-semibold transition-transform hover:scale-105 duration-300 linear text-center text-base bg-blue-500 text-white"
  > 
    Request Appointment 
  </Link>

  <Link
    to="/new-patient-packet"
    className="px-4 py-3 w-full hover:bg-red-500 rounded-lg font-semibold transition-transform hover:scale-105 duration-300 linear text-center text-base bg-blue-500 text-white"
  > 
    New Patient Packet
  </Link>

  <Link
    to="/uploadId"
    className="px-4 py-3 w-full hover:bg-red-500 rounded-lg font-semibold transition-transform hover:scale-105 duration-300 linear text-center text-base bg-blue-500 text-white"
  > 
    Upload ID Card
  </Link>

  {/* <Link
    to="/upload-insurance-card"
    className="px-4 py-3 w-full hover:bg-red-500 rounded-lg font-semibold transition-transform hover:scale-105 duration-300 linear text-center text-base bg-blue-500 text-white"
  > 
    Upload Insurance Card
  </Link> */}
</div>

        </div>
      </div>
      <div className="bg-gray-200 p-3 flex">
        <div className="ml-2 bg-error text-white w-6 h-6 flex items-center justify-center rounded-full">
          <Info className="text-white" />
        </div>
        <p className="ml-2">Please use messages for non-urgent communications only. If this is an emergency, please call 911.</p>
      </div>
    </>
  );
}

export default HeroSection;