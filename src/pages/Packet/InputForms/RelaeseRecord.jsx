import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import logo from '../../../../public/logos/logo.webp';
import medicalReleaseRecordService from '../../../services/Medical_records_service';

export default function MedicalRecordsRelease() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    dob: '',
    address: '',
    mrn: '',
    doctorHospitalName: '',
    faxNumber: '',
    doctorAddress: '',
    dateFrom: '',
    dateTo: '',
    alcoholSubstanceUse: false,
    mentalHealth: false,
    stisHiv: false,
    geneticTesting: false,
    date: new Date().toISOString().split('T')[0]
  });
  
  const [signature, setSignature] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const sigCanvas = useRef({});

  // Load the logo image when component mounts
  useEffect(() => {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      // Create a canvas to convert the image to a data URL
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Get the data URL and store it
      const dataURL = canvas.toDataURL('image/png');
      setLogoImage(dataURL);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSignature(null);
  };

  const saveSignature = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature");
      return false;
    }
    
    setSignature(sigCanvas.current.toDataURL('image/png'));
    return true;
  };

  const handlePreview = (e) => {
    e.preventDefault();
    
    if (!saveSignature()) {
      return;
    }
    
    setShowPreview(true);
  };

  const generatePDF = () => {
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Set page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15; // Reduced margins to fit more content
      const contentWidth = pageWidth - (margin * 2);
      
      // Function to add header and footer
      const addHeaderFooter = () => {
        // Header with logo and contact info
        if (logoImage) {
          pdf.addImage(logoImage, 'PNG', margin, 7, 9, 24); // Smaller logo
        }
        
        // Right-aligned header text
        pdf.setFontSize(12); // Smaller font
        pdf.setFont('helvetica', 'bold');
        pdf.text("Cary Physicians Primary Care PLLC", margin + 10, 15);
        
        // Footer - Minimal footer to save space 
        pdf.setFontSize(6);
        pdf.text("© 2025 Cary Physicians Primary Care PLLC", 14, pageHeight - 7);
      };
      
      // Add header and footer
      addHeaderFooter();
      
      // Start content
      let y = 24; // Start below header
      
      // Add title
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Authorization for Release of Medical Records", pageWidth / 2, y, { align: 'center' });
      y += 5;
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Dr. Muhammad Ghani/ Cary Physicians Primary Care PLLC", pageWidth / 2, y, { align: 'center' });
      y += 8;
      
      // Add horizontal line
      pdf.setLineWidth(0.3);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 4;
      
      // Add fax number
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text("Fax Number: +1 (855) 5764929", margin, y);
      y += 6;
      
      // Patient information section
      const fieldFontSize = 9;
      pdf.setFontSize(fieldFontSize);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Last name", margin, y);
      pdf.text("First name", margin + 65, y);
      pdf.text("DOB", margin + 130, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.lastName || "", margin, y);
      pdf.text(formData.firstName || "", margin + 65, y);
      pdf.text(formData.dob || "", margin + 130, y);
      y += 6;
      
      // Add horizontal line
      pdf.line(margin, y, pageWidth - margin, y);
      y += 6;
      
      // Second row with address and MRN
      pdf.setFont('helvetica', 'bold');
      pdf.text("Address", margin, y);
      pdf.text("MRN", margin + 130, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.address || "", margin, y);
      pdf.text(formData.mrn || "", margin + 130, y);
      y += 6;
      
      // Add horizontal line
      pdf.line(margin, y, pageWidth - margin, y);
      y += 6;
      
      // Authorization section
      pdf.setFont('helvetica', 'bold');
      pdf.text("I authorize \"Cary Physicians Primary Care\" to obtain from:", margin, y);
      y += 6;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text("Doctor or hospital name", margin, y);
      pdf.text("Fax #", margin + 130, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.doctorHospitalName || "", margin, y);
      pdf.text(formData.faxNumber || "", margin + 130, y);
      y += 6;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text("Address", margin, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.doctorAddress || "", margin, y);
      y += 6;
      
      // Add horizontal line
      pdf.line(margin, y, pageWidth - margin, y);
      y += 6;
      
      // Time period
      pdf.setFont('helvetica', 'bold');
      pdf.text("Any information about my health and health care, including the diagnosis, treatment,", margin, y);
      y += 5;
      pdf.text("or examination rendered to me during the period from:", margin, y);
      y += 6;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.dateFrom || "", margin + 30, y);
      pdf.text("to", margin + 80, y);
      pdf.text(formData.dateTo || "", margin + 100, y);
      y += 8;
      
      // Add horizontal line
      pdf.line(margin, y, pageWidth - margin, y);
      y += 6;
      
      // Disclosure authorization
      pdf.setFont('helvetica', 'bold');
      pdf.text("I expressly authorize and consent to the disclosure of my health information related to (checked):", margin, y);
      y += 8;
      
      // Checkboxes for authorization
      const checkboxSize = 3.5;
      const checkboxTextIndent = 7;
      const boxesY = y;
      // Row 1: Alcohol and substance use
