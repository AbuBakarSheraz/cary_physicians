import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../../services/appointmentService';
import img from '/logos/logo.webp';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    phone_type: 'Mobile',
    age: '',
    gender: 'Male',
    city: '',
    state: '',
    insurance_holder: 'no',
    insurance_company: '',
    reason: '',
    preferred_day: 'Monday',
    preferred_time: 'Morning'
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      
      const response = await appointmentService.createAppointment(formData);
      if (response.success) {
        setSuccess(true);
        // Reset form after successful submission
        setFormData({
          full_name: '',
          email: '',
          phone_number: '',
          phone_type: 'Mobile',
          age: '',
          gender: 'Male',
          city: '',
          state: '',
          insurance_holder: 'no',
          insurance_company: '',
          reason: '',
          preferred_day: 'Monday',
          preferred_time: 'Morning'
        });
        
        // Redirect to thank you page or admin dashboard if an admin is using this form
        setTimeout(() => {
          if (window.location.pathname.includes('/admin')) {
            navigate('/admin/show-appointments');
          }
        }, 2000);
      } else {
        setError(response.message || 'Failed to create appointment');
      }
    } catch (err) {
      setError('An error occurred while creating the appointment');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Header section with gradient background */}
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 px-8 py-6 text-white">
            <div className="flex items-center space-x-6">
              <div className=" rounded-full">
                <img src={img} alt="logo" className="h-20 w-auto" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Cary Physicians Primary Care</h2>
                <p className="mt-1 text-emerald-100 font-light">Schedule your visit with our healthcare professionals</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700 flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md text-green-700 flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p>Your appointment has been successfully scheduled. We will contact you shortly to confirm.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Patient Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-5 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Patient Information
                  </h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="text"
                          id="phone_number"
                          name="phone_number"
                          value={formData.phone_number}
                          onChange={handleChange}
                          required
                          placeholder="XXX-XXX-XXXX"
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone_type" className="block text-sm font-medium text-gray-700">Phone Type</label>
                        <select
                          id="phone_type"
                          name="phone_type"
                          value={formData.phone_type}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        >
                          <option>Mobile</option>
                          <option>Home</option>
                          <option>Work</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          min="0"
                          max="120"
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        >
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                          placeholder="Cary"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          maxLength="2"
                          placeholder="NC"
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:emerald-200 focus:border-transparent text-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Appointment Details */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-5 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Appointment Details
                  </h3>
                  
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="insurance_holder" className="block text-sm font-medium text-gray-700">Insurance Holder</label>
                      <select
                        id="insurance_holder"
                        name="insurance_holder"
                        value={formData.insurance_holder}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="insurance_company" className="block text-sm font-medium text-gray-700">Insurance Company</label>
                      <input
                        type="text"
                        id="insurance_company"
                        name="insurance_company"
                        value={formData.insurance_company}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        placeholder="Blue Cross Blue Shield"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows="4"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        placeholder="Please describe your symptoms or reason for visit"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="preferred_day" className="block text-sm font-medium text-gray-700">Preferred Day</label>
                        <select
                          id="preferred_day"
                          name="preferred_day"
                          value={formData.preferred_day}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200
                           focus:border-transparent text-gray-700"
                        >
                          <option>Monday</option>
                          <option>Tuesday</option>
                          <option>Wednesday</option>
                          <option>Thursday</option>
                          <option>Friday</option>
                          <option>Saturday</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="preferred_time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                        <select
                          id="preferred_time"
                          name="preferred_time"
                          value={formData.preferred_time}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-transparent text-gray-700"
                        >
                          <option>Morning</option>
                          <option>Noon</option>
                          <option>Evening</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => window.location.pathname.includes('/admin') ? navigate('/admin') : navigate('/')}
                  disabled={submitting}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-colors font-medium shadow-md flex items-center"
                >
                  {submitting ? (
                    <>
                      <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Schedule Appointment
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-600 text-sm">
          © {new Date().getFullYear()} Cary Physicians Primary Care Pllc. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;