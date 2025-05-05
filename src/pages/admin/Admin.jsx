import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import AppointmentsTable from '../../components/appointments/AppointmentsTable';
import RecordReleaseForms from './RecordReleaseForms';
// import Tcf from '../Packet/InputForms/Tcf';
import Tcfadmin from './Tcfadmin';


const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Cary Physicians Admin</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/create-appointment')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              New Appointment
            </button>
            <button
              onClick={() => {
                // Handle logout - e.g., clear token and redirect
                localStorage.removeItem('authToken');
                navigate('/login');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link 
              to="/admin" 
              className="inline-flex items-center p-2 border-b-2 border-blue-500 text-md font-semibold text-gray-900"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/show-appointments" 
              className="inline-flex items-center p-2 border-b-2 border-transparent text-md font-semibold text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Appointments
            </Link>
            {/* Add more admin navigation links as needed */}
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Dashboard</h2>
              <p className="text-gray-600 mb-4">Welcome to the Cary Physicians admin panel. Use the navigation above to manage appointments and other clinic operations.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Appointments</h3>
                  {/* <p className="text-blue-600 text-2xl font-bold">0</p> */}
                  {/* <p className="text-blue-600 text-sm mt-1">Today</p> */}
                  <Link to="/admin/show-appointments" className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm">
                    View all appointments →
                  </Link>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Release of Medical Record Forms</h3>
                  {/* <p className="text-blue-600 text-2xl font-bold">0</p> */}
                  {/* <p className="text-blue-600 text-sm mt-1">Today</p> */}
                  <Link to="/admin/record_release_forms" className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm">
                    View all forms →
                  </Link>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Telehealth Concent Form</h3>
                  {/* <p className="text-blue-600 text-2xl font-bold">0</p> */}
                  {/* <p className="text-blue-600 text-sm mt-1">Today</p> */}
                  <Link to="/admin/tcf" className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm">
                    View all forms →
                  </Link>
                </div>
                
                {/* Add more dashboard widgets here */}
              </div>
            </div>
          } />
          <Route path="/show-appointments" element={<AppointmentsTable  />} />
          <Route path="/record_release_forms" element={<RecordReleaseForms />} />
          <Route path="/tcf" element={<Tcfadmin />} />

        </Routes>
      </main>
    </div>
  );
};

export default Admin;