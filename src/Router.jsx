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
import Loginadmin from './auth/Loginadmin.jsx'; // Import the Login component
import AppointmentsTable from './components/appointments/AppointmentsTable.jsx';
import AppointmentForm from './components/appointments/AppointmentForm.jsx';

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
    path: "/admin",
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
  
    ]
  },
  { path: "*", element: <NotFound /> }, // Wildcard route for 404

]);

const RouterComponent = () => {
  return <RouterProvider router={router} />;
};

export default RouterComponent;