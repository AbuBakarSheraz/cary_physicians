import axios from "axios";

const BASE_URL = "https://www.caryphysicians.com/api/medical_records_db";

const tcfService = {
  // Upload a new medical record
  uploadRecord: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/tcf/insert_tcf.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Upload failed",
      };
    }
  },

  // Get all uploaded records
  fetchRecords: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tcf/get_tcf.php`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Fetching records failed",
      };
    }
  },
  deleteRecord: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/tcf/delete_tcf.php`, {
        data: new URLSearchParams({ id }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return response.data;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Delete failed",
      };
    }
  },

};

export default tcfService;
