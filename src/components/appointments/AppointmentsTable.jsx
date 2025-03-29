import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../../services/appointmentService';
import AppointmentDetailModal from './AppointmentDetailModal';

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchAppointments();
  }, []);
  
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentService.getAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load appointments. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleViewDetails = async (id) => {
    try {
      setLoading(true);
      const response = await appointmentService.getAppointmentById(id);
      if (response.success) {
        setCurrentAppointment(response.appointment);
        setShowModal(true);
      }
    } catch (err) {
      setError('Failed to load appointment details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handledelete = async(id) => {
    try {
        setLoading(true);
        const response = await appointmentService.deleteAppointmentById(id);
        if (response.success) {
          setAppointments((prev) => prev.filter((appt) => appt.id !== id));
          console.log("Appointment deleted successfully");
          
        }
      } catch (err) {
        setError('Failed to delete the appointment.');
        console.error(err);
      } finally {
        setLoading(false);
      }

  };
  
  return (
    <>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
            <p className="mt-1 text-sm text-gray-500">A list of all patient appointments.</p>
          </div>
          <button
            onClick={() => navigate('/create-appointment')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            New Appointment
          </button>
        </div>
        
        {error && (
          <div className="m-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {loading && !showModal ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-[15px] font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-[15px] font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-[15px] font-medium text-gray-500 uppercase tracking-wider">Demographics</th>
                  <th className="px-6 py-3 text-left text-[15px] font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-6 py-3 text-center text-[15px] font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.full_name}</div>
                        {/* <div className="text-sm text-gray-500">ID: {appointment.id}</div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.email}</div>
                        <div className="text-sm text-gray-500">{appointment.phone_number} ({appointment.phone_type})</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Age: {appointment.age}, {appointment.gender}</div>
                        <div className="text-sm text-gray-500">{appointment.city}, {appointment.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.preferred_day}, {appointment.preferred_time}</div>
                        <div className="text-sm text-gray-500">{new Date(appointment.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        <button
                          onClick={() => handleViewDetails(appointment.id)}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handledelete(appointment.id)}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          Delete ppointment
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {showModal && currentAppointment && (
        <AppointmentDetailModal 
          appointment={currentAppointment} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default AppointmentsTable;