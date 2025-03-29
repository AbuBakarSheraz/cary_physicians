import React from 'react';
import Header from './components/layout/Header.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import AboutUs from './components/sections/AboutUs.jsx';
import AboutProvider from './components/sections/Provider.jsx';
import { useRef, useEffect } from "react";
import InsuranceList from './components/sections/Insurance.jsx';
import HealthSections from './components/sections/HealthSection.jsx';
import Guide from './components/sections/Guide.jsx';
import Patienttools from './components/sections/Patienttools.jsx';
import Faqs from './components/sections/Faqs.jsx';
import Footer from './components/sections/Footer.jsx';
'use server';


function App() {
  const aboutref = useRef(null);
  const providerref = useRef(null);
  const appref = useRef(null);
  const haref = useRef(null);


  return (
    <>
    
           <Header aboutref={aboutref} providerref={providerref} appref={appref} haref={haref} />
           <HeroSection />
           <div ref={aboutref}><AboutUs />
           </div>

           <div ref={providerref}><AboutProvider /></div>
           <InsuranceList />

           <div ref={haref}>
           <HealthSections />
           </div>

           <Guide />
           <Patienttools />
           <Faqs />
           <Footer />
           </>
  )
}

export default App

