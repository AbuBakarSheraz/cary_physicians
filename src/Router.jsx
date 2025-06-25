import React from 'react';
import NotFound from './pages/NotFound.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import ServicePage from './components/sections/ServicePage.jsx';
import ServicesMain from './components/sections/ServiceMain.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import Admin from './pages/admin/Admin.jsx';
// import Loginadmin from './auth/Loginadmin.jsx'; // Import the Login component
import Loginadmin from './auth/Loginadmin.jsx'; 
import AppointmentsTable from './components/appointments/AppointmentsTable.jsx';
import AppointmentForm from './components/appointments/AppointmentForm.jsx';
import Options from './pages/Packet/Options.jsx';
import Practicefpform from './pages/Packet/InputForms/Practicefpform.jsx';
import AdvanceBN  from './pages/Packet/InputForms/AdvanceBN.jsx';
import Tcf from './pages/Packet/InputForms/Tcf.jsx';
import ReleaseRecord from './pages/Packet/InputForms/RelaeseRecord.jsx'
import RecordReleaseForms from './pages/admin/RecordReleaseForms.jsx';
import Tcfadmin from './pages/admin/Tcfadmin.jsx';
import UploadID from './components/upload/IdUpload.jsx';
import UploadInsurance from './components/upload/UploadInsurance.jsx';
import Showids from './pages/admin/Showids.jsx';
import ShowInsurance from './pages/admin/ShowInsurance.jsx'
// import PrivacyPractice from './pages/Packet/Showforms/PrivacyNotice.jsx'


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
    path : "Telehealth_consent",
    element : <Tcf />,
  },

  {
    path : "Release_Medical_Record",
    element : <ReleaseRecord />,
  },
  {
    path: "",
    element: <App />,
  },
    {
    path: "/uploadId",
    element: <UploadID />,
  },
    
  {
    path: "/upload-insurance-card",
    element: <UploadInsurance />,
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
      {
        path : "tcf",
        element : <Tcfadmin />,
      },
       {
        path : "show-ids",
        element : <Showids />,
      },
      {
        path : "insurance-cards",
        element : <Showids />,
      },
     

  
    ]
  },
  { path: "*", element: <NotFound /> }, // Wildcard route for 404

]);

const RouterComponent = () => {
  return <RouterProvider router={router} />;
};

export default RouterComponent;