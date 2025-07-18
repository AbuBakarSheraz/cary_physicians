import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import logo from '../../../../public/logos/logo.webp';
import medicalReleaseRecordService from '../../../services/Medical_records_service';

export default function MedicalRecordsRelease() {
  const [formData, setFormData] = useState({
    // Patient Information
    lastName: '',
    firstName: '',
    dob: '',
    address: '',
    mrn: '',
    
    // Recipient Information
    recipientFacility: '',
    recipientProvider: '',
    recipientAddress: '',
    recipientTelephone: '',
    recipientFaxNumber: '',
    recipientEmail: '',
    
    // Date Range for Records
    dateFrom: '',
    dateTo: '',

    //Yearly Record

    year: '',
    
    // Authorization Checkboxes
    officeVisits: false,
    labs: false,
    diagnosticsImaging: false,
    proceduresOperations: false,
    mentalHealth: false,
    
    date: new Date().toISOString().split('T')[0]
  });
  
  const [signature, setSignature] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  const clearAll = () => {
    setFormData({
      year: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const yearOptions = [
    { id: 'previous-1-year', label: 'Previous 1 year', value: 'previous 1 year' },
    { id: 'previous-2-years', label: 'Previous 2 years', value: 'previous 2 years' },
    { id: 'previous-3-years', label: 'Previous 3 years', value: 'previous 3 years' },
    { id: 'previous-4-years', label: 'Previous 4 years', value: 'previous 4 years' },
    { id: 'complete-record', label: 'Complete Record', value: 'Complete Record' }
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
    
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox'  ? checked : value
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
      const pdf = new jsPDF('p', 'mm', 'letter');
      
      // Set page dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15; // Reduced margins to fit more content
      const contentWidth = pageWidth - (margin * 2);
      
      // Function to add header and footer
      const addHeaderFooter = () => {
        // Header with logo and title
        if (logoImage) {
          pdf.addImage(logoImage, 'PNG', margin, 7, 9, 24); // Smaller logo
        }
        
        // Right-aligned header text
        pdf.setFontSize(12); // Smaller font
        pdf.setFont('helvetica', 'bold');
        pdf.text("Cary Physicians Primary Care PLLC", margin + 10, 15);
        
        // Title
        pdf.setFontSize(12);
        pdf.setTextColor(128, 0, 128); // Purple color for title
        pdf.text("Authorization for Release of Medical Records", pageWidth / 2, 25, { align: 'center' });
        pdf.setTextColor(0, 0, 0); // Reset to black
        
        // Footer
        pdf.setFontSize(6);
        pdf.text("Cary Physicians Primary Care PLLC, 115 Parkway Office Court, Suite 104", 14, pageHeight - 7);
      };
      
      // Add header and footer
      addHeaderFooter();
      
      // Start content
      let y = 32; // Start below header
      
      // Add date field
 // Set up the date field with proper formatting and positioning
pdf.setFontSize(10);
// Make "Date:" text bold
pdf.setFont('', 'bold');
pdf.text("Date:", pageWidth - margin - 40, y);
// Switch back to normal font for the date value
pdf.setFont('helvetica', 'normal');
// Create underline for date value
pdf.line(pageWidth - margin - 30, y + 1, pageWidth - margin, y + 1);
// Position the date value correctly to avoid overlapping
pdf.text(formData.date, pageWidth - margin - 28, y);
      
      // REQUEST FROM and TO sections
      y += 8;
      
      // Create a two-column layout
      const colWidth = (contentWidth - 10) / 2;
      let leftCol = margin;
      let rightCol = margin + colWidth + 10;
      
      // Left column - REQUEST FROM
      pdf.setFont('','bolditalic');
      pdf.text("REQUEST FROM:", leftCol, y);
      pdf.setFont('helvetica', 'italic');
      y += 5;
      
      pdf.setFont('','bold');
      pdf.text("Requesting Facility:", leftCol, y);
      pdf.setFont('', 'normal');
      pdf.text("Cary Physicians Primary Care", leftCol + 40, y);
      y += 5;
      
      pdf.setFont('','bold');
      pdf.text("Provider:", leftCol, y);
      pdf.setFont('', 'normal');
      pdf.text("Dr. Muhammad Ghani", leftCol + 38, y);
      y += 5;
      
      pdf.setFont('','bold');
      pdf.text("Address:", leftCol, y);
      pdf.setFont('', 'normal');
      pdf.text("115 Parkway Office Court, Suite 104", leftCol + 38, y);
      y += 5;
      
      pdf.setFont('','bold');
      pdf.text("Telephone:", leftCol, y);
      pdf.setFont('', 'normal');
      pdf.text("(919) 230-7439", leftCol + 38, y);
      y += 5;
      
      pdf.setFont('','bold');
      pdf.text("Fax Number:", leftCol, y);
      pdf.setFont('helvetica', 'normal');
      pdf.text("(919) 912-5442", leftCol + 38, y);
      y += 5;
      
      pdf.setFont('','bold');
      pdf.text("Email Address:", leftCol, y);
      pdf.setFont('', 'italic');
      pdf.text("office@caryphysicians.com", leftCol + 38, y);
      
      // Reset y to start of right column
      y = 40;
      
      // Right column - TO
      pdf.setFont('', 'bolditalic');
      pdf.text("TO:", rightCol, y);
      pdf.setFont('helvetica', 'italic');
      y += 5;
      
      pdf.setFont('', 'bold');
      pdf.text("Recipient Facility:", rightCol, y);
      pdf.setFont('', 'normal');
      pdf.text(formData.recipientFacility || "", rightCol + 38, y);
      y += 5;
      
      pdf.setFont('', 'bold');
      pdf.text("Recipient Provider:", rightCol, y);
      pdf.setFont('', 'normal');
      pdf.text(formData.recipientProvider || "", rightCol + 38, y);
      y += 5;
      
      pdf.setFont('', 'bold');
      pdf.text("Address:", rightCol, y);
      
      pdf.setFont('', 'normal');
      const wrappedAddress = pdf.splitTextToSize(formData.recipientAddress || "", 72); // 2 inches = 72 * 2
      pdf.text(wrappedAddress, rightCol + 38, y);
      
      y += wrappedAddress.length * 5; // Adjust vertical spacing
      
      
      pdf.setFont('', 'bold');
      pdf.text("Telephone:", rightCol, y);
      pdf.setFont('', 'normal');
      pdf.text(formData.recipientTelephone || "", rightCol + 38, y);
      y += 5;
      
      pdf.setFont('', 'bold');
      pdf.text("Fax Number:", rightCol, y);
      pdf.setFont('', 'normal');
      pdf.text(formData.recipientFaxNumber || "", rightCol + 38, y);
      y += 5;
      
      pdf.setFont('', 'bold');
      pdf.text("Email Address:", rightCol, y);
      pdf.setFont('', 'normal');
      pdf.text(formData.recipientEmail || "", rightCol + 38, y);
      
      // Patient Information section
      y = 85;
      // pdf.setFont('helvetica', 'bold');
      pdf.setFont('italic');
      pdf.text("Patient Information:", margin, y);
      pdf.setFont('normal');
      y += 8;
      
      // Add box for patient info
      // pdf.setLineWidth(0.1);
      // pdf.rect(margin, y, contentWidth, 24);
      
      // Patient info fields

      pdf.setFontSize(10);
      pdf.text(formData.lastName || "", margin + 5, y + 10);
      pdf.text(formData.firstName || "", margin + (contentWidth / 3) + 5, y + 10);
      pdf.text(formData.dob || "", margin + (contentWidth * 2 / 3) + 5, y + 10);


      pdf.setFontSize(8);
      pdf.text("Last name", margin + 5, y + 5);
      pdf.text("First name", margin + (contentWidth / 3) + 5, y + 5);
      pdf.text("DOB", margin + (contentWidth * 2 / 3) + 5, y + 5);
      

      
      // Divider lines
      // pdf.line(margin + (contentWidth / 3), y, margin + (contentWidth / 3), y + 15);
      // pdf.line(margin + (contentWidth * 2 / 3), y, margin + (contentWidth * 2 / 3), y + 15);
      
      // Address and MRN
      pdf.setFontSize(8);
      pdf.text("Address", margin + 5, y + 15);
      pdf.text("MRN", margin + (contentWidth * 2 / 3) + 5, y + 15);      
      pdf.setFontSize(10);
      pdf.text(formData.address || "", margin + 5, y + 20);
      pdf.text(formData.mrn || "", margin + (contentWidth * 2 / 3) + 5, y + 20);
      
      // Line between address and MRN
      // pdf.line(margin + (contentWidth * 2 / 3), y + 15, margin + (contentWidth * 2 / 3), y + 24);
      
      y += 30;
      
      // Authorization text
      pdf.setFontSize(10);

      if (formData.dateFrom && formData.dateTo) {
        // Date Range case
        pdf.text("I authorize Cary Physicians Primary Care to obtain any information about my health and health care, including", margin, y);
        y += 5;
        pdf.text("the diagnosis, treatment, or examination rendered to me during the period from:", margin, y);
        y += 6;
        pdf.text(formData.dateFrom || "_________________", margin + 60, y);
        pdf.text("to", margin + 100, y);
        pdf.text(formData.dateTo || "_________________", margin + 115, y);
        y += 10;
      } else if (formData.year) {
        pdf.setFontSize(10);

        // First line
        pdf.setFont("helvetica", "normal");
        pdf.text("I authorize Cary Physicians Primary Care to obtain any information about my health and health care, including", margin, y);
        y += 5;
        
        // Second line before the year
        const line2 = "the diagnosis, treatment, or examination rendered to me during ";
        pdf.text(line2, margin, y);
        
        // Add year right after "during "
        const textWidth = pdf.getTextWidth(line2); // width of normal text
        pdf.setFont("helvetica", "bold");
        pdf.text(formData.year || "_________________", margin + textWidth, y);
        
        y += 10;
        
        // Reset font
        pdf.setFont("helvetica", "normal");
        // reset font
        
        
      }
      
      
      // Authorization boxes
      pdf.text("I expressly authorize and consent to the disclosure of my health information related to (check all that apply):", margin, y);
      y += 8;
      
      // Checkboxes
      const checkboxSize = 3.5;
      const checkboxTextIndent = 7;
      
      // Row 1
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.officeVisits) {
        pdf.setFillColor(0, 0, 0);
        pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
      }
      pdf.text("Office Visits: [one annual visit (of last year), last three regular visits]", margin + checkboxTextIndent, y + 3);
      y += 7;
      
      // Row 2
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.labs) {
        pdf.setFillColor(0, 0, 0);
        pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
      }
      pdf.text("Labs: [of last two years]", margin + checkboxTextIndent, y + 3);
      y += 7;
      
      // Row 3
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.diagnosticsImaging) {
        pdf.setFillColor(0, 0, 0);
        pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
      }
      pdf.text("Diagnostics and Imaging: [All Records]", margin + checkboxTextIndent, y + 3);
      y += 7;
      
      // Row 4
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.proceduresOperations) {
        pdf.setFillColor(0, 0, 0);
        pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
      }
      pdf.text("Procedures/ Operations: [All Records]", margin + checkboxTextIndent, y + 3);
      y += 7;
      
      // Row 5
      pdf.rect(margin, y, checkboxSize, checkboxSize);
      if (formData.mentalHealth) {
        pdf.setFillColor(0, 0, 0);
        pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
      }
      pdf.text("Mental health/counseling, Alcohol and substance use, STIs including HIV/AIDS, Genetic testing/counseling:", margin + checkboxTextIndent, y + 3);
      y += 4;
      pdf.text("[last three visits]", margin + checkboxTextIndent, y + 3);
      y += 10;
      
      // Confidentiality policy
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text("CONFIDENTIALITY POLICY (PLEASE READ BEFORE SIGNING)", pageWidth / 2, y, { align: 'center' });
      y += 6;
      
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      const policyText = "Medical records are maintained to serve the patient and the health care team in accordance with all applicable legal and regulatory requirements. The information contained in medical records is considered highly confidential. All patient care information shall be regarded as confidential and available only to authorized users. The phrase \"medical records\" includes any protected health information (PHI), which includes test results, any medical reports, the medical record itself, claim files, and any correspondence relating to the care of a patient. Any disclosure of my protected health information to a different name, class of person, address or fax number will require a separate authorization. I have the right to revoke this authorization in writing, except to the extent that action has already been taken in reliance on this authorization. For the revocation of this authorization to be effective, the above name(s) or class of person(s) must receive the revocation in writing. This authorization shall expire one year from the date signed. After one year, a new authorization form is needed to continually disclose my PHI. I understand this authorization is voluntary and may refuse to sign it. I fully understand and accept the terms of this authorization. A copy of this authorization is valid as an original.";
      const policyLines = pdf.splitTextToSize(policyText, contentWidth);
      pdf.text(policyLines, margin, y);
      y += policyLines.length * 3 + 10;
      
      // Signature section
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Patient or authorized representative signature:", margin, y);
      pdf.text("Date:", margin + 130, y);
      pdf.setFont('helvetica', 'normal');

      // Add signature image
      if (signature) {
        pdf.addImage(signature, 'PNG', margin, y + 2, 45, 15);
      }
      
      // Add date
      pdf.text(formData.date, margin + 130, y + 7);
      
      y += 20;
      pdf.setFont('helvetica', 'bold');

      
      pdf.text("Patient or authorized representative name:", margin, y);
      y += 5;
      pdf.setFont('helvetica', 'normal');

      pdf.text(`${formData.firstName} ${formData.lastName}`, margin, y);
      
      // Add footer
      // pdf.setFontSize(7);
      // pdf.text("Cary Physicians Primary Care PLLC, 115 Parkway Office Court Suite 104", pageWidth / 2, pageHeight - 15, { align: 'center' });
      
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
  
  try {
    setIsSubmitting(true);

    // Generate the PDF and get the file (but don't download yet)
    const pdfFile = generatePDFForSubmission();
    if (!pdfFile) {
      throw new Error("Failed to generate PDF file");
    }
    
    // Create form data for submission
    const submissionData = new FormData();
    submissionData.append("patient_name", `${formData.firstName} ${formData.lastName}`);
    submissionData.append("pdf_file", pdfFile);
    
    // Submit to server FIRST
    const result = await medicalReleaseRecordService.uploadRecord(submissionData);
    console.log("Upload result:", result);
    
    // Only after successful submission, download the PDF
    downloadPDF();
    
    setShowSuccessModal(true);
    setShowPreview(false);

  } catch (error) {
    console.error("Error during submission:", error);
    alert("There was an error submitting the form: " + error.message);
  } finally {
    setIsSubmitting(false);
    resetForm();
  }
};

