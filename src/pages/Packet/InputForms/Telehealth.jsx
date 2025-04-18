import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import logo from '../../../../public/logos/logo.webp';

export default function Telehealth() {
  const [formData, setFormData] = useState({
    name: '',
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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!saveSignature()) {
      return;
    }
    
    // Here you would typically send the form data and signature to your backend
    console.log("Form Data:", formData);
    console.log("Signature:", signature);
    
    // For demonstration purposes
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
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      const maxY = pageHeight - 40; // Maximum Y position before adding a new page
      
      // Function to add header and footer to a page
      const addHeaderFooter = (pageNumber) => {
        // Set to the specified page
        pdf.setPage(pageNumber);
        
        // Header with logo and contact info
        if (logoImage) {
          // Add logo to the top left
          pdf.addImage(logoImage, 'PNG', margin, 7, 9, 24); // Smaller logo
        }
        
        // Right-aligned header text
        pdf.setFontSize(12); // Smaller font
        pdf.setFont('helvetica', 'bold');
        pdf.text("Cary Physicians Primary Care PLLC",margin + 10, 15);
        // pdf.setFontSize(8);
        // pdf.setFont('helvetica', 'normal');
        
        // Footer
        pdf.setFontSize(8);
        pdf.text("© 2025 Cary Physicians Primary Care PLLC. All rights reserved.", pageWidth / 2, pageHeight - 10, { align: 'center' });
        
        // Page number
        pdf.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      };
      
      // Helper function to add multiline text with page break handling
      const addMultiLineText = (text, x, yPos, maxWidth) => {
        const lines = pdf.splitTextToSize(text, maxWidth);
        const lineHeight = 5; // Height per line
        const totalHeight = lines.length * lineHeight;
        
        // Check if we need to add a new page
        if (yPos + totalHeight > maxY) {
          pdf.addPage();
          addHeaderFooter(pdf.internal.getNumberOfPages());
          yPos = 35; // Reset Y position for new page
        }
        
        pdf.text(lines, x, yPos);
        return yPos + totalHeight; // Return the new Y position
      };
      
      // Function to add a section with title and text
      const addSection = (title, text, currentY) => {
        // Check if we need a new page for the section title
        if (currentY + 15 > maxY) {
          pdf.addPage();
          addHeaderFooter(pdf.internal.getNumberOfPages());
          currentY = 35; // Reset Y position for new page
        }
        
        // Add section title
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, margin, currentY);
        currentY += 6;
        
        // Add section text
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        currentY = addMultiLineText(text, margin, currentY, contentWidth) + 5;
        
        return currentY;
      };
      
      // Add header and footer to first page
      addHeaderFooter(1);
      
      // Start first page content
      let y = 35; // Start below header
      
      // Add title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Permission for Telehealth Visits", pageWidth / 2, y, { align: 'center' });
      y += 10;
      
      // Add sections
      const sections = [
        {
          title: "What is telehealth?",
          text: "Telemedicine, also referred to as telehealth medicine, is the real-time, audio-visual visit between a provider and patient. It can be used as an alternative to traditional in-person care delivery and, in certain circumstances, can be used to deliver care including the diagnosis, consultation, treatment, education, care management and patient self-management."
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
          text: "You and your provider won't be in the same room, so it may feel different from an office visit. Your provider cannot examine you as closely as they might at an in-office visit. Your provider may decide you still need an office visit. Technical problems may interrupt or stop your visit before you are done."
        },
        {
          title: "Will my telehealth visit be private?",
          text: "We will not record visits with your provider. If people are close to you, they may hear something you do not want them to know. You should be in a private place so other people cannot hear you. Your provider will tell you if someone else from their office can hear or see you. We use HIPAA-compliant, encrypted telehealth technology that is designed to protect your privacy. If you use the internet for telehealth, use a network that is private and secure. There is a very small chance that someone could use technology to hear or see your telehealth visit."
        },
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
          text: "You can stop using telehealth any time, even during a telehealth visit. You can still get an office visit if you no longer want a telehealth visit. If you decide you do not want to use telehealth again, call (919) 230-7439 and say you want to stop, or sign into your patient portal and eClinicalWorks/Healow."
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
      
      // Add all sections with proper page breaks
      for (const section of sections) {
        y = addSection(section.title, section.text, y);
      }
      
      // Add copy text
      y = addMultiLineText("If you sign this document, we will give you a copy.", margin, y, contentWidth) + 15;
      
      // Check if we need a new page for signature area
      if (y + 40 > maxY) {
        pdf.addPage();
        addHeaderFooter(pdf.internal.getNumberOfPages());
        y = 35; // Reset Y position for new page
      }
      
      // Add signature fields
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Patient or authorized representative name:   ${formData.name}        Date:    ${formData.date}`, margin, y);
      y += 10;
      
      // Signature
      if (signature) {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Patient or authorized representative signature:", margin, y);
        y += 5;     
        pdf.addImage(signature, 'PNG', margin, y, 40, 20);
      }
      
      // Make sure headers and footers are on all pages
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        addHeaderFooter(i);
      }
      
      // Save PDF with patient name
      pdf.save(`Telehealth-Consent-Form-${formData.name}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  }
  
  ;  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {!showPreview ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Permission for Telehealth Visits</h1>
            
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
          portal and <strong>eClinicalWorks/ Healow.</strong>
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
                    Signature:
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
          {/* Preview Mode */}
          <div id="form-preview" className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Permission for Telehealth Visits</h1>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm transition"
                >
                  Edit Form
                </button>
                <button 
                  onClick={downloadPDF}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                >
                  Download PDF
                </button>
                <button 
                  onClick={handleSubmit}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* Header with logo */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <img src={logo} alt="Cary Physicians Primary Care PLLC Logo" className="h-16" />
              <div className="text-right">
                <h1 className="text-2xl font-bold text-blue-800">Cary Physicians Primary Care PLLC</h1>
                <p className="text-sm text-gray-600">1234 Medical Drive, Cary, NC 27513</p>
                <p className="text-sm text-gray-600">Phone: (919) 555-1234</p>
              </div>
            </div>

            {/* Document title */}
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Permission for Telehealth Visits</h1>
            
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
          portal and <strong>eClinicalWorks/ Healow.</strong>
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


            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-6">
                  <h2 className="font-semibold text-lg mb-2">Signature</h2>
                  {signature && (
                    <div className="border border-gray-200 p-4 rounded">
                      <img src={signature} alt="Patient Signature" className="max-h-32" />
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formData.date}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Patient Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>© 2025 Cary Physicians Primary Care PLLC. All rights reserved.</p>
      </div>
    </div>
  );
}