pdf.rect(margin, boxesY, checkboxSize, checkboxSize); // draw the checkbox border
if (formData.alcoholSubstanceUse) {
  pdf.setFillColor(0, 0, 0); // black fill
  pdf.rect(margin, boxesY, checkboxSize, checkboxSize, 'F'); // fill the checkbox
}
pdf.text("Alcohol and substance use", margin + checkboxTextIndent, boxesY + 2.5);

// Row 1: Mental health
pdf.rect(margin + 80, boxesY, checkboxSize, checkboxSize);
if (formData.mentalHealth) {
  pdf.setFillColor(0, 0, 0);
  pdf.rect(margin + 80, boxesY, checkboxSize, checkboxSize, 'F');
}
pdf.text("Mental health", margin + 80 + checkboxTextIndent, boxesY + 2.5);

// Row 2: STIs including HIV/AIDS
pdf.rect(margin, boxesY + 8, checkboxSize, checkboxSize);
if (formData.stisHiv) {
  pdf.setFillColor(0, 0, 0);
  pdf.rect(margin, boxesY + 8, checkboxSize, checkboxSize, 'F');
}
pdf.text("STIs including HIV/AIDS", margin + checkboxTextIndent, boxesY + 8 + 2.5);

// Row 2: Genetic testing/counseling
pdf.rect(margin + 80, boxesY + 8, checkboxSize, checkboxSize);
if (formData.geneticTesting) {
  pdf.setFillColor(0, 0, 0);
  pdf.rect(margin + 80, boxesY + 8, checkboxSize, checkboxSize, 'F');
}
pdf.text("Genetic testing/counseling", margin + 80 + checkboxTextIndent, boxesY + 8 + 2.5);

      y += 20;
      
      // Confidentiality Policy
      pdf.setFont('helvetica', 'bold');
      pdf.text("CONFIDENTIALITY POLICY", pageWidth / 2, y, { align: 'center' });
      y += 6;
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      const policyText = "Medical records are maintained to serve the patient and the health care team in accordance with all applicable legal and regulatory requirements. The information contained in medical records is considered highly confidential. All patient care information shall be regarded as confidential and available only to authorized users. The phrase \"medical records\" includes any protected health information (PHI), which includes test results, any medical reports, the medical record itself, claim files, and any correspondence relating to the care of a patient. Any disclosure of my protected health information to a different name, class of person, address, or fax number will require a separate authorization.";
      const policyLines = pdf.splitTextToSize(policyText, contentWidth);
      pdf.text(policyLines, margin, y);
      y += policyLines.length * 3 + 4;
      
      const revocationText = "I have the right to revoke this authorization in writing, except to the extent that action has already been taken in reliance on this authorization. For the revocation of this authorization to be effective, the above name(s) or class of person(s) must receive the revocation in writing.";
      const revocationLines = pdf.splitTextToSize(revocationText, contentWidth);
      pdf.text(revocationLines, margin, y);
      y += revocationLines.length * 3 + 4;
      
      const expirationText = "This authorization shall expire one year from the date signed. After one year, a new authorization form is needed to continually disclose my PHI. I understand this authorization is voluntary and may refuse to sign it.";
      const expirationLines = pdf.splitTextToSize(expirationText, contentWidth);
      pdf.text(expirationLines, margin, y);
      y += expirationLines.length * 3 + 4;
      
      const acceptanceText = "I fully understand and accept the terms of this authorization. A copy of this authorization is valid as an original.";
      const acceptanceLines = pdf.splitTextToSize(acceptanceText, contentWidth);
      pdf.text(acceptanceLines, margin, y);
      y += acceptanceLines.length * 3 + 8;
      
      // Signature section
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Patient or authorized representative signature:", margin, y);
      pdf.text("Date:", margin + 130, y);
      y += 4;
      
      // Add signature image
      if (signature) {
        pdf.addImage(signature, 'PNG', margin, y, 45, 15);
      }
      
      // Add date
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.date, margin + 130, y + 7);
      
      y += 20;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text("Patient or authorized representative name:", margin, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${formData.firstName} ${formData.lastName}`, margin, y);
      
      // Save PDF with patient name
      const fileName = `Medical-Records-Release-${formData.lastName}-${formData.firstName}.pdf`;
      pdf.save(fileName);
      
      // Convert the PDF to a Blob and return it as a File
      const pdfBlob = pdf.output('blob');
      return new File([pdfBlob], fileName, { type: 'application/pdf' });
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName) {
      alert("Please enter patient name.");
      return;
    }
    
    // if (!saveSignature()) {
    //   return;
    // }
    
    try {
      // Generate the PDF and get the file
      const pdfFile = generatePDF();
      if (!pdfFile) {
        throw new Error("Failed to generate PDF file");
      }
      
      // Create form data for submission
      const submissionData = new FormData();
      submissionData.append("patient_name", `${formData.firstName} ${formData.lastName}`);
      submissionData.append("pdf_file", pdfFile);
      
      // Submit to server
      const result = await medicalReleaseRecordService.uploadRecord(submissionData);
      console.log("Upload result:", result);
      
      alert("Form submitted successfully!");
      setShowPreview(false);
    } catch (error) {
      console.error("Error during submission:", error);
      alert("There was an error submitting the form: " + error.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {!showPreview ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Authorization for Release of Medical Records</h1>
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-6">Dr. Muhammad Ghani/ Cary Physicians Primary Care PLLC</h2>
            <p className="text-center mb-4 text-sm sm:text-base">Fax Number: +1 (855) 576-4929</p>
            
            <form onSubmit={handlePreview} className="space-y-6 mt-6">
              {/* Patient Information */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">MRN (Medical Record Number)</label>
                    <input
                      type="text"
                      name="mrn"
                      value={formData.mrn}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              {/* Authorization Section */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Authorization Details</h2>
                <p className="mb-4 text-sm">I authorize "Cary Physicians Primary Care" to obtain from:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Doctor or hospital name</label>
                    <input
                      type="text"
                      name="doctorHospitalName"
                      value={formData.doctorHospitalName}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fax #</label>
                    <input
                      type="text"
                      name="faxNumber"
                      value={formData.faxNumber}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="doctorAddress"
                    value={formData.doctorAddress}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                
                <p className="mb-2 text-sm">Any information about my health and health care, including the diagnosis, treatment, or examination rendered to me during the period from:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="date"
                      name="dateFrom"
                      value={formData.dateFrom}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="date"
                      name="dateTo"
                      value={formData.dateTo}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Disclosure Authorization */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Health Information Authorization</h2>
                <p className="mb-4 text-sm">I expressly authorize and consent to the disclosure of my health information related to (check all that apply):</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="alcoholSubstanceUse"
                      name="alcoholSubstanceUse"
                      checked={formData.alcoholSubstanceUse}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="alcoholSubstanceUse" className="block text-sm font-medium text-gray-700">
                      Alcohol and substance use
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="mentalHealth"
                      name="mentalHealth"
                      checked={formData.mentalHealth}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="mentalHealth" className="block text-sm font-medium text-gray-700">
                      Mental health
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="stisHiv"
                      name="stisHiv"
                      checked={formData.stisHiv}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="stisHiv" className="block text-sm font-medium text-gray-700">
                      STIs including HIV/AIDS
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="geneticTesting"
                      name="geneticTesting"
                      checked={formData.geneticTesting}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="geneticTesting" className="block text-sm font-medium text-gray-700">
                      Genetic testing/counseling
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Confidentiality Policy */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Confidentiality Policy</h2>
                <div className="prose max-w-none text-sm">
                  <p className="mb-2">
                    Medical records are maintained to serve the patient and the health care team in accordance with all applicable legal and regulatory requirements. The information contained in medical records is considered highly confidential. All patient care information shall be regarded as confidential and available only to authorized users. The phrase "medical records" includes any protected health information (PHI), which includes test results, any medical reports, the medical record itself, claim files, and any correspondence relating to the care of a patient. Any disclosure of my protected health information to a different name, class of person, address, or fax number will require a separate authorization.
                  </p>
                  <p className="mb-2">
                    I have the right to revoke this authorization in writing, except to the extent that action has already been taken in reliance on this authorization. For the revocation of this authorization to be effective, the above name(s) or class of person(s) must receive the revocation in writing.
                  </p>
                  <p className="mb-2">
                    This authorization shall expire one year from the date signed. After one year, a new authorization form is needed to continually disclose my PHI. I understand this authorization is voluntary and may refuse to sign it.
                  </p>
                  <p>
                    I fully understand and accept the terms of this authorization. A copy of this authorization is valid as an original.
                  </p>
                </div>
              </div>
              
              {/* Signature Section */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Signature</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient or authorized representative signature
                  </label>
                  <div className="border border-gray-300 rounded-md p-1 bg-white">
                    <SignatureCanvas
                      ref={sigCanvas}
                      penColor="black"
                      canvasProps={{
                        width: 500,
                        height: 200,
                        className: 'w-full h-48 border border-gray-300 rounded-md',
                      }}
                    />
                  </div>
                  <div className="mt-2 flex">
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Clear Signature
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Preview Form
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Review Your Form Submission</h1>
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">Authorization for Release of Medical Records</h2>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900">{formData.firstName} {formData.lastName}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="text-sm text-gray-900">{formData.dob}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">{formData.address}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">MRN</dt>
                  <dd className="text-sm text-gray-900">{formData.mrn || "Not provided"}</dd>
                </div>
              </dl>
              </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Authorization Details</h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Doctor/Hospital Name</dt>
                  <dd className="text-sm text-gray-900">{formData.doctorHospitalName}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Fax Number</dt>
                  <dd className="text-sm text-gray-900">{formData.faxNumber || "Not provided"}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">{formData.doctorAddress}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Time Period</dt>
                  <dd className="text-sm text-gray-900">From {formData.dateFrom} to {formData.dateTo}</dd>
                </div>
              </dl>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Health Information Authorization</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <li className="flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 rounded border ${formData.alcoholSubstanceUse ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                    {formData.alcoholSubstanceUse && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-gray-700">Alcohol and substance use</span>
                </li>
                
                <li className="flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 rounded border ${formData.mentalHealth ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                    {formData.mentalHealth && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-gray-700">Mental health</span>
                </li>
                
                <li className="flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 rounded border ${formData.stisHiv ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                    {formData.stisHiv && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-gray-700">STIs including HIV/AIDS</span>
                </li>
                
                <li className="flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 rounded border ${formData.geneticTesting ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                    {formData.geneticTesting && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    )}
                  </span>
                  <span className="text-sm text-gray-700">Genetic testing/counseling</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Signature</h2>
              {signature && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-2">Patient or authorized representative signature:</p>
                  <img src={signature} alt="Signature" className="h-20 max-w-full border border-gray-300 rounded-md bg-white p-2" />
                </div>
              )}
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Date:</p>
                <p className="text-sm text-gray-900">{formData.date}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit Form
              </button>
              
              <button
                type="button"
                onClick={generatePDF}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Download PDF
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}