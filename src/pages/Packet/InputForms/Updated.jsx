const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.firstName || !formData.lastName) {
    alert("Please enter patient name.");
    return;
  }
  
  try {
    setIsSubmitting(true);

    // Generate the PDF file (but don't save/download it yet)
    const pdfFile = generatePDFFile(); // Create a separate function that returns the file without downloading
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
    
    // Only after successful submission, show success modal
    setShowSuccessModal(true);
    setShowPreview(false);
    
    // THEN generate and download the PDF for user's records
    generateAndDownloadPDF();

  } catch (error) {
    console.error("Error during submission:", error);
    alert("There was an error submitting the form: " + error.message);
  } finally {
    setIsSubmitting(false);
  }
};

// Separate function to generate PDF file without downloading
const generatePDFFile = () => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'letter');
    
    // ... (all your existing PDF generation code here - same as current generatePDF function)
    // ... (I'll include the full code below)
    
    // Set page dimensions
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    // Function to add header and footer
    const addHeaderFooter = () => {
      if (logoImage) {
        pdf.addImage(logoImage, 'PNG', margin, 7, 9, 24);
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Cary Physicians Primary Care PLLC", margin + 10, 15);
      
      pdf.setFontSize(12);
      pdf.setTextColor(128, 0, 128);
      pdf.text("Authorization for Release of Medical Records", pageWidth / 2, 25, { align: 'center' });
      pdf.setTextColor(0, 0, 0);
      
      pdf.setFontSize(6);
      pdf.text("Cary Physicians Primary Care PLLC, 115 Parkway Office Court, Suite 104", 14, pageHeight - 7);
    };
    
    // Add all your existing PDF content generation code here...
    // (I'll abbreviate this since it's the same as your current generatePDF function)
    addHeaderFooter();
    
    let y = 32;
    
    // Date field
    pdf.setFontSize(10);
    pdf.setFont('', 'bold');
    pdf.text("Date:", pageWidth - margin - 40, y);
    pdf.setFont('helvetica', 'normal');
    pdf.line(pageWidth - margin - 30, y + 1, pageWidth - margin, y + 1);
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
    //   const fileName = `Medical-Records-Release-${formData.lastName}-${formData.firstName}.pdf`;
    //   pdf.save(fileName);
         
    // Convert the PDF to a Blob and return it as a File (DON'T save it)
    const pdfBlob = pdf.output('blob');
    const fileName = `Medical-Records-Release-${formData.lastName}-${formData.firstName}.pdf`;
    return new File([pdfBlob], fileName, { type: 'application/pdf' });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
};

// Separate function to generate and download PDF
const generateAndDownloadPDF = () => {
  try {
    // Create a new PDF document
    const pdf = new jsPDF('p', 'mm', 'letter');
    
    // ... (all your existing PDF generation code - same as generatePDFFile)
    
    // At the end, save the PDF (this will download it)
    const fileName = `Medical-Records-Release-${formData.lastName}-${formData.firstName}.pdf`;
    pdf.save(fileName);
    
  } catch (error) {
    console.error("Error generating PDF for download:", error);
    alert("There was an error generating the PDF for download. Please try again.");
  }
};