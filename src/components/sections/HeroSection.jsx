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
          <h3 className="text-white mt-6 text-xl sm:text-2xl">Call: 919-230-7339</h3>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button 
              variant="primary" 
              onClick={() => window.open("https://mycw243.ecwcloud.com/portal28343/jsp/100mp/login_otp.jsp", "_blank")}
              size="sm" 
              className="py-3 w-full sm:w-1/2 hover:bg-red-500 transition-transform hover:scale-105 duration-300 linear"
            >
              Patient Portal Login
            </Button>
            <Link
              to="/create-appointments"
              className="px-4 py-2 w-full sm:w-1/2 hover:bg-red-500 rounded-lg font-semibold transition-transform hover:scale-105 duration-300 linear text-center text-base bg-blue-500 text-white"
            > 
              Request Appointment 
            </Link>
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