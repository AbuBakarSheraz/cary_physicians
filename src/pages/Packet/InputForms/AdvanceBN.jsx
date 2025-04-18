import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import logo from '../../../../public/logos/logo.webp';

export default function AdvanceBN() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    dob: '',
    address: '',
    ssn: '',
    secondaryInsurance: '',
    tertiaryInsurance: '',
    evaluationManagement: false,
    diagnostics: false,
    procedures: false,
    other: false,
    otherText: '',
    notCovered: false,
    experimental: false,
    notMedicallyNecessary: false,
    frequencyExceedsCap: false,
    providerNotAuthorized: false,
    otherReason: false,
    otherReasonText: '',
    selectedOption: '1', // Default to Option 1
    date: new Date().toISOString().split('T')[0]
  });
  
  const [signature, setSignature] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!saveSignature()) {
      return;
    }
    
    // Here you would typically send the form data and signature to your backend
    console.log("Form Data:", formData);
    console.log("Signature:", signature);
    
    alert("Form submitted successfully!");
    setShowPreview(false);
  };
  const downloadPDF = () => {
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
        pdf.text("Cary Physicians Primary Care PLLC",margin + 10, 15);
        // pdf.setFontSize(7); // Smaller font for address
        // pdf.setFont('helvetica', 'normal');
        // pdf.text("Cary Physicians Primary Care PLLC, 115 Parkway Office Ct suite 104", pageWidth - margin, 16, { align: 'right' });
        
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
      pdf.text("Advance Beneficiary Notice for Medicare Patients", pageWidth / 2, y, { align: 'center' });
      y += 8;
      
      // Add horizontal line
      pdf.setLineWidth(0.3);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 4;
      
      // Patient information section
      const fieldFontSize = 8;
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
      y += 4;
      
      // Add horizontal line
      pdf.line(margin, y, pageWidth - margin, y);
      y += 4;
      
      // Second row with address and SSN
      pdf.setFont('helvetica', 'bold');
      pdf.text("Address", margin, y);
      pdf.text("SSN", margin + 130, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.address || "", margin, y);
      pdf.text(formData.ssn || "", margin + 130, y);
      y += 4;
      
      // Add horizontal line
      pdf.line(margin, y, pageWidth - margin, y);
      y += 4;
      
      // Insurance information - Condensed
      pdf.setFont('helvetica', 'bold');
      pdf.text("Secondary insurance information, if any (list name, policy #, group #, plan, insured's name)", margin, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.secondaryInsurance || "None", margin, y);
      y += 4;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text("Tertiary insurance information, if any (list name, policy #, group #, plan, insured's name)", margin, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(formData.tertiaryInsurance || "None", margin, y);
      y += 4;
      
      // Add horizontal line
      pdf.line(margin, y, pageWidth - margin, y);
      y += 6;
      
      // Patient notice
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text("PATIENT NOTICE", margin, y);
      y += 5;
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      const noticeText = "If Medicare or any supplemental insurance I may have does not pay for the care and services I receive, I may have to pay. I understand that Medicare and any other insurance I may have does not pay for everything. Even some care/services that I or my health care provider have reason to think I need, may not be paid for by my insurance.";
      const noticeLines = pdf.splitTextToSize(noticeText, contentWidth);
      pdf.text(noticeLines, margin, y);
      y += noticeLines.length * 3.5;
      
      const followUpText = "The following care and services may not be covered by insurance. Other care and services that you may receive not listed below may not be covered.";
      const followUpLines = pdf.splitTextToSize(followUpText, contentWidth);
      pdf.text(followUpLines, margin, y);
      y += followUpLines.length * 3.5 + 2;
      
      // Services that may not be covered - Condensed layout
      const checkboxSize = 3.5;
      const checkboxMargin = margin + 2;
      const labelX = margin + 7;
      const lineSpacing = 7;
      
      // Set empty box style
      pdf.setLineWidth(0.3);
      
      // Row 1: Evaluation & management
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.evaluationManagement) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", checkboxMargin, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Evaluation & management:", labelX, y + 2.5);
      pdf.setDrawColor(180);
      pdf.line(labelX + 43, y + 2.5, margin + contentWidth - 5, y + 2.5);
      pdf.setDrawColor(0);
      y += lineSpacing;
      
      // Row 2: Diagnostics
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.diagnostics) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", checkboxMargin, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Diagnostics:", labelX, y + 2.5);
      pdf.setDrawColor(180);
      pdf.line(labelX + 23, y + 2.5, margin + contentWidth - 5, y + 2.5);
      pdf.setDrawColor(0);
      y += lineSpacing;
      
      // Row 3: Procedures
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.procedures) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", checkboxMargin, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Procedures:", labelX, y + 2.5);
      pdf.setDrawColor(180);
      pdf.line(labelX + 23, y + 2.5, margin + contentWidth - 5, y + 2.5);
      pdf.setDrawColor(0);
      y += lineSpacing;
      
      // Row 4: Other
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.other) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", checkboxMargin, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Other:", labelX, y + 2.5);
      if (formData.otherText) {
        pdf.text(formData.otherText, labelX + 15, y + 2.5);
      }
      pdf.setDrawColor(180);
      pdf.line(labelX + 15, y + 2.5, margin + contentWidth - 5, y + 2.5);
      pdf.setDrawColor(0);
      y += lineSpacing + 2;
      
      // Reasons for non-payment section
      pdf.text("Services that Medicare or other insurance may not pay for and possible reasons for non-payment: [Office staff use only]", margin, y);
      y += 6;
      
      // Set up columns for reasons - more compact layout
      const col1X = margin;
      const col2X = pageWidth / 2 - 5;
      const col1TextX = col1X + 7;
      const col2TextX = col2X + 7;
      
      // Row 1 of reasons
      pdf.rect(col1X, y, checkboxSize, checkboxSize);
      if (formData.notCovered) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", col1X + 1, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Services are not covered by the insurance", col1TextX, y + 2.5);
      
      pdf.rect(col2X, y, checkboxSize, checkboxSize);
      if (formData.experimental) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", col2X + 1, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Services are considered experimental", col2TextX, y + 2.5);
      y += lineSpacing - 1;
      
      // Row 2 of reasons
      pdf.rect(col1X, y, checkboxSize, checkboxSize);
      if (formData.notMedicallyNecessary) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", col1X + 1, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Services are deemed not medically necessary", col1TextX, y + 2.5);
      
      pdf.rect(col2X, y, checkboxSize, checkboxSize);
      if (formData.frequencyExceedsCap) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", col2X + 1, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Service frequency exceeds cap", col2TextX, y + 2.5);
      y += lineSpacing - 1;
      
      // Row 3 of reasons
      pdf.rect(col1X, y, checkboxSize, checkboxSize);
      if (formData.providerNotAuthorized) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", col1X + 1, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Provider is not authorized", col1TextX, y + 2.5);
      
      pdf.rect(col2X, y, checkboxSize, checkboxSize);
      if (formData.otherReason) {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", col2X + 1, y + 2.5);
        pdf.setFont('helvetica', 'normal');
      }
      pdf.text("Other:", col2TextX, y + 2.5);
      if (formData.otherReasonText) {
        pdf.text(formData.otherReasonText, col2TextX + 15, y + 2.5);
      }
      y += lineSpacing + 2;
      
      // Draw physician information box - more compact
      pdf.setDrawColor(0);
      pdf.setLineWidth(0.3);
      const boxHeight = 85; // Reduced box height
      pdf.rect(margin, y, contentWidth, boxHeight);
      
      // Header for box
      pdf.setFont('helvetica', 'bold');
      pdf.text("INFORMATION FROM YOUR PHYSICIAN", margin + 5, y + 5);
      y += 10;
      
      // Description text
      pdf.setFont('helvetica', 'normal');
      const infoText = "Read this notice so you can make an informed decision about your care. After you finish reading, ask us any questions you may have. Choose an option below about whether to receive the services listed above.";
      const infoLines = pdf.splitTextToSize(infoText, contentWidth - 10);
      pdf.text(infoLines, margin + 5, y);
      y += infoLines.length * 3 + 3;
      
      // Options section
      pdf.setFont('helvetica', 'bold');
      pdf.text("OPTIONS: (Check only one box)", margin + 5, y);
      y += 5;
      
      // Option checkboxes - more compact
      const optionIndent = margin + 10;
      const optionTextIndent = optionIndent + 7;
      
      // Option 1
      pdf.rect(margin + 5, y, checkboxSize, checkboxSize);
      if (formData.selectedOption === '1') {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", margin + 6, y + 2.5);
      }
      pdf.text("OPTION 1.", optionIndent, y + 2.5);
      y += 6;
      
      pdf.setFont('helvetica', 'normal');
      const option1Text = "I want the services listed above and I want Medicare and any supplemental insurance to be billed. I understand that if my insurance doesn't pay, I am responsible for payment, but I can appeal to Medicare or my supplemental insurance carrier(s). If my insurance carrier does pay, I will be refunded any payments I made to my provider, less co-pays and deductibles.";
      const option1Lines = pdf.splitTextToSize(option1Text, contentWidth - 15);
      pdf.text(option1Lines, optionTextIndent, y);
      y += option1Lines.length * 3 + 1;
      
      // Option 2
      pdf.rect(margin + 5, y, checkboxSize, checkboxSize);
      if (formData.selectedOption === '2') {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", margin + 6, y + 2.5);
      }
      pdf.setFont('helvetica', 'bold');
      pdf.text("OPTION 2.", optionIndent, y + 2.5);
      y += 6;
      
      pdf.setFont('helvetica', 'normal');
      const option2Text = "I want the services listed above, but do not bill my insurance. I will be asked to pay for the services now. I cannot appeal if my insurance is not billed.";
      const option2Lines = pdf.splitTextToSize(option2Text, contentWidth - 15);
      pdf.text(option2Lines, optionTextIndent, y);
      y += option2Lines.length * 3 + 1;
      
      // Option 3
      pdf.rect(margin + 5, y, checkboxSize, checkboxSize);
      if (formData.selectedOption === '3') {
        pdf.setFont('helvetica', 'bold');
        pdf.text("✓", margin + 6, y + 2.5);
      }
      pdf.setFont('helvetica', 'bold');
      pdf.text("OPTION 3.", optionIndent, y + 2.5);
      y += 6;
      
      pdf.setFont('helvetica', 'normal');
      const option3Text = "I do not want the services listed above. I understand that with this choice I am not responsible for payment and I cannot appeal to see if my insurance would pay. I may also be asked to sign an informed refusal document by my health care provider.";
      const option3Lines = pdf.splitTextToSize(option3Text, contentWidth - 15);
      pdf.text(option3Lines, optionTextIndent, y);
      y += option3Lines.length * 3 + 3;
      
      // Additional information
      pdf.setFont('helvetica', 'bold');
      pdf.text("ADDITIONAL INFORMATION", margin + 5, y);
      y += 4;
      
      pdf.setFont('helvetica', 'normal');
      const additionalText = "This notice is an opinion, not an official coverage decision. If you have coverage questions, call your insurance carrier on the number given on the back of the card. Signing below means that you agree to adhere to the terms of this notice.";
      const additionalLines = pdf.splitTextToSize(additionalText, contentWidth - 10);
      pdf.text(additionalLines, margin + 5, y);
      
      // End of box at y + boxHeight position
      let signatureY = y + 20;
     // Signature section below the box
