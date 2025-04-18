import React from 'react';
import NotFound from './pages/NotFound.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import ServicePage from './components/sections/ServicePage.jsx';
import ServicesMain from './components/sections/ServiceMain.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import Admin from './pages/Admin.jsx';
// import Loginadmin from './auth/Loginadmin.jsx'; // Import the Login component
import Loginadmin from './auth/Loginadmin.jsx'; 
import AppointmentsTable from './components/appointments/AppointmentsTable.jsx';
import AppointmentForm from './components/appointments/AppointmentForm.jsx';
import Options from './pages/Packet/Options.jsx';
import Practicefpform from './pages/Packet/InputForms/Practicefpform.jsx';
import AdvanceBN  from './pages/Packet/InputForms/AdvanceBN.jsx';
import Telehealth from './pages/Packet/InputForms/Telehealth.jsx';
import ReleaseRecord from './pages/Packet/InputForms/RelaeseRecord.jsx'
import RecordReleaseForms from './pages/Packet/Showforms/RecordReleaseForms.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", index: true, element: <Home /> },
      { path: "services", element: <ServicesMain /> },
      { path: "services/:serviceType", element: <ServicePage /> },
    ],
  },
  {
    path : "New-Patient-Packet",
    element : <Options />,
  },
  {
    path : "telehealth_consent",
    element : <Telehealth />,
  },
  {
    path : "Release_Medical_Record",
    element : <ReleaseRecord />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/login",
    element: <Loginadmin />,
  },
  {
    path : "create-appointments",
    element : <AppointmentForm />,
  },
  {
    path : "practice_financial_policy",
    element : <Practicefpform />,
  },
  {
    path : "Advance_Beneficiary_Notice",
    element : <AdvanceBN />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
    children : [
      {
        path : "show-appointments",
        element : <AppointmentsTable />,
      },
      {
        path : "record_release_forms",
        element : <RecordReleaseForms />,
      },
  
    ]
  },
  { path: "*", element: <NotFound /> }, // Wildcard route for 404

]);

const RouterComponent = () => {
  return <RouterProvider router={router} />;
};

export default RouterComponent;