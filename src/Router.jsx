import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home.jsx';
// import Home from '../components/pages/Home.jsx';
import ServicePage from './components/sections/ServicePage.jsx';
// import ServicePage from './sections/ServicePage';
import ServicesMain from './components/sections/ServiceMain.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesMain />} />
          <Route path="services/:serviceType" element={<ServicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;