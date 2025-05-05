import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import logo from '../../../../public/logos/logo.webp';
import Tcf_service from '../../../services/Tcf_service';

export default function Telehealth() {
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [signature, setSignature] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const sigCanvas = useRef(null); // Initialize as null

  const resetForm = () => {
    setFormData({
      name: '',
      date: new Date().toISOString().split('T')[0]
    });
    clearSignature();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Please enter patient name.");
      return;
    }

    // Check if sigCanvas.current exists before calling isEmpty
    // if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
    //   alert("Please provide a signature");
    //   return;
    // }

    try {
      setIsSubmitting(true);

      // Generate the PDF and get the file
      const pdfBlob = await generatePDF();
      if (!pdfBlob) {
        throw new Error("Failed to generate PDF file");
      }
      
      // Create form data for submission
      const submissionData = new FormData();
      submissionData.append("patient_name", formData.name);
      submissionData.append("pdf_file", pdfBlob, `Telehealth-Consent-Form-${formData.name}.pdf`);
      
      // Submit to server
      const result = await Tcf_service.uploadRecord(submissionData);
      console.log("Upload result:", result);
      setShowSuccessModal(true);
      setShowPreview(false);
      resetForm();

    } catch (error) {
      console.error("Error during submission:", error);
      alert("There was an error submitting the form: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearSignature = () => {
    // Add a check to ensure sigCanvas.current exists before calling clear
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    setSignature(null);
  };

  const saveSignature = () => {
    // Check if sigCanvas.current exists before calling isEmpty
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert("Please provide a signature");
      return false;
    }

    // Use standard toDataURL method
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

  // Function to generate PDF with letter size and compact format
// Fixed PDF generation function
const generatePDF = () => {
  return new Promise((resolve, reject) => {
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
          pdf.addImage(logoImage, 'PNG', margin, 7, 9, 24); // Logo size and position
        }
        
        // Right-aligned header text
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Cary Physicians Primary Care PLLC", margin + 10, 15);
        
        // Title
        pdf.setFontSize(12);
        pdf.setTextColor(0, 0, 128); // Blue color for title
        pdf.text("Permission for Telehealth Visits", pageWidth / 2, 25, { align: 'center' });
        pdf.setTextColor(0, 0, 0); // Reset to black
        
        // Footer
        pdf.setFontSize(6);
        pdf.text("Cary Physicians Primary Care PLLC, 115 Parkway Office Court, Suite 104", 14, pageHeight - 7);
      };
      
      // Add header and footer
      addHeaderFooter();
      
      // Start content
      let y = 35; // Start below header
      
      // Helper function to add sections with title and text
      const addSection = (title, text) => {
        // Add section title
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, margin, y);
        y += 5;
        
        // Add section text
        pdf.setFont('helvetica', 'normal');
        const lines = pdf.splitTextToSize(text, contentWidth);
        pdf.text(lines, margin, y);
        y += lines.length * 4 + 2; // Add space after paragraph
      };
      
      // Define all sections
      const sections = [
        {
          title: "What is telehealth?",
          text: "Telemedicine, also referred to as telehealth medicine, is the real-time, audio-visual visit between a provider and patient. It can be used as an alternative to traditional in-person care delivery for diagnosis, consultation, treatment, education, and patient self-management."
        },
        {
          title: "How do I use telehealth?",
          text: "You talk to your provider with a phone, computer or tablet. Sometimes, you use video so you and your provider can see each other."
        },
        {
          title: "How does telehealth help me?",
          text: "You don't have to go to a clinic or hospital to see your provider. It also reduces your risk of getting sick from other people."
        },
        {
          title: "What are some of the benefits of telehealth?",
          text: "No transportation time or costs, reduced wait time, and more detailed and personalized care compared to a telephone call."
        },
        {
          title: "What are some of the challenges of telehealth visits?",
          text: "You and your provider won't be in the same room. Your provider cannot examine you as closely as they might at an in-office visit. Your provider may decide you still need an office visit. Technical problems may interrupt or stop your visit."
        },
        {
          title: "Will my telehealth visit be private?",
          text: "We will not record visits. You should be in a private place. We use HIPAA-compliant, encrypted technology to protect your privacy. Use a private and secure network for telehealth."
        }
      ];
      
      // Add first page sections
      sections.forEach((section, index) => {
        // Check if we need to add a new page
        if (y > pageHeight - 30) {
          pdf.addPage();
          addHeaderFooter(); // Add header/footer to new page
          y = 35; // Reset y position for new page
        }
        addSection(section.title, section.text);
      });
      
      // Check if we need to add a new page for remaining sections
      if (y > pageHeight - 80) {
        pdf.addPage();
        addHeaderFooter(); // Add header/footer to new page
        y = 35; // Reset y position for new page
      }
      
      // Add remaining sections
      const remainingSections = [
        {
          title: "What types of visits can telehealth be used for?",
          text: "Telehealth is best suited for interactions with established patients who do not require a physical exam or lab work."
        },
        {
          title: "What types of visits are not appropriate for telehealth?",
          text: "Telehealth is not suited for a physical examination or lab testing, and cannot be used for new-patient evaluations."
        },
        {
          title: "What if I want an office visit, not a telehealth visit?",
          text: "That decision is up to you and your provider. Find out what options are available to you by calling the practice."
        },
        {
          title: "What if I try telehealth and don't like it?",
          text: "You can stop using telehealth any time. Call (919) 230-7439 or sign into your eClinicalWorks/Healow patient portal."
        },
        {
          title: "How much does a telehealth visit cost?",
          text: "What you pay depends on your insurance. If your provider decides you need an office visit in addition to your telehealth visit, you may have to pay for both visits."
        },
        {
          title: "Do I have to sign this document?",
          text: "No. Only sign this document if you want to use telehealth."
        },
        {
          title: "What does it mean if I sign this document?",
          text: "If you sign this document, you agree that: We talked about the information in this document. We answered all your questions. You want a telehealth visit."
        }
      ];
      
      // Add remaining sections
      remainingSections.forEach((section, index) => {
        // Check if adding this section would overflow the page
        if (y > pageHeight - 30) {
          pdf.addPage();
          addHeaderFooter(); // Add header/footer to new page
          y = 35; // Reset y position for new page
        }
        addSection(section.title, section.text);
      });
      
      // Add note about copy
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.text("If you sign this document, we will give you a copy.", margin, y);
      y += 10;
      
      // Check if signature section needs a new page
      if (y > pageHeight - 40) {
        pdf.addPage();
        addHeaderFooter(); // Add header/footer to new page
        y = 35; // Reset y position for new page
      }
      
      // Patient Acknowledgment section
// Set font size and style for section heading
pdf.setFontSize(11);
pdf.setFont('helvetica', 'bold');
pdf.text("Patient Acknowledgment", margin, y);
y += 8;

// Calculate widths for better spacing
// const pageWidth = pdf.internal.pageSize.width;
// const contentWidth = pageWidth - (margin * 2);
const halfWidth = contentWidth / 2 - 10; // Subtract 10 for spacing between columns


pdf.setFontSize(10);
pdf.setFont('helvetica', 'bold');
pdf.text("Patient or authorized representative name:", margin, y);
pdf.setFont('helvetica', 'normal');
pdf.text(formData.name || "", margin + 75, y);
// Add underline for name with proper width
// pdf.line(margin + 75, y + 1, margin + 75 + halfWidth - 75, y + 1);

// Date on the same line (right side)
pdf.setFont('helvetica', 'bold');
// Position date at the halfway point
const dateX = margin + contentWidth/1.5 + 10;
pdf.text("Date:", dateX, y);
pdf.setFont('helvetica', 'normal');
pdf.text(formData.date || "", dateX + 25, y);
// Add underline for date with proper width
// pdf.line(dateX + 25, y + 1, dateX + halfWidth, y + 1);

y += 20; // Add space before signature line

// Second line: Signature on left, Date on right
pdf.setFont('helvetica', 'bold');
pdf.text("Patient or authorized representative signature:", margin, y);
// If signature exists, add it
if (signature) {
  pdf.addImage(signature, 'PNG', margin + 75, y - 15, 50, 20);
}
// Add underline for signature with proper width
// pdf.line(margin + 75, y + 1, margin + 75 + halfWidth - 75, y + 1);

// Date on the right side (same line as signature)
pdf.setFont('helvetica', 'bold');
pdf.text("Date:", dateX, y);
pdf.setFont('helvetica', 'normal');
pdf.text(formData.date || "", dateX + 25, y);
// Add underline for date with proper width
// pdf.line(dateX + 25, y + 1, dateX + halfWidth, y + 1);

y += 15; // Move to next content position 
      // Page numbers
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 7);
      }
      
      // Convert PDF to blob
      const pdfOutput = pdf.output('blob');
      resolve(pdfOutput);
      
      // Also save a copy for user
      const fileName = `Telehealth-Consent-Form-${formData.name}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
};
const handleCloseSuccessModal = () => {
  setShowSuccessModal(false);
  resetForm();
};

  // Function to download PDF separately
  const downloadPDF = () => {
    generatePDF().catch(error => {
      alert("There was an error generating the PDF. Please try again.");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center mb-2">
              <img src={logo} alt="Cary Physicians Logo" className="h-24 w-auto mr-2" />
              <div>
                <h2 className="text-lg font-semibold text-green-800 text-center font-serif">Cary Physicians Primary Care PLLC</h2>
              </div>
            </div>   
            <h1 className="text-lg font-bold text-purple-900 text-center mb-2 font-serif">Permission for Telehealth Visits</h1>
         
            <div className="prose max-w-none text-sm sm:text-base">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What is telehealth?</h2>
                <p className="mb-4">
                  Telemedicine, also referred to as telehealth medicine, is the real-time,
                  audio-visual visit between a provider and patient. It can be used as an
                  alternative to traditional in-person care delivery and, in certain
                  circumstances, can be used to deliver care including the diagnosis,
                  consultation, treatment, education, care management and patient
                  self-management.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">How do I use telehealth?</h2>
                <p className="mb-4">
                  You talk to your provider with a phone, computer or tablet. Sometimes,
                  you use video so you and your provider can see each other.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">How does telehealth help me?</h2>
                <p className="mb-4">
                  You don't have to go to a clinic or hospital to see your provider. It
                  also reduces your risk of getting sick from other people.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What are some of the benefits of telehealth?</h2>
                <p className="mb-4">
                  No transportation time or costs, reduced wait time, and more detailed
                  and personalized care compared to a telephone call.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What are some of the challenges of telehealth visits?</h2>
                <p className="mb-4">
                  You and your provider won't be in the same room, so it may feel
                  different from an office visit. Your provider cannot examine you as
                  closely as they might at an in-office visit. Your provider may decide
                  you still need an office visit. Technical problems may interrupt or stop
                  your visit before you are done.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Will my telehealth visit be private?</h2>
                <p className="mb-4">
                  We will not record visits with your provider. If people are close to
                  you, they may hear something you do not want them to know. You should be
                  in a private place so other people cannot hear you. Your provider will
                  tell you if someone else from their office can hear or see you. We use
                  HIPAA-compliant, encrypted telehealth technology that is designed to
                  protect your privacy. If you use the internet for telehealth, use a
                  network that is private and secure. There is a very small chance that
                  someone could use technology to hear or see your telehealth visit.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What types of visits can telehealth be used for?</h2>
                <p className="mb-4">
                  Telehealth is best suited for interactions with established patients who
                  do not require a physical exam or lab work.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What types of visits are not appropriate for telehealth?</h2>
                <p className="mb-4">
                  Telehealth is not suited for a physical examination or lab testing, and
                  cannot be used for new-patient evaluations.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if I want an office visit, not a telehealth visit?</h2>
                <p className="mb-4">
                  That decision is up to you and your provider. Find out what options are
                  available to you by calling the practice.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if I try telehealth and don't like it?</h2>
                <p className="mb-4">
                  You can stop using telehealth any time, even during a telehealth visit.
                  You can still get an office visit if you no longer want a telehealth
                  visit. If you decide you do not want to use telehealth again, call
                  <strong> (919) 230-7439 </strong> and say you want to stop, or sign into your patient
                  portal and <strong>eClinicalWorks/Healow.</strong>
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">How much does a telehealth visit cost?</h2>
                <p className="mb-4">
                  What you pay depends on your insurance. If your provider decides you
                  need an office visit in addition to your telehealth visit, you may have
                  to pay for both visits.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do I have to sign this document?</h2>
                <p className="mb-4">
                  No. Only sign this document if you want to use telehealth.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What does it mean if I sign this document?</h2>
                <p className="mb-4">
                  If you sign this document, you agree that: We talked about the
                  information in this document. We answered all your questions. You want a
                  telehealth visit.
                </p>
                <p>If you sign this document, we will give you a copy.</p>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Patient Acknowledgment</h2>
              
              <form onSubmit={handlePreview} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient or authorized representative name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date:
                    </label>
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
                
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient or authorized representative Signature:
                  </label>
                  <div className="border border-gray-300 rounded-md bg-white">
                    <SignatureCanvas 
                      ref={sigCanvas}
                      penColor="black"
                      canvasProps={{
                        className: "w-full h-32"
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <button 
                      type="button" 
                      onClick={clearSignature}
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-1 rounded text-sm transition"
                    >
                      Clear Signature
                    </button>
                    <button 
                      type="submit" 
                      className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                    >
                      Preview Form
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="max-w-4xl mx-auto p-6 bg-white">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <img src={logo} alt="Cary Physicians Primary Care PLLC Logo" className="h-16" />
              <div className="text-right">
                <h1 className="text-2xl font-bold text-blue-800">Cary Physicians Primary Care PLLC</h1>
                <p className="text-sm text-gray-600">1234 Medical Drive, Cary, NC 27513</p>
                <p className="text-sm text-gray-600">Phone: (919) 555-1234</p>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Permission for Telehealth Visits</h1>
            
            {/* Preview content sections (abbreviated for preview) */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Summary of Agreement</h2>
              <p className="mb-4">
                This document confirms your agreement to receive telehealth services from Cary Physicians Primary Care PLLC.
                By signing, you acknowledge that you understand the benefits and limitations of telehealth services
                as described in the complete form.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="mb-6 md:mb-0 md:w-1/2">
                <h2 className="font-semibold text-sm md:text-lg mb-2">Patient or authorized representative name:</h2>
                <p className="text-lg font-medium">{formData.name}</p>
              </div>
              
              <div className="md:w-1/2">
                <h2 className="font-semibold text-sm md:text-lg mb-2">Date:</h2>
                <p className="text-lg">{formData.date}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="font-semibold text-sm md:text-lg mb-2">Patient or authorized representative Signature:</h2>
              {signature && (
                <div className="border border-gray-200 p-2 rounded">
                  <img src={signature} alt="Patient Signature" className="max-h-32" />
                </div>
              )}
            </div>
            
            <div className="flex justify-end items-center space-x-4">
              <button 
                onClick={() => setShowPreview(false)}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm transition"
              >
                Edit Form
              </button>
              <button 
                onClick={downloadPDF}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                disabled={isSubmitting}
              >
                Download PDF
              </button>
              <button 
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-left text-sm text-gray-500">
        <p>© 2025 Cary Physicians Primary Care PLLC. All rights reserved.</p>
      </div>
    </div>
  );
}