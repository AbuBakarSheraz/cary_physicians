import React from 'react';

const AppointmentDetailModal = ({ appointment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-full overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Patient Information</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Full Name:</span>
                  <p className="mt-1">{appointment.full_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Email:</span>
                  <p className="mt-1">{appointment.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Phone:</span>
                  <p className="mt-1">{appointment.phone_number} ({appointment.phone_type})</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Age & Gender:</span>
                  <p className="mt-1">{appointment.age} years, {appointment.gender}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Location:</span>
                  <p className="mt-1">{appointment.city}, {appointment.state}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Appointment Details</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-500">Insurance Holder:</span>
                  <p className="mt-1">{appointment.insurance_holder || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Insurance Company:</span>
                  <p className="mt-1">{appointment.insurance_company}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Reason:</span>
                  <p className="mt-1">{appointment.reason}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Preferred Schedule:</span>
                  <p className="mt-1">{appointment.preferred_day}, {appointment.preferred_time}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Created At:</span>
                  <p className="mt-1">{new Date(appointment.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors mr-2"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;