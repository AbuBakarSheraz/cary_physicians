import axios from 'axios';

const BASE_URL = 'https://www.caryphysicians.com/api/appointments';

export const appointmentService = {
  // Get list of all appointments
  getAppointments: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/list_appointments.php`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  // Get a single appointment by ID
  getAppointmentById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/get_appointment.php?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching appointment with ID ${id}:`, error);
      throw error;
    }
  },
  deleteAppointmentById: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete_appointment.php?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting appointment with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new appointment
  createAppointment: async (appointmentData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create_appointment.php`, appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }
};