// Separate function to generate PDF without downloading
const generatePDFForSubmission = () => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'letter');
    
    // Set page dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    // Function to add header and footer
    const addHeaderFooter = () => {
      // Header with logo and title
      if (logoImage) {
        pdf.addImage(logoImage, 'PNG', margin, 7, 9, 24);
      }
      
      // Right-aligned header text
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Cary Physicians Primary Care PLLC", margin + 10, 15);
      
      // Title
      pdf.setFontSize(12);
      pdf.setTextColor(128, 0, 128);
      pdf.text("Authorization for Release of Medical Records", pageWidth / 2, 25, { align: 'center' });
      pdf.setTextColor(0, 0, 0);
      
      // Footer
      pdf.setFontSize(6);
      pdf.text("Cary Physicians Primary Care PLLC, 115 Parkway Office Court, Suite 104", 14, pageHeight - 7);
    };
    
    // Add header and footer
    addHeaderFooter();
    
    // Start content
    let y = 32;
    
    // Add date field
    pdf.setFontSize(10);
    pdf.setFont('', 'bold');
    pdf.text("Date:", pageWidth - margin - 40, y);
    pdf.setFont('helvetica', 'normal');
    pdf.line(pageWidth - margin - 30, y + 1, pageWidth - margin, y + 1);
    pdf.text(formData.date, pageWidth - margin - 28, y);
    
    // REQUEST FROM and TO sections
    y += 8;
    
    const colWidth = (contentWidth - 10) / 2;
    let leftCol = margin;
    let rightCol = margin + colWidth + 10;
    
    // Left column - REQUEST FROM
    pdf.setFont('','bolditalic');
    pdf.text("REQUEST FROM:", leftCol, y);
    pdf.setFont('helvetica', 'italic');
    y += 5;
    
    pdf.setFont('','bold');
    pdf.text("Requesting Facility:", leftCol, y);
    pdf.setFont('', 'normal');
    pdf.text("Cary Physicians Primary Care", leftCol + 40, y);
    y += 5;
    
    pdf.setFont('','bold');
    pdf.text("Provider:", leftCol, y);
    pdf.setFont('', 'normal');
    pdf.text("Dr. Muhammad Ghani", leftCol + 38, y);
    y += 5;
    
    pdf.setFont('','bold');
    pdf.text("Address:", leftCol, y);
    pdf.setFont('', 'normal');
    pdf.text("115 Parkway Office Court, Suite 104", leftCol + 38, y);
    y += 5;
    
    pdf.setFont('','bold');
    pdf.text("Telephone:", leftCol, y);
    pdf.setFont('', 'normal');
    pdf.text("(919) 230-7439", leftCol + 38, y);
    y += 5;
    
    pdf.setFont('','bold');
    pdf.text("Fax Number:", leftCol, y);
    pdf.setFont('helvetica', 'normal');
    pdf.text("(919) 912-5442", leftCol + 38, y);
    y += 5;
    
    pdf.setFont('','bold');
    pdf.text("Email Address:", leftCol, y);
    pdf.setFont('', 'italic');
    pdf.text("office@caryphysicians.com", leftCol + 38, y);
    
    // Reset y to start of right column
    y = 40;
    
    // Right column - TO
    pdf.setFont('', 'bolditalic');
    pdf.text("TO:", rightCol, y);
    pdf.setFont('helvetica', 'italic');
    y += 5;
    
    pdf.setFont('', 'bold');
    pdf.text("Recipient Facility:", rightCol, y);
    pdf.setFont('', 'normal');
    pdf.text(formData.recipientFacility || "", rightCol + 38, y);
    y += 5;
    
    pdf.setFont('', 'bold');
    pdf.text("Recipient Provider:", rightCol, y);
    pdf.setFont('', 'normal');
    pdf.text(formData.recipientProvider || "", rightCol + 38, y);
    y += 5;
    
    pdf.setFont('', 'bold');
    pdf.text("Address:", rightCol, y);
    
    pdf.setFont('', 'normal');
    const wrappedAddress = pdf.splitTextToSize(formData.recipientAddress || "", 72);
    pdf.text(wrappedAddress, rightCol + 38, y);
    
    y += wrappedAddress.length * 5;
    
    pdf.setFont('', 'bold');
    pdf.text("Telephone:", rightCol, y);
    pdf.setFont('', 'normal');
    pdf.text(formData.recipientTelephone || "", rightCol + 38, y);
    y += 5;
    
    pdf.setFont('', 'bold');
    pdf.text("Fax Number:", rightCol, y);
    pdf.setFont('', 'normal');
    pdf.text(formData.recipientFaxNumber || "", rightCol + 38, y);
    y += 5;
    
    pdf.setFont('', 'bold');
    pdf.text("Email Address:", rightCol, y);
    pdf.setFont('', 'normal');
    pdf.text(formData.recipientEmail || "", rightCol + 38, y);
    
    // Patient Information section
    y = 85;
    pdf.setFont('italic');
    pdf.text("Patient Information:", margin, y);
    pdf.setFont('normal');
    y += 8;
    
    pdf.setFontSize(10);
    pdf.text(formData.lastName || "", margin + 5, y + 10);
    pdf.text(formData.firstName || "", margin + (contentWidth / 3) + 5, y + 10);
    pdf.text(formData.dob || "", margin + (contentWidth * 2 / 3) + 5, y + 10);

    pdf.setFontSize(8);
    pdf.text("Last name", margin + 5, y + 5);
    pdf.text("First name", margin + (contentWidth / 3) + 5, y + 5);
    pdf.text("DOB", margin + (contentWidth * 2 / 3) + 5, y + 5);
    
    pdf.setFontSize(8);
    pdf.text("Address", margin + 5, y + 15);
    pdf.text("MRN", margin + (contentWidth * 2 / 3) + 5, y + 15);      
    pdf.setFontSize(10);
    pdf.text(formData.address || "", margin + 5, y + 20);
    pdf.text(formData.mrn || "", margin + (contentWidth * 2 / 3) + 5, y + 20);
    
    y += 30;
    
    // Authorization text
    pdf.setFontSize(10);

    if (formData.dateFrom && formData.dateTo) {
      pdf.text("I authorize Cary Physicians Primary Care to obtain any information about my health and health care, including", margin, y);
      y += 5;
      pdf.text("the diagnosis, treatment, or examination rendered to me during the period from:", margin, y);
      y += 6;
      pdf.text(formData.dateFrom || "_________________", margin + 60, y);
      pdf.text("to", margin + 100, y);
      pdf.text(formData.dateTo || "_________________", margin + 115, y);
      y += 10;
    } else if (formData.year) {
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text("I authorize Cary Physicians Primary Care to obtain any information about my health and health care, including", margin, y);
      y += 5;
      
      const line2 = "the diagnosis, treatment, or examination rendered to me during ";
      pdf.text(line2, margin, y);
      
      const textWidth = pdf.getTextWidth(line2);
      pdf.setFont("helvetica", "bold");
      pdf.text(formData.year || "_________________", margin + textWidth, y);
      
      y += 10;
      pdf.setFont("helvetica", "normal");
    }
    
    // Authorization boxes
    pdf.text("I expressly authorize and consent to the disclosure of my health information related to (check all that apply):", margin, y);
    y += 8;
    
    const checkboxSize = 3.5;
    const checkboxTextIndent = 7;
    
    // Row 1
    pdf.rect(margin, y, checkboxSize, checkboxSize);
    if (formData.officeVisits) {
      pdf.setFillColor(0, 0, 0);
      pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
    }
    pdf.text("Office Visits: [one annual visit (of last year), last three regular visits]", margin + checkboxTextIndent, y + 3);
    y += 7;
    
    // Row 2
    pdf.rect(margin, y, checkboxSize, checkboxSize);
    if (formData.labs) {
      pdf.setFillColor(0, 0, 0);
      pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
    }
    pdf.text("Labs: [of last two years]", margin + checkboxTextIndent, y + 3);
    y += 7;
    
    // Row 3
    pdf.rect(margin, y, checkboxSize, checkboxSize);
    if (formData.diagnosticsImaging) {
      pdf.setFillColor(0, 0, 0);
      pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
    }
    pdf.text("Diagnostics and Imaging: [All Records]", margin + checkboxTextIndent, y + 3);
    y += 7;
    
    // Row 4
    pdf.rect(margin, y, checkboxSize, checkboxSize);
    if (formData.proceduresOperations) {
      pdf.setFillColor(0, 0, 0);
      pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
    }
    pdf.text("Procedures/ Operations: [All Records]", margin + checkboxTextIndent, y + 3);
    y += 7;
    
    // Row 5
    pdf.rect(margin, y, checkboxSize, checkboxSize);
    if (formData.mentalHealth) {
      pdf.setFillColor(0, 0, 0);
      pdf.rect(margin, y, checkboxSize, checkboxSize, 'F');
    }
    pdf.text("Mental health/counseling, Alcohol and substance use, STIs including HIV/AIDS, Genetic testing/counseling:", margin + checkboxTextIndent, y + 3);
    y += 4;
    pdf.text("[last three visits]", margin + checkboxTextIndent, y + 3);
    y += 10;
    
    // Confidentiality policy
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text("CONFIDENTIALITY POLICY (PLEASE READ BEFORE SIGNING)", pageWidth / 2, y, { align: 'center' });
    y += 6;
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    const policyText = "Medical records are maintained to serve the patient and the health care team in accordance with all applicable legal and regulatory requirements. The information contained in medical records is considered highly confidential. All patient care information shall be regarded as confidential and available only to authorized users. The phrase \"medical records\" includes any protected health information (PHI), which includes test results, any medical reports, the medical record itself, claim files, and any correspondence relating to the care of a patient. Any disclosure of my protected health information to a different name, class of person, address or fax number will require a separate authorization. I have the right to revoke this authorization in writing, except to the extent that action has already been taken in reliance on this authorization. For the revocation of this authorization to be effective, the above name(s) or class of person(s) must receive the revocation in writing. This authorization shall expire one year from the date signed. After one year, a new authorization form is needed to continually disclose my PHI. I understand this authorization is voluntary and may refuse to sign it. I fully understand and accept the terms of this authorization. A copy of this authorization is valid as an original.";
    const policyLines = pdf.splitTextToSize(policyText, contentWidth);
    pdf.text(policyLines, margin, y);
    y += policyLines.length * 3 + 10;
    
    // Signature section
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text("Patient or authorized representative signature:", margin, y);
    pdf.text("Date:", margin + 130, y);
    pdf.setFont('helvetica', 'normal');

    // Add signature image
    if (signature) {
      pdf.addImage(signature, 'PNG', margin, y + 2, 45, 15);
    }
    
    // Add date
    pdf.text(formData.date, margin + 130, y + 7);
    
    y += 20;
    pdf.setFont('helvetica', 'bold');
    pdf.text("Patient or authorized representative name:", margin, y);
    y += 5;
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${formData.firstName} ${formData.lastName}`, margin, y);
    
    // Convert the PDF to a Blob and return it as a File
    const fileName = `Medical-Records-Release-${formData.lastName}-${formData.firstName}.pdf`;
    const pdfBlob = pdf.output('blob');
    
    // Store PDF for later download
    window.generatedPDF = pdf;
    window.generatedFileName = fileName;
    
    return new File([pdfBlob], fileName, { type: 'application/pdf' });
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("There was an error generating the PDF. Please try again.");
    return null;
  }
};

// Separate function to download the PDF
const downloadPDF = () => {
  try {
    if (window.generatedPDF && window.generatedFileName) {
      // Small delay to ensure form submission is complete
      setTimeout(() => {
        window.generatedPDF.save(window.generatedFileName);
        // Clean up
        window.generatedPDF = null;
        window.generatedFileName = null;
      }, 500);
    }
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
};
  
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      lastName: '',
      firstName: '',
      dob: '',
      address: '',
      mrn: '',
      recipientFacility: '',
      recipientProvider: '',
      recipientAddress: '',
      recipientTelephone: '',
      recipientFaxNumber: '',
      recipientEmail: '',
      dateFrom: '',
      dateTo: '',
      officeVisits: false,
      labs: false,
      diagnosticsImaging: false,
      proceduresOperations: false,
      mentalHealth: false,
      date: new Date().toISOString().split('T')[0]
    });
    clearSignature();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl mx-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Form Submitted Successfully!</h3>
            <p className="text-gray-600 text-center mb-6">Your medical records release form has been submitted and will be processed shortly.</p>
            <div className="flex justify-center">
              <button
                onClick={handleCloseSuccessModal}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!showPreview ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-center mb-6">
              <img src={logo} alt="Cary Physicians Logo" className="h-16 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-purple-800 text-center">Authorization for Release of Medical Records</h1>
                <h2 className="text-lg font-semibold text-gray-800 text-center">Cary Physicians Primary Care PLLC</h2>
              </div>
            </div>
            
            <form onSubmit={handlePreview} className="space-y-6 mt-6">
              {/* Date field */}
              <div className="flex justify-end">
                <div className="w-1/4">
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
              
              {/* Request From and To Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Request From (Static) */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">REQUEST FROM:</h2>
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-semibold">Requesting Facility:</span>
                      <span className="col-span-2 text-sm">Cary Physicians Primary Care</span>
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-semibold">Provider:</span>
                      <span className="col-span-2 text-sm">Dr. Muhammad Ghani</span>
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-semibold">Address:</span>
                      <span className="col-span-2 text-sm">115 Parkway Office Court, Suite 104</span>
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-semibold">Telephone:</span>
                      <span className="col-span-2 text-sm">(919) 230-7439</span>
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-semibold">Fax Number:</span>
                      <span className="col-span-2 text-sm">(919) 912-5442</span>
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-semibold">Email Address:</span>
                      <span className="col-span-2 text-sm">office@caryphysicians.com</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - TO (User input) */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">TO:</h2>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Facility</label>
                      <input
                        type="text"
                        name="recipientFacility"
                        value={formData.recipientFacility}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Provider</label>
                      <input
                        type="text"
                        name="recipientProvider"
                        value={formData.recipientProvider}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="recipientAddress"
                        value={formData.recipientAddress}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
                      <input
                        type="text"
                        name="recipientTelephone"
                        value={formData.recipientTelephone}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fax Number</label>
                      <input
                        type="text"
                        name="recipientFaxNumber"
                        value={formData.recipientFaxNumber}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="recipientEmail"
                        value={formData.recipientEmail}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Patient Information */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h2 className="text-lg font-semibold italic text-gray-800 mb-4">Patient Information:</h2>
                
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">DOB</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              
              {/* Date Range Section */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-sm text-gray-700 mb-4">
                  I authorize "Cary Physicians Primary Care" to obtain any information about my health and health care, including
                  the diagnosis, treatment, or examination rendered to me during the period from:
                </p>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Your Record Period</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-md font-medium text-gray-700 mb-2">Select Yearly</label>
          
          <div className="space-y-2">
            {yearOptions.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  id={option.id}
                  type="radio"
                  name="year"
                  value={option.value}
                  checked={formData.year === option.value}
                  onChange={handleChange}
                  disabled={!!(formData.dateFrom || formData.dateTo)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor={option.id} className="ml-3 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
            
            <div className="flex items-center pt-1">
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="dateFrom" className="block text-md font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              id="dateFrom"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              disabled={!!formData.year}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="dateTo" className="block text-md font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              id="dateTo"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              disabled={!!formData.year}
              className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
            </div>
              {/* Authorization Checkboxes */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-sm text-gray-700 mb-4">
                  I expressly authorize and consent to the disclosure of my health information related to (check all that apply):
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="officeVisits"
                        name="officeVisits"
                        type="checkbox"
                        checked={formData.officeVisits}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="officeVisits" className="font-medium text-gray-700">
                        Office Visits: [one annual visit (of last year), last three regular visits]
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="labs"
                        name="labs"
                        type="checkbox"
                        checked={formData.labs}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="labs" className="font-medium text-gray-700">
                        Labs: [of last two years]
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="diagnosticsImaging"
                        name="diagnosticsImaging"
                        type="checkbox"
                        checked={formData.diagnosticsImaging}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="diagnosticsImaging" className="font-medium text-gray-700">
                        Diagnostics and Imaging: [All Records]
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="proceduresOperations"
                        name="proceduresOperations"
                        type="checkbox"
                        checked={formData.proceduresOperations}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="proceduresOperations" className="font-medium text-gray-700">
                        Procedures/ Operations: [All Records]
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="mentalHealth"
                        name="mentalHealth"
                        type="checkbox"
                        checked={formData.mentalHealth}
                        onChange={handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="mentalHealth" className="font-medium text-gray-700">
                        Mental health/counseling, Alcohol and substance use, STIs including HIV/AIDS, Genetic testing/counseling: [last three visits]
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Confidentiality Policy */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="text-center font-bold text-md mb-3">CONFIDENTIALITY POLICY (PLEASE READ BEFORE SIGNING)</h3>
                <p className="text-xs text-gray-700 mb-4">
                  Medical records are maintained to serve the patient and the health care team in accordance with all applicable legal and regulatory requirements. The information contained in medical records is considered highly confidential. All patient care information shall be regarded as confidential and available only to authorized users. The phrase "medical records" includes any protected health information (PHI), which includes test results, any medical reports, the medical record itself, claim files, and any correspondence relating to the care of a patient. Any disclosure of my protected health information to a different name, class of person, address or fax number will require a separate authorization. I have the right to revoke this authorization in writing, except to the extent that action has already been taken in reliance on this authorization. For the revocation of this authorization to be effective, the above name(s) or class of person(s) must receive the revocation in writing. This authorization shall expire one year from the date signed. After one year, a new authorization form is needed to continually disclose my PHI. I understand this authorization is voluntary and may refuse to sign it. I fully understand and accept the terms of this authorization. A copy of this authorization is valid as an original.
                </p>
              </div>
              
              {/* Signature Section */}
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient or authorized representative signature:
                  </label>
                  <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
                    <SignatureCanvas
                      ref={sigCanvas}
                      penColor="black"
                      canvasProps={{
                        width: 1000,
                        height: 200,
                        className: "signature-canvas"
                      }}
                    />
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Clear Signature
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Preview & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // Preview mode
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img src={logo} alt="Cary Physicians Logo" className="h-12 mr-3" />
                <h1 className="text-xl font-bold text-purple-800">Authorization for Release of Medical Records</h1>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Date: {formData.date}</p>
              </div>
            </div>
            
            {/* Preview content */}
            <div className="space-y-6 border-t border-gray-200 pt-4">
              {/* Request From and To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-md font-bold text-gray-800 mb-3">REQUEST FROM:</h2>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-semibold">Requesting Facility:</span> Cary Physicians Primary Care</p>
                    <p><span className="font-semibold">Provider:</span> Dr. Muhammad Ghani</p>
                    <p><span className="font-semibold">Address:</span> 115 Parkway Office Court, Suite 104</p>
                    <p><span className="font-semibold">Telephone:</span> (919) 230-7439</p>
                    <p><span className="font-semibold">Fax Number:</span> (919) 912-5442</p>
                    <p><span className="font-semibold">Email Address:</span> office@caryphysicians.com</p>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-md font-bold text-gray-800 mb-3">TO:</h2>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-semibold">Recipient Facility:</span> {formData.recipientFacility || "N/A"}</p>
                    <p><span className="font-semibold">Recipient Provider:</span> {formData.recipientProvider || "N/A"}</p>
                    <p><span className="font-semibold">Address:</span> {formData.recipientAddress || "N/A"}</p>
                    <p><span className="font-semibold">Telephone:</span> {formData.recipientTelephone || "N/A"}</p>
                    <p><span className="font-semibold">Fax Number:</span> {formData.recipientFaxNumber || "N/A"}</p>
                    <p><span className="font-semibold">Email Address:</span> {formData.recipientEmail || "N/A"}</p>
                  </div>
                </div>
              </div>
              
              {/* Patient Information */}
              <div>
                <h2 className="text-md font-bold italic text-gray-800 mb-3">Patient Information:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                  <div><span className="font-semibold">Last name:</span> {formData.lastName}</div>
                  <div><span className="font-semibold">First name:</span> {formData.firstName}</div>
                  <div><span className="font-semibold">DOB:</span> {formData.dob || "N/A"}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><span className="font-semibold">Address:</span> {formData.address || "N/A"}</div>
                  <div><span className="font-semibold">MRN:</span> {formData.mrn || "N/A"}</div>
                </div>
              </div>
              
              {/* Date Range */}
              
             { (formData.dateFrom && formData.dateTo) && (
              <div>
                <p className="text-sm">
                  I authorize "Cary Physicians Primary Care" to obtain any information about my health and health care, including
                  the diagnosis, treatment, or examination rendered to me during the period from 
                  <span className="font-semibold"> {formData.dateFrom || "_________"} </span> to 
                  <span className="font-semibold"> {formData.dateTo || "_________"}</span>.
                </p>
              </div>
             )
              }
             {
              formData.year && (
              <div>
                <p className="text-sm">
                I authorize "Cary Physicians Primary Care" to obtain any information about my health and health care, including
                the diagnosis, treatment, or examination rendered to me during the  
                <span className="font-semibold"> {formData.year || "_________"} </span>
               </p>
            </div>
               )
             }  

              
              {/* Authorization Checkboxes */}
              <div>
                <p className="text-sm mb-2">
                  I expressly authorize and consent to the disclosure of my health information related to:
                </p>
                <ul className="list-inside space-y-1 text-sm">
                  {formData.officeVisits && (
                    <li>✓ Office Visits: [one annual visit (of last year), last three regular visits]</li>
                  )}
                  {formData.labs && (
                    <li>✓ Labs: [of last two years]</li>
                  )}
                  {formData.diagnosticsImaging && (
                    <li>✓ Diagnostics and Imaging: [All Records]</li>
                  )}
                  {formData.proceduresOperations && (
                    <li>✓ Procedures/ Operations: [All Records]</li>
                  )}
                  {formData.mentalHealth && (
                    <li>✓ Mental health/counseling, Alcohol and substance use, STIs including HIV/AIDS, Genetic testing/counseling: [last three visits]</li>
                  )}
                </ul>
              </div>
              
              {/* Signature */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold mb-1">Patient or authorized representative signature:</p>
                    {signature && (
                      <img src={signature} alt="Signature" className="h-16" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Date:</p>
                    <p>{formData.date}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-1">Patient or authorized representative name:</p>
                  <p>{`${formData.firstName} ${formData.lastName}`}</p>
                </div>
              </div>
              
              {/* Submit Buttons */}
              <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to Edit
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p>Cary Physicians Primary Care PLLC, 115 Parkway Office Court, Suite 104</p>
      </footer>
    </div>
  );
}