pdf.line(margin, signatureY, pageWidth - margin, signatureY);
signatureY += 1; // Reduced initial spacing

// Add signature image above the labels
if (signature) {
  pdf.addImage(signature, 'PNG', margin, signatureY, 45, 15);
}

// Move down to add labels below the signature
signatureY += 18; // Space for signature plus a gap

// Signature section headings - below the actual signature
pdf.setFont('helvetica', 'bold');
pdf.text("Patient signature", margin, signatureY);
pdf.text("Print name", margin + 80, signatureY);
pdf.text("Date", margin + 140, signatureY);

// Add name and date (signature is already added above)
pdf.setFont('helvetica', 'normal');
pdf.text(formData.firstName + " " + formData.lastName, margin + 80, signatureY - 5); // Position name slightly above the heading
pdf.text(formData.date, margin + 140, signatureY - 5); // Position date slightly above the heading

// Add signature lines
signatureY -= 3; // Move up slightly to draw lines
pdf.line(margin, signatureY, margin + 60, signatureY); // Signature line
pdf.line(margin + 80, signatureY, margin + 130, signatureY); // Name line
pdf.line(margin + 140, signatureY, margin + 170, signatureY); // Date line 
      // Save PDF with patient name
      pdf.save(`Advance-Beneficiary-Notice-${formData.lastName}-${formData.firstName}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {!showPreview ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Advance Beneficiary Notice for Medicare Patients</h1>
            
            <div className="prose max-w-none text-sm sm:text-base">
              <p className="font-medium mb-4">
                If Medicare or any supplemental insurance I may have does not pay for the care and services I receive, I may have to pay. I understand that Medicare and any other insurance I may have does not pay for everything. Even some care/services that I or my health care provider have reason to think I need, may not be paid for by my insurance.
              </p>
            </div>
            
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">SSN</label>
                    <input
                      type="text"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secondary insurance information</label>
                  <input
                    type="text"
                    name="secondaryInsurance"
                    value={formData.secondaryInsurance}
                    onChange={handleChange}
                    placeholder="List name, policy #, group #, plan, insured's name"
                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tertiary insurance information</label>
                  <input
                    type="text"
                    name="tertiaryInsurance"
                    value={formData.tertiaryInsurance}
                    onChange={handleChange}
                    placeholder="List name, policy #, group #, plan, insured's name"
                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Services */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Services That May Not Be Covered</h2>
                <p className="mb-4 text-sm">The following care and services may not be covered by insurance. Other care and services that you may receive not listed below may not be covered.</p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="evaluationManagement"
                      name="evaluationManagement"
                      checked={formData.evaluationManagement}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="evaluationManagement" className="block text-sm font-medium text-gray-700">
                      Evaluation & management
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="diagnostics"
                      name="diagnostics"
                      checked={formData.diagnostics}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="diagnostics" className="block text-sm font-medium text-gray-700">
                      Diagnostics
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="procedures"
                      name="procedures"
                      checked={formData.procedures}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="procedures" className="block text-sm font-medium text-gray-700">
                      Procedures
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="other"
                      name="other"
                      checked={formData.other}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="other" className="block text-sm font-medium text-gray-700">
                      Other
                    </label>
                    {formData.other && (
                      <input
                        type="text"
                        name="otherText"
                        value={formData.otherText}
                        onChange={handleChange}
                        className="ml-2 flex-grow border border-gray-300 rounded-md shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Specify other services"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Reasons for non-payment */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Reasons for Non-Payment</h2>
                <p className="mb-4 text-sm">Services that Medicare or other insurance may not pay for and possible reasons for non-payment:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="notCovered"
                      name="notCovered"
                      checked={formData.notCovered}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="notCovered" className="block text-sm font-medium text-gray-700">
                      Services are not covered by the insurance
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="experimental"
                      name="experimental"
                      checked={formData.experimental}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="experimental" className="block text-sm font-medium text-gray-700">
                      Services are considered experimental
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="notMedicallyNecessary"
                      name="notMedicallyNecessary"
                      checked={formData.notMedicallyNecessary}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="notMedicallyNecessary" className="block text-sm font-medium text-gray-700">
                      Services are deemed not medically necessary
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="frequencyExceedsCap"
                      name="frequencyExceedsCap"
                      checked={formData.frequencyExceedsCap}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="frequencyExceedsCap" className="block text-sm font-medium text-gray-700">
                      Service frequency exceeds cap
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="providerNotAuthorized"
                      name="providerNotAuthorized"
                      checked={formData.providerNotAuthorized}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="providerNotAuthorized" className="block text-sm font-medium text-gray-700">
                      Provider is not authorized
                    </label>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="otherReason"
                      name="otherReason"
                      checked={formData.otherReason}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <label htmlFor="otherReason" className="block text-sm font-medium text-gray-700">
                      Other
                    </label>
                    {formData.otherReason && (
                      <input
                        type="text"
                        name="otherReasonText"
                        value={formData.otherReasonText}
                        onChange={handleChange}
                        className="ml-2 flex-grow border border-gray-300 rounded-md shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Specify other reason"
                      />
                    )}
                  </div>
                </div>
              </div>
 {/* Options Section */}
 <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Options</h2>
                <p className="mb-4 text-sm">Read this notice so you can make an informed decision about your care. Choose one of the following options:</p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="option1"
                      name="selectedOption"
                      value="1"
                      checked={formData.selectedOption === '1'}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                      required
                    />
                    <div>
                      <label htmlFor="option1" className="block text-sm font-medium text-gray-700">
                        OPTION 1
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        I want the services listed above and I want Medicare and any supplemental insurance to be billed. I understand that if my insurance doesn't pay, I am responsible for payment, but I can appeal to Medicare or my supplemental insurance carrier(s). If my insurance carrier does pay, I will be refunded any payments I made to my provider, less co-pays and deductibles.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="option2"
                      name="selectedOption"
                      value="2"
                      checked={formData.selectedOption === '2'}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <label htmlFor="option2" className="block text-sm font-medium text-gray-700">
                        OPTION 2
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        I want the services listed above, but do not bill my insurance. I will be asked to pay for the services now. I cannot appeal if my insurance is not billed.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="option3"
                      name="selectedOption"
                      value="3"
                      checked={formData.selectedOption === '3'}
                      onChange={handleChange}
                      className="mt-1 mr-2"
                    />
                    <div>
                      <label htmlFor="option3" className="block text-sm font-medium text-gray-700">
                        OPTION 3
                      </label>
                      <p className="text-sm text-gray-600 mt-1">
                        I do not want the services listed above. I understand that with this choice I am not responsible for payment and I cannot appeal to see if my insurance would pay. I may also be asked to sign an informed refusal document by my health care provider.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Signature Section */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Signature</h2>
                <p className="mb-4 text-sm">Signing below means that you agree to adhere to the terms of this notice.</p>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sign below using mouse or touch screen
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
                  <dt className="text-sm font-medium text-gray-500">SSN</dt>
                  <dd className="text-sm text-gray-900">{formData.ssn}</dd>
                </div>
              </dl>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Services & Reasons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Services That May Not Be Covered</h3>
                  <ul className="mt-1 text-sm text-gray-900">
                    {formData.evaluationManagement && <li>Evaluation & Management</li>}
                    {formData.diagnostics && <li>Diagnostics</li>}
                    {formData.procedures && <li>Procedures</li>}
                    {formData.other && <li>Other: {formData.otherText}</li>}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Reasons for Non-Payment</h3>
                  <ul className="mt-1 text-sm text-gray-900">
                    {formData.notCovered && <li>Services are not covered</li>}
                    {formData.experimental && <li>Services are considered experimental</li>}
                    {formData.notMedicallyNecessary && <li>Services not medically necessary</li>}
                    {formData.frequencyExceedsCap && <li>Service frequency exceeds cap</li>}
                    {formData.providerNotAuthorized && <li>Provider is not authorized</li>}
                    {formData.otherReason && <li>Other: {formData.otherReasonText}</li>}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Selected Option</h2>
              <p className="text-sm text-gray-900">
                {formData.selectedOption === '1' && 'OPTION 1: I want the services listed above and I want Medicare/insurance to be billed.'}
                {formData.selectedOption === '2' && 'OPTION 2: I want the services listed above, but do not bill my insurance.'}
                {formData.selectedOption === '3' && 'OPTION 3: I do not want the services listed above.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Signature</h2>
              {signature ? (
                <div>
                  <img src={signature} alt="Patient signature" className="border border-gray-300 rounded-md max-h-24" />
                  <p className="mt-2 text-sm text-gray-500">Signed on: {formData.date}</p>
                </div>
              ) : (
                <p className="text-sm text-red-500">No signature provided. Please go back and sign the form.</p>
              )}
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
                onClick={handleSubmit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Form
              </button>
              
              <button
                type="button"
                onClick={downloadPDF}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}