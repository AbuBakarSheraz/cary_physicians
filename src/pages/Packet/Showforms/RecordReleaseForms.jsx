import React, { useEffect, useState } from 'react';
import medicalReleaseRecordService from '../../../services/Medical_records_service';

const BASE_URL = "https://www.caryphysicians.com/api/medical_records_db";

function RecordReleaseForms() {
  const [releaseForms, setReleaseForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const response = await medicalReleaseRecordService.fetchRecords();
      if (response.success) {
        setReleaseForms(response.records);
      } else {
        setError('Failed to fetch records');
      }
    } catch (err) {
      setError('Error fetching records: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (filePath, patientName) => {
    const link = document.createElement('a');
    link.href = `${BASE_URL}/${filePath}`;
    link.setAttribute('download', `${patientName.replace(/\s+/g, '_')}_MedicalRelease.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    const response = await medicalReleaseRecordService.deleteRecord(id);
    if (response.success) {
      setReleaseForms((prevForms) => prevForms.filter((form) => form.id !== id));
    } else {
      alert(response.error || 'Failed to delete the record');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Medical Records Release Forms</h2>
      
      {releaseForms.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No release forms found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {releaseForms.map((form) => (
                <tr key={form.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{form.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{form.patient_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(form.upload_date)}</td>
                  <td className="px-6 py-4 text-sm font-medium space-x-3">
                    {/* <button
                      onClick={() => handleDownload(form.file_path, form.patient_name)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Download
                    </button> */}
                    <a
                      href={`${BASE_URL}/${form.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-900"
                    >
                      Download
                    </a>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        Showing {releaseForms.length} records
      </div>
    </div>
  );
}

export default RecordReleaseForms;
