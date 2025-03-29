import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/sections/Footer';
'use server';


const Layout = () => {
  // Create refs to pass to Header
  const aboutref = useRef(null);
  const providerref = useRef(null);
  const appref = useRef(null);
  const haref = useRef(null);

  return (
    <>
      <Header aboutref={aboutref} providerref={providerref} appref={appref} haref={haref} />
      <Outlet context={{ aboutref, providerref, appref, haref }} />
      <Footer />
    </>
  );
};

export default Layout;