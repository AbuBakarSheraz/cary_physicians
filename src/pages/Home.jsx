import React from 'react';
import { useOutletContext } from 'react-router-dom';
import AboutUs from '../components/sections/AboutUs';
import AboutProvider from '../components/sections/Provider';
import InsuranceList from '../components/sections/Insurance';
import HealthSections from '../components/sections/HealthSection';
import Guide from '../components/sections/Guide';
import Patienttools from '../components/sections/Patienttools';
import Faqs from '../components/sections/Faqs';
import HeroSection from '../components/sections/HeroSection';
'use server';


const Home = () => {
  // Get refs from the Layout component
  const { aboutref, providerref, appref, haref } = useOutletContext();

  return (
    <>
    <HeroSection />
      <div ref={aboutref}>
        <AboutUs />
      </div>
      <div ref={providerref}>
        <AboutProvider />
      </div>
      <InsuranceList />
      <div ref={haref}>
        <HealthSections />
      </div>
      <Guide />
      <Patienttools />
      <Faqs />
    </>
  );
};

export default Home;