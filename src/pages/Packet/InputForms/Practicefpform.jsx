import React, { useState, useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import jsPDF from 'jspdf';
import logo from '../../../../public/logos/logo.webp';

export default function PracticeFinancialPolicyForm() {
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
      
      // Function to add header and footer to each page
      const addHeaderFooter = () => {
        // Header with logo and contact info
        if (logoImage) {
          // Add logo to the top left
          pdf.addImage(logoImage, 'PNG', margin, 9, 8, 18); // Adjust dimensions as needed
        }
        
        // Right-aligned header text
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Cary Physicians Primary Care PLLC", pageWidth - margin, 18, { align: 'right' });
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        // pdf.text("1234 Medical Drive, Cary, NC 27513", pageWidth - margin, 20, { align: 'right' });
        // pdf.text("Phone: (919) 555-1234", pageWidth - margin, 24, { align: 'right' });
        
        // Add a divider line
        // pdf.setDrawColor(200, 200, 200);
        // pdf.line(margin, 30, pageWidth - margin, 30);
        
        pdf.setFontSize(8);
        pdf.text("© 2025 Cary Physicians Primary Care PLLC. All rights reserved.", pageWidth / 2, pageHeight - 10, { align: 'center' });
        
        // Page number
        const pageNumber = pdf.internal.getNumberOfPages();
        pdf.text(`Page ${pageNumber}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      };
      
      // Helper function to add multiline text
      const addMultiLineText = (text, x, y, maxWidth) => {
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        return y + (lines.length * 5); // Return the new Y position
      };
      
      // Start first page content
      let y = 35; // Start below header
      
      // Title
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Practice Financial Policy", pageWidth / 2, y, { align: 'center' });
      y += 10;
      
      // Introduction
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let introText = "Thank you for choosing Cary Physicians Primary Care PLLC as your healthcare provider. We are committed to building a successful physician-patient relationship, and the success of your medical treatment and care. Your understanding of our Practice Financial Policy and payment for services are important parts of this relationship. For your convenience, this document discusses a few commonly asked financial policy questions. If you need further information or assistance about any of these policies, please ask to speak with our Practice Manager.";
      y = addMultiLineText(introText, margin, y, contentWidth) + 5;
      
      // When are payments due section
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("When are payments due?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let paymentsText = "All copayments, deductibles, patient responsibility amounts, and past-due balances are due at the time of check-in unless previous arrangements have been made with our billing coordinator.";
      y = addMultiLineText(paymentsText, margin, y, contentWidth) + 5;
      
      // How may I pay section
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("How may I pay?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let payMethodsText = "We accept payment by cash, check, VISA, and MasterCard. We will only accept post-dated checks when they are provided within an approved payment plan.";
      y = addMultiLineText(payMethodsText, margin, y, contentWidth) + 5;
      
      // Do I need a referral section
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Do I need a referral or pre-authorization?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let referralText = "If your insurance plan requires a referral authorization from your primary care physician or a pre-authorization from your insurance, you will need to contact your primary care physician or insurance company to be sure it has been obtained. If we have yet to receive authorization prior to your appointment time, we will reschedule. Failure to obtain the referral or preauthorization may result in a lower or no payment from the insurance company, and the balance will become the patient's responsibility.";
      y = addMultiLineText(referralText, margin, y, contentWidth) + 5;
      
      // Will you bill my insurance section
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Will you bill my insurance?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let insuranceText = "Insurance is a contract between you and your insurance company. In most cases, we are not a party to this contract. We will bill your primary insurance company on your behalf as a courtesy to you. To properly bill your insurance company, we require that you disclose all insurance information, including primary and secondary insurance, as well as any change of insurance information.";
      y = addMultiLineText(insuranceText, margin, y, contentWidth) + 5;
      
      // Check if we need a new page
      if (y > pageHeight - 40) {
        pdf.addPage();
        y = 35; // Reset Y position for new page
      }
      
      let moreInsuranceText = "It is your responsibility to notify our office promptly of any patient information changes (ie, address, name, insurance information) to facilitate appropriate billing for the services rendered to you. Failure to provide complete and accurate insurance information may result in the entire bill being categorized as a patient's responsibility.";
      y = addMultiLineText(moreInsuranceText, margin, y, contentWidth) + 5;
      
      if (y > pageHeight - 40) {
        pdf.addPage();
        y = 35;
      }
      
      let evenMoreInsuranceText = "Although we may estimate what your insurance company may pay, it is the insurance company that makes the final determination of your eligibility and benefits. If your insurance company is not contracted with us, you agree to pay any portion of the charges not covered by insurance, including but not limited to those charges above the usual and customary allowance. If we are out of network for your insurance company and your insurance pays you directly, you are responsible for payment and agree to forward the payment to us immediately.";
      y = addMultiLineText(evenMoreInsuranceText, margin, y, contentWidth) + 5;
      
      // Which plans do you contract with section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Which plans do you contract with?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let plansText = "Cary Physicians Primary Care PLLC accepts most major insurance plans. However, with the frequent changes that happen in the insurance marketplace, it is a good idea for you to contact your insurance company prior to your appointment and verify if we are a participating provider as per your plan.";
      y = addMultiLineText(plansText, margin, y, contentWidth) + 5;
      
      // What if my plan does not contract with you section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("What if my plan does not contract with you?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let nonContractText = "If we are not a provider under your insurance plan, you will be responsible for payment in full at the time of service. As a courtesy, however, we will file your initial insurance claim, and if not paid within 45 days, you will be responsible for the total bill. After your insurance company has processed your claims, any amount remaining as a credit balance will be refunded to you.";
      y = addMultiLineText(nonContractText, margin, y, contentWidth) + 5;
      
      // What is my financial responsibility section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("What is my financial responsibility for services?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let responsibilityText = "It is your responsibility to verify that the physicians and the practice where you are seeking treatment are listed as authorized providers under your insurance plan. Your employer or insurance company should be able to provide a current provider listing.";
      y = addMultiLineText(responsibilityText, margin, y, contentWidth) + 5;
      
      // Workers Comp section
      if (y > pageHeight - 60) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text("If you have:", margin, y);
      y += 6;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text("Workers' Compensation", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text("• If we have verified the claim with your carrier: No payment is necessary at the time of the visit.", margin + 5, y);
      y += 5;
      pdf.text("• If we are not able to verify your claim: Your appointment will need to be rescheduled.", margin + 5, y);
      y += 10;
      
      let wcText = "Our staff will schedule your appointment after your worker's compensation carrier calls in advance to verify the accident date, claim number, primary care physician, employer information, and referral procedures.";
      y = addMultiLineText(wcText, margin, y, contentWidth) + 5;
      
      pdf.setFont('helvetica', 'bold');
      pdf.text("Workers' Compensation (Out of State) and Occupational Injury", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text("• Payment in full is requested at the time of the visit.", margin + 5, y);
      y += 10;
      
      let wcOutText = "Our staff will provide a receipt to file the claim with your carrier.";
      y = addMultiLineText(wcOutText, margin, y, contentWidth) + 5;
      
      if (y > pageHeight - 60) {
        pdf.addPage();
        y = 35;
      }
      
      let nonCoveredText = "The patient or the patient's legal representative is ultimately responsible for all charges for services rendered. \"Non-covered\" means that a service will not be paid for under your insurance plan. If non-covered services are provided, you will be expected to pay for these services at the time they are provided or when you receive a statement or explanation of benefits (EOB) from your insurance provider denying payment.";
      y = addMultiLineText(nonCoveredText, margin, y, contentWidth) + 5;
      
      if (y > pageHeight - 60) {
        pdf.addPage();
        y = 35;
      }
      
      let appealText = "Your insurance company offers appeal procedures. We will not under any circumstances falsify or change a diagnosis or symptom to convince an insurer to pay for care that is not covered, nor do we delete or change the content in the record that may prevent services from being considered covered. We cannot offer services without expectation of payment, and if you receive non-covered services, you must agree to pay for these services if your insurance company does not. If you are unsure whether a service is covered by your plan, ultimately, it is your responsibility to call your insurance company to determine what your schedule of benefits allows, if a deductible applies, and your potential financial responsibility.";
      y = addMultiLineText(appealText, margin, y, contentWidth) + 5;
      
      // What if I don't have insurance section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("What if I don't have insurance?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let selfPayText = "Self-pay accounts are used for patients without insurance coverage, patients covered by insurance plans which the office does not accept, or patients without an insurance card on file with us. Liability cases will also be considered self-pay accounts. We do not accept attorney letters or contingency payments. It is always the patient's responsibility to know if our office is participating in their plan. If there is a discrepancy with our information, the patient will be considered self-pay unless otherwise proven. Self-pay patients will be required to pay in full for services rendered to them and will be asked to make payment arrangements prior to services being rendered. Emergency services provided to self-pay patients will be billed to the patient.";
      y = addMultiLineText(selfPayText, margin, y, contentWidth) + 5;
      
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      let paymentPlanText = "At the sole discretion of the practice, extended payment arrangements may be made for patients. Please speak with our practice manager to discuss a mutually agreeable payment plan. It is never our intention to cause hardship to our patients, only to provide them with the best care possible and reasonable costs.";
      y = addMultiLineText(paymentPlanText, margin, y, contentWidth) + 5;
      
      // Secondary insurance section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("I received a bill even though I have secondary insurance.", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let secondaryText = "Having secondary insurance does not necessarily mean that your services are 100% covered. Secondary insurance policies typically pay according to a coordination of benefits with the primary insurance.";
      y = addMultiLineText(secondaryText, margin, y, contentWidth) + 5;
      
      // Billing questions section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("What if I have billing or insurance questions?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let billingText = "Cary Physicians Primary Care is supported by a staff of dedicated professionals. Our office staff can assist with most financial questions and help relieve the patient/caregiver of burdensome paperwork. Please ask if you have any questions about our fees, our policies, or your responsibilities.";
      y = addMultiLineText(billingText, margin, y, contentWidth) + 5;
      
      // Workers comp billing section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Do you bill workers' compensation?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let wcBillingText = "We will bill workers' compensation for verified claims. It is the patient's responsibility to provide our office staff with employer authorization and contact information regarding a workers' compensation claim. If the claim is denied by the workers' compensation insurance carrier, it then becomes the patient's responsibility.";
      y = addMultiLineText(wcBillingText, margin, y, contentWidth) + 5;
      
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      let wcDenialText = "At your request, we will submit the claim to your primary medical insurance carrier with a copy of the workers' compensation insurance denial. If your primary medical insurance carrier's claim is denied, you will be responsible for payment in full.";
      y = addMultiLineText(wcDenialText, margin, y, contentWidth) + 5;
      
      // Surgery section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("What if I need surgery?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let surgeryText = "If your physician recommends surgery, your surgery will be scheduled by your physician's staff. The staff member can answer specific questions about the surgery scheduling process, discuss the paperwork and tests involved, and assist with completing all prior authorization your insurance company might require.";
      y = addMultiLineText(surgeryText, margin, y, contentWidth) + 5;
      
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      let surgeryDepositText = "Our office will require a pre-surgical deposit equal to the amount of your copayment/deductible to go toward your surgery copayment, deductible, or any other amount your insurance carrier deems to be the patient's responsibility. After your insurance company has processed your surgery claim, any amount remaining as a credit will be refunded to you.";
      y = addMultiLineText(surgeryDepositText, margin, y, contentWidth) + 5;
      
      // Multiple bills section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("I received more than one bill for my surgery/procedure/service.", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let multipleBillsText = "Please note that Cary Physicians Primary Care only bills for services rendered by our clinical team during the procedure. The hospital or other providers may bill you for other services provided—which might include operating room costs, anesthesia costs, other doctor's charges, etc. If you believe you have been accidentally billed twice for the same service, please get in touch with our office for clarification or resolution.";
      y = addMultiLineText(multipleBillsText, margin, y, contentWidth) + 5;
      
      // Third party billing section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Do you bill other third parties?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let thirdPartyText = "We do not bill third parties for services rendered to you. Our relationship is with you and not with the third-party liability insurer or policy carrier (eg, auto or homeowner). It is your responsibility to seek reimbursement from them. However, at your request, we will submit a claim to your primary health insurance carrier. You will be asked to pay in full for the services we provide you. All formalities required by your insurer and the third party should be promptly completed by you. If we receive a denial of your claim, you will be responsible for payment in full.";
      y = addMultiLineText(thirdPartyText, margin, y, contentWidth) + 5;
      
      // Late insurance payment section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("What if my insurance pays late?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let latePaymentText = "As a courtesy to you, we bill your insurance company for services on your behalf. If any insurance company fails to process payment for services within 45 days from the date of the claim submission, the total balance will be determined to be the patient's responsibility.";
      y = addMultiLineText(latePaymentText, margin, y, contentWidth) + 5;
      
      // Statements section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Will I receive statements or bills?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let statementsText = "It is our office policy that all accounts with pending balances be sent two statements, each one month apart. If payment is not made on the account, a single phone call will be made to try and make payment arrangements. Accounts with unpaid balances for 90 calendar days or more will be sent to an external collection agency or attorney for collection. Unpaid bills can also lead to possible discharge from the practice.";
      y = addMultiLineText(statementsText, margin, y, contentWidth) + 5;
      
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      let collectionsText = "In the event an account is turned over for collections, the person financially responsible for the account will be responsible for the collections costs, including attorney fees and court costs.";
      y = addMultiLineText(collectionsText, margin, y, contentWidth) + 5;
      
      let responsiblePartyText = "Regardless of any personal arrangements that a patient might have outside of our office if you are 18 years old or older and receiving treatment, you are ultimately responsible for payment of the service. Our office will not bill any other personal party.";
      y = addMultiLineText(responsiblePartyText, margin, y, contentWidth) + 5;
      
      // Collections referral section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Do you refer unpaid bills to collection agencies?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let collectionsReferralText = "If a patient cannot pay the balance on their account according to the financial policy will be referred to an outside collection agency or an attorney for further action.";
      y = addMultiLineText(collectionsReferralText, margin, y, contentWidth) + 5;
      
      // Child section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("What if my child needs to see a physician?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let childText = "A parent or legal guardian must accompany patients who are minors on the patient's first visit. This accompanying adult is responsible for payment of the account, according to the policy outlined on the previous pages.";
      y = addMultiLineText(childText, margin, y, contentWidth) + 5;
      
      // Returned payment section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Do you charge a penalty for returned payments?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let returnedPaymentText = "Any charges incurred by the practice collecting balances owed to us during the collection process may be charged to the patient. Returned checks, credit card chargebacks, or returned payments will attract a minimum $35 penalty in addition to the balance owed. Accounts with returned payments will be expected to make payments via cash, money order, or cashier's checks only.";
      y = addMultiLineText(returnedPaymentText, margin, y, contentWidth) + 5;
      
      // Copay waiver section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Can you waive my copay?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let copayWaiverText = "We cannot waive deductibles, coinsurances, or copays that are required by your insurance. This is a violation of insurance rules.";
      y = addMultiLineText(copayWaiverText, margin, y, contentWidth) + 5;
      
      // Hardship section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("I have a hardship. How can you help me?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let hardshipText = "Some patients may accrue large balances for services provided. At the sole discretion of the practice leadership, we will work with you to set up a mutually feasible payment plan. In some cases, if the minimum payment due cannot be paid, we will need proof of financial hardship. We may be forced to pursue collections of balances in the absence of tangible proof of hardship.";
      y = addMultiLineText(hardshipText, margin, y, contentWidth) + 5;
      
      // Forms section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Do you charge for completing forms?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let formsText = "Completing disability forms, FMLA forms, and other requested supplemental insurance forms requires time away from patient care and day-to-day business operations. A prepayment of $15.00 per form is required. Please understand that to complete forms, your medical record must be reviewed, forms completed and signed by the physician, and copied into your medical record. Some of these forms can be quite complicated and tedious to fill out. Please provide us with pertinent information, especially dates of disability and return to work. We request that you allow 5 business days for this process.";
      y = addMultiLineText(formsText, margin, y, contentWidth) + 5;
      
      // Medical records section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("Do you charge for copies of medical records?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let recordsText = "Patients requesting copies of their medical records will not be charged a fee.";
      y = addMultiLineText(recordsText, margin, y, contentWidth) + 5;
      
      let attorneyRecordsText = "Attorneys and Insurance companies requesting medical records will be charged a $15 fee plus postage and these fees:";
      y = addMultiLineText(attorneyRecordsText, margin, y, contentWidth) + 5;
      
      pdf.text("• $0.25 per page — under 100 pages", margin + 5, y);
      y += 5;
      pdf.text("• $0.10 per page — over 100 pages", margin + 5, y);
      y += 5;
      pdf.text("• $15 for an itemized bill", margin + 5, y);
      y += 10;
      
      let expeditedText = "Expedited requests will be charged a special handling fee.";
      y = addMultiLineText(expeditedText, margin, y, contentWidth) + 5;
      
      let electronicText = "Records requested via electronic media (flash drives, CDs, DVDs, etc.) will be charged an additional $10 device fee.";
      y = addMultiLineText(electronicText, margin, y, contentWidth) + 5;
      
      // Missed appointment section
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = 35;
      }
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text("What if I missed my appointment to see the physician?", margin, y);
      y += 6;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let missedApptText = "We understand that on rare occasions, issues may arise, causing you to miss your appointment when you cannot notify our office before your appointment. Should you experience any unforeseen circumstance that causes you to miss your appointment, please call our office at least 24 hours prior to having it rescheduled.";
      y = addMultiLineText(missedApptText, margin, y, contentWidth) + 5;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      let acknowledgmentText = "I have read, understand, and agree to the above Financial Policy. I understand my financial responsibility to make payments for services provided to me and the courtesy extended by Cary Physicians Primary Care to simplify insurance reimbursement for the services provided to me. I acknowledge that these policies do not obligate Cary Physicians Primary Care to extend credit to me for services provided.";
      y = addMultiLineText(acknowledgmentText, margin, y, contentWidth) + 15;
      
  
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Patient or authorized representative name:   ${formData.name}        Date:    ${formData.date}`, margin, y);
      y += 10;
      
    //   pdf.text(`Date: ${formData.date}`, margin, y);
    //   y += 15;
      
      // Signature
      if (signature) {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text("Patient or authorized representative signature:", margin,y);
        y += 5;     
        pdf.addImage(signature, 'PNG', margin, y, 40, 20);

      }
      
      // Apply header and footer to all pages
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        addHeaderFooter();
      }
      
      // Save PDF
      pdf.save(`Practice-Financial-Policy-${formData.name}.pdf`);
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
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Practice Financial Policy</h1>
            
            <div className="prose max-w-none text-sm sm:text-base">
              <p className="mb-4">
                Thank you for choosing <strong>Cary Physicians Primary Care PLLC</strong> as your healthcare provider. We are committed to building a successful physician-patient relationship, and the success of your medical treatment and care. Your understanding of our Practice Financial Policy and payment for services are important parts of this relationship, and the success of your medical treatment and care. Your understanding of our Practice Financial Policy and payment for services are important parts of this relationship. For your convenience, this document discusses a few commonly asked financial policy questions. If you need further information or assistance about any of these policies, please ask to speak with our Practice Manager. 
              </p>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">When are payments due?</h2>
                <p className="mb-4">
                  All copayments, deductibles, patient responsibility amounts, and past-due balances are due at the time of check-in unless previous arrangements have been made with our billing coordinator.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">How may I pay?</h2>
                <p className="mb-4">
                  We accept payment by cash, check, VISA, and MasterCard. We will only accept post-dated checks when they are provided within an approved payment plan.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do I need a referral or pre-authorization?</h2>
                <p className="mb-4">
                  If your insurance plan requires a referral authorization from your primary care physician or a pre-authorization from your insurance, you will need to contact your primary care physician or insurance company to be sure it has been obtained. If we have yet to receive authorization prior to your appointment time, we will reschedule.. Failure to obtain the referral or preauthorization may result in a lower or no payment from the insurance company, and the balance will become the patient’s responsibility.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Will you bill my insurance?</h2>
                <p className="mb-4">
                Insurance is a contract between you and your insurance company. In most cases, we are not a party to this contract. We will bill your primary insurance company on your behalf as a courtesy to you. To properly bill your insurance company, we require that you disclose all insurance information, including primary and secondary insurance, as well as any change of insurance information. 

It is your responsibility to notify our office promptly of any patient information changes (ie, address, name, insurance information) to facilitate appropriate billing for the services rendered to you. Failure to provide complete and accurate insurance information may result in the entire bill being categorized as a patient’s responsibility. 

Although we may estimate what your insurance company may pay, it is the insurance company that makes the final determination of your eligibility and benefits. If your insurance company is not contracted with us, you agree to pay any portion of the charges not covered by insurance, including but not limited to those charges above the usual and customary allowance. If we are out of network for your insurance company and your insurance pays you directly, you are responsible for payment and agree to forward the payment to us immediately. 
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Which plans do you contract with? </h2>
                <p className="mb-4">
                Cary Physicians Primary Care PLLC accepts most major insurance plans. However, with the frequent changes that happen in the insurance marketplace, it is a good idea for you to contact your insurance company prior to your appointment and verify if we are a participating provider as per your plan.                 </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if my plan does not contract with you?  </h2>
                <p className="mb-4">

                If we are not a provider under your insurance plan, you will be responsible for payment in full at the time of service. As a courtesy, however, we will file your initial insurance claim, and if not paid within 45 days, you will be responsible for the total bill. After your insurance company has processed your claims, any amount remaining as a credit balance will be refunded to you. 
              </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What is my financial responsibility for services?   </h2>
                <p className="mb-4">

                It is your responsibility to verify that the physicians and the practice where you are seeking treatment are listed as authorized providers under your insurance plan. Your employer or insurance company should be able to provide a current provider listing.   
              </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">If you have: </h2>
                <p className="mb-4">


                Workers’ Compensation
•	If we have verified the claim with your carrier: No payment is necessary at the time of the visit. 
•	If we are not able to verify your claim: Your appointment will need to be rescheduled. 

Our staff will schedule your appointment after your worker’s compensation carrier calls in advance to verify the accident date, claim number, primary care physician, employer information, and referral procedures. 






Workers’ Compensation (Out of State) and Occupational Injury
•	Payment in full is requested at the time of the visit. 	

Our staff will provide a receipt to file the claim with your carrier. 

The patient or the patient’s legal representative is ultimately responsible for all charges for services rendered. “Non-covered” means that a service will not be paid for under your insurance plan. If non-covered services are provided, you will be expected to pay for these services at the time they are provided or when you receive a statement or explanation of benefits (EOB) from your insurance provider denying payment. 

Your insurance company offers appeal procedures. We will not under any circumstances falsify or change a diagnosis or symptom to convince an insurer to pay for care that is not covered, nor do we delete or change the content in the record that may prevent services from being considered covered. We cannot offer services without expectation of payment, and if you receive non-covered services, you must agree to pay for these services if your insurance company does not. If you are unsure whether a service is covered by your plan, ultimately, it is your responsibility to call your insurance company to determine what your schedule of benefits allows, if a deductible applies, and your potential financial responsibility. 
              </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if I don’t have insurance?   </h2>
                <p className="mb-4">

                Self-pay accounts are used for patients without insurance coverage, patients covered by insurance plans which the office does not accept, or patients without an insurance card on file with us. Liability cases will also be considered self-pay accounts. We do not accept attorney letters or contingency payments. It is always the patient’s responsibility to know if our office is participating in their plan. If there is a discrepancy with our information, the patient will be considered self-pay unless otherwise proven. Self-pay patients will be required to pay in full for services rendered to them and will be asked to make payment arrangements prior to services being rendered. Emergency services provided to self-pay patients will be billed to the patient. 

At the sole discretion of the practice, extended payment arrangements may be made for patients. Please speak with our practice manager to discuss a mutually agreeable payment plan. It is never our intention to cause hardship to our patients, only to provide them with the best care possible and reasonable costs.
              </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">I received a bill even though I have secondary insurance.    </h2>
                <p className="mb-4">

                Having secondary insurance does not necessarily mean that your services are 100% covered. Secondary insurance policies typically pay according to a coordination of benefits with the primary insurance.               </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if I have billing or insurance questions?    </h2>
                <p className="mb-4">

                Cary Physicians Primary Care is supported by a staff of dedicated professionals. Our office staff can assist with most financial questions and help relieve the patient/caregiver of burdensome paperwork. Please ask if you have any questions about our fees, our policies, or your responsibilities.              </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you bill workers’ compensation?</h2>
                <p className="mb-4">

                We will bill workers’ compensation for verified claims. It is the patient’s responsibility to provide our office staff with employer authorization and contact information regarding a workers’ compensation claim. If the claim is denied by the workers’ compensation insurance carrier, it then becomes the patient’s responsibility. 

At your request, we will submit the claim to your primary medical insurance carrier with a copy of the workers’ compensation insurance denial. If your primary medical insurance carrier’s claim is denied, you will be responsible for payment in full.
</p>  </div> 

               <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">[For surgical specialties] What if I need surgery?    </h2>
                <p className="mb-4">

                If your physician recommends surgery, your surgery will be scheduled by your physician’s staff. The staff member can answer specific questions about the surgery scheduling process, discuss the paperwork and tests involved, and assist with completing all prior authorization your insurance company might require. 

                Our office will require a pre-surgical deposit equal to the amount of your copayment/deductible to go toward your surgery copayment, deductible, or any other amount your insurance carrier deems to be the patient’s responsibility. After your insurance company has processed your surgery claim, any amount remaining as a credit will be refunded to you. 

</p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">I received more than one bill for my surgery/procedure/service.    </h2>
                <p className="mb-4">

                Please note that Cary Physicians Primary Care only bills for services rendered by our clinical team during the procedure. The hospital or other providers may bill you for other services provided—which might include operating room costs, anesthesia costs, other doctor’s charges, etc. If you believe you have been accidentally billed twice for the same service, please get in touch with our office for clarification or resolution.              </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you bill other third parties?    </h2>
                <p className="mb-4">

                We do not bill third parties for services rendered to you. Our relationship is with you and not with the third-party liability insurer or policy carrier (eg, auto or homeowner). It is your responsibility to seek reimbursement from them. However, at your request, we will submit a claim to your primary health insurance carrier. You will be asked to pay in full for the services we provide you. All formalities required by your insurer and the third party should be promptly completed by you. If we receive a denial of your claim, you will be responsible for payment in full.               </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if my insurance pays late? What if my insurance pays late? </h2>
                <p className="mb-4">

                As a courtesy to you, we bill your insurance company for services on your behalf. If any insurance company fails to process payment for services within 45 days from the date of the claim submission, the total balance will be determined to be the patient’s responsibility.               </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Will I receive statements or bills?    </h2>
                <p className="mb-4">

                It is our office policy that all accounts with pending balances be sent two statements, each one month apart. If payment is not made on the account, a single phone call will be made to try and make payment arrangements. Accounts with unpaid balances for 90 calendar days or more will be sent to an external collection agency or attorney for collection. Unpaid bills can also lead to possible discharge from the practice. 

In the event an account is turned over for collections, the person financially responsible for the account will be responsible for the collections costs, including attorney fees and court costs. 

Regardless of any personal arrangements that a patient might have outside of our office if you are 18 years old or older and receiving treatment, you are ultimately responsible for payment of the service. Our office will not bill any other personal party.
              </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you refer unpaid bills to collection agencies?   </h2>
                <p className="mb-4">

                If a patient cannot pay the balance on their account according to the financial policy will be referred to an outside collection agency or an attorney for further action.               </p>
              </div>
              
              
               <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if my plan does not contract with you?  </h2>
                <p className="mb-4">

                If we are not a provider under your insurance plan, you will be responsible for payment in full at the time of service. As a courtesy, however, we will file your initial insurance claim, and if not paid within 45 days, you will be responsible for the total bill. After your insurance company has processed your claims, any amount remaining as a credit balance will be refunded to you. 
              </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if my child needs to see a physician?   </h2>
                <p className="mb-4">

                A parent or legal guardian must accompany patients who are minors on the patient’s first visit. This accompanying adult is responsible for payment of the account, according to the policy outlined on the previous pages.               </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you charge a penalty for returned payments?   </h2>
                <p className="mb-4">

                Any charges incurred by the practice collecting balances owed to us during the collection process may be charged to the patient. Returned checks, credit card chargebacks, or returned payments will attract a minimum $35 penalty in addition to the balance owed. Accounts with returned payments will be expected to make payments via cash, money order, or cashier’s checks only.               </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Can you waive my copay?  </h2>
                <p className="mb-4">

                We cannot waive deductibles, coinsurances, or copays that are required by your insurance. This is a violation of insurance rules.              </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">I have a hardship. How can you help me?   </h2>
                <p className="mb-4">

                Some patients may accrue large balances for services provided. At the sole discretion of the practice leadership, we will work with you to set up a mutually feasible payment plan. In some cases, if the minimum payment due cannot be paid, we will need proof of financial hardship. We may be forced to pursue collections of balances in the absence of tangible proof of hardship.               </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you charge for completing forms?   </h2>
                <p className="mb-4">

                Completing disability forms, FMLA forms, and other requested supplemental insurance forms requires time away from patient care and day-to-day business operations. A prepayment of $15.00 per form is required. Please understand that to complete forms, your medical record must be reviewed, forms completed and signed by the physician, and copied into your medical record. Some of these forms can be quite complicated and tedious to fill out. Please provide us with pertinent information, especially dates of disability and return to work. We request that you allow 5 business days for this process.               </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you charge for copies of medical records?  </h2>
                <p className="mb-4">

                Patients requesting copies of their medical records will not be charged a fee. 

Attorneys and Insurance companies requesting medical records will be charged a $15 fee plus postage and these fees: 
•	$0.25 per page – under 100 pages 
•	$0.10 per page – over 100 pages 
•	$15 for an itemized bill 
Expedited requests will be charged a special handling fee. 
Records requested via electronic media (flash drives, CDs, DVDs, etc.) will be charged an additional $10 device fee.
              </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if I missed my appointment to see the physician?  </h2>
                <p className="mb-4">

                We understand that on rare occasions, issues may arise, causing you to miss your appointment when you cannot notify our office before your appointment. Should you experience any unforeseen circumstance that causes you to miss your appointment, please call our office at least 24 hours prior to having it rescheduled. 

Our highly skilled physicians are committed to your well-being and have reserved time just for you. Patients who miss more than one appointment without notifying our office 24 hours before the appointment time are subject to a $20 missed appointment fee billed to the patient. 


              </p>
              </div>

             




              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="font-medium">
                  I have read, understand, and agree to the above Financial Policy. I understand my financial responsibility to make payments for services provided to me and the courtesy extended by Cary Physicians Primary Care to simplify insurance reimbursement for the services provided to me.
                </p>
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
              <h1 className="text-2xl font-bold text-gray-900">Practice Financial Policy</h1>
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
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Practice Financial Policy</h1>
            
            <div className="prose max-w-none text-sm sm:text-base">
              <p className="mb-4">
                Thank you for choosing <strong>Cary Physicians Primary Care PLLC</strong> as your healthcare provider. We are committed to building a successful physician-patient relationship, and the success of your medical treatment and care. Your understanding of our Practice Financial Policy and payment for services are important parts of this relationship, and the success of your medical treatment and care. Your understanding of our Practice Financial Policy and payment for services are important parts of this relationship. For your convenience, this document discusses a few commonly asked financial policy questions. If you need further information or assistance about any of these policies, please ask to speak with our Practice Manager. 
              </p>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">When are payments due?</h2>
                <p className="mb-4">
                  All copayments, deductibles, patient responsibility amounts, and past-due balances are due at the time of check-in unless previous arrangements have been made with our billing coordinator.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">How may I pay?</h2>
                <p className="mb-4">
                  We accept payment by cash, check, VISA, and MasterCard. We will only accept post-dated checks when they are provided within an approved payment plan.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do I need a referral or pre-authorization?</h2>
                <p className="mb-4">
                  If your insurance plan requires a referral authorization from your primary care physician or a pre-authorization from your insurance, you will need to contact your primary care physician or insurance company to be sure it has been obtained. If we have yet to receive authorization prior to your appointment time, we will reschedule.. Failure to obtain the referral or preauthorization may result in a lower or no payment from the insurance company, and the balance will become the patient’s responsibility.
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Will you bill my insurance?</h2>
                <p className="mb-4">
                Insurance is a contract between you and your insurance company. In most cases, we are not a party to this contract. We will bill your primary insurance company on your behalf as a courtesy to you. To properly bill your insurance company, we require that you disclose all insurance information, including primary and secondary insurance, as well as any change of insurance information. 

It is your responsibility to notify our office promptly of any patient information changes (ie, address, name, insurance information) to facilitate appropriate billing for the services rendered to you. Failure to provide complete and accurate insurance information may result in the entire bill being categorized as a patient’s responsibility. 

Although we may estimate what your insurance company may pay, it is the insurance company that makes the final determination of your eligibility and benefits. If your insurance company is not contracted with us, you agree to pay any portion of the charges not covered by insurance, including but not limited to those charges above the usual and customary allowance. If we are out of network for your insurance company and your insurance pays you directly, you are responsible for payment and agree to forward the payment to us immediately. 
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Which plans do you contract with? </h2>
                <p className="mb-4">
                Cary Physicians Primary Care PLLC accepts most major insurance plans. However, with the frequent changes that happen in the insurance marketplace, it is a good idea for you to contact your insurance company prior to your appointment and verify if we are a participating provider as per your plan.                 </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if my plan does not contract with you?  </h2>
                <p className="mb-4">

                If we are not a provider under your insurance plan, you will be responsible for payment in full at the time of service. As a courtesy, however, we will file your initial insurance claim, and if not paid within 45 days, you will be responsible for the total bill. After your insurance company has processed your claims, any amount remaining as a credit balance will be refunded to you. 
              </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What is my financial responsibility for services?   </h2>
                <p className="mb-4">

                It is your responsibility to verify that the physicians and the practice where you are seeking treatment are listed as authorized providers under your insurance plan. Your employer or insurance company should be able to provide a current provider listing.   
              </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">If you have: </h2>
                <p className="mb-4">


                Workers’ Compensation
•	If we have verified the claim with your carrier: No payment is necessary at the time of the visit. 
•	If we are not able to verify your claim: Your appointment will need to be rescheduled. 

Our staff will schedule your appointment after your worker’s compensation carrier calls in advance to verify the accident date, claim number, primary care physician, employer information, and referral procedures. 






Workers’ Compensation (Out of State) and Occupational Injury
•	Payment in full is requested at the time of the visit. 	

Our staff will provide a receipt to file the claim with your carrier. 

The patient or the patient’s legal representative is ultimately responsible for all charges for services rendered. “Non-covered” means that a service will not be paid for under your insurance plan. If non-covered services are provided, you will be expected to pay for these services at the time they are provided or when you receive a statement or explanation of benefits (EOB) from your insurance provider denying payment. 

Your insurance company offers appeal procedures. We will not under any circumstances falsify or change a diagnosis or symptom to convince an insurer to pay for care that is not covered, nor do we delete or change the content in the record that may prevent services from being considered covered. We cannot offer services without expectation of payment, and if you receive non-covered services, you must agree to pay for these services if your insurance company does not. If you are unsure whether a service is covered by your plan, ultimately, it is your responsibility to call your insurance company to determine what your schedule of benefits allows, if a deductible applies, and your potential financial responsibility. 
              </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if I don’t have insurance?   </h2>
                <p className="mb-4">

                Self-pay accounts are used for patients without insurance coverage, patients covered by insurance plans which the office does not accept, or patients without an insurance card on file with us. Liability cases will also be considered self-pay accounts. We do not accept attorney letters or contingency payments. It is always the patient’s responsibility to know if our office is participating in their plan. If there is a discrepancy with our information, the patient will be considered self-pay unless otherwise proven. Self-pay patients will be required to pay in full for services rendered to them and will be asked to make payment arrangements prior to services being rendered. Emergency services provided to self-pay patients will be billed to the patient. 

At the sole discretion of the practice, extended payment arrangements may be made for patients. Please speak with our practice manager to discuss a mutually agreeable payment plan. It is never our intention to cause hardship to our patients, only to provide them with the best care possible and reasonable costs.
              </p>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">I received a bill even though I have secondary insurance.    </h2>
                <p className="mb-4">

                Having secondary insurance does not necessarily mean that your services are 100% covered. Secondary insurance policies typically pay according to a coordination of benefits with the primary insurance.               </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if I have billing or insurance questions?    </h2>
                <p className="mb-4">

                Cary Physicians Primary Care is supported by a staff of dedicated professionals. Our office staff can assist with most financial questions and help relieve the patient/caregiver of burdensome paperwork. Please ask if you have any questions about our fees, our policies, or your responsibilities.              </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you bill workers’ compensation?</h2>
                <p className="mb-4">

                We will bill workers’ compensation for verified claims. It is the patient’s responsibility to provide our office staff with employer authorization and contact information regarding a workers’ compensation claim. If the claim is denied by the workers’ compensation insurance carrier, it then becomes the patient’s responsibility. 

At your request, we will submit the claim to your primary medical insurance carrier with a copy of the workers’ compensation insurance denial. If your primary medical insurance carrier’s claim is denied, you will be responsible for payment in full.
</p>  </div> 

               <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">[For surgical specialties] What if I need surgery?    </h2>
                <p className="mb-4">

                If your physician recommends surgery, your surgery will be scheduled by your physician’s staff. The staff member can answer specific questions about the surgery scheduling process, discuss the paperwork and tests involved, and assist with completing all prior authorization your insurance company might require. 

                Our office will require a pre-surgical deposit equal to the amount of your copayment/deductible to go toward your surgery copayment, deductible, or any other amount your insurance carrier deems to be the patient’s responsibility. After your insurance company has processed your surgery claim, any amount remaining as a credit will be refunded to you. 

</p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">I received more than one bill for my surgery/procedure/service.    </h2>
                <p className="mb-4">

                Please note that Cary Physicians Primary Care only bills for services rendered by our clinical team during the procedure. The hospital or other providers may bill you for other services provided—which might include operating room costs, anesthesia costs, other doctor’s charges, etc. If you believe you have been accidentally billed twice for the same service, please get in touch with our office for clarification or resolution.              </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you bill other third parties?    </h2>
                <p className="mb-4">

                We do not bill third parties for services rendered to you. Our relationship is with you and not with the third-party liability insurer or policy carrier (eg, auto or homeowner). It is your responsibility to seek reimbursement from them. However, at your request, we will submit a claim to your primary health insurance carrier. You will be asked to pay in full for the services we provide you. All formalities required by your insurer and the third party should be promptly completed by you. If we receive a denial of your claim, you will be responsible for payment in full.               </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if my insurance pays late? What if my insurance pays late? </h2>
                <p className="mb-4">

                As a courtesy to you, we bill your insurance company for services on your behalf. If any insurance company fails to process payment for services within 45 days from the date of the claim submission, the total balance will be determined to be the patient’s responsibility.               </p>
              </div> <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Will I receive statements or bills?    </h2>
                <p className="mb-4">

                It is our office policy that all accounts with pending balances be sent two statements, each one month apart. If payment is not made on the account, a single phone call will be made to try and make payment arrangements. Accounts with unpaid balances for 90 calendar days or more will be sent to an external collection agency or attorney for collection. Unpaid bills can also lead to possible discharge from the practice. 

In the event an account is turned over for collections, the person financially responsible for the account will be responsible for the collections costs, including attorney fees and court costs. 

Regardless of any personal arrangements that a patient might have outside of our office if you are 18 years old or older and receiving treatment, you are ultimately responsible for payment of the service. Our office will not bill any other personal party.
              </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you refer unpaid bills to collection agencies?   </h2>
                <p className="mb-4">

                If a patient cannot pay the balance on their account according to the financial policy will be referred to an outside collection agency or an attorney for further action.               </p>
              </div>
              
              
               <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if my plan does not contract with you?  </h2>
                <p className="mb-4">

                If we are not a provider under your insurance plan, you will be responsible for payment in full at the time of service. As a courtesy, however, we will file your initial insurance claim, and if not paid within 45 days, you will be responsible for the total bill. After your insurance company has processed your claims, any amount remaining as a credit balance will be refunded to you. 
              </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if my child needs to see a physician?   </h2>
                <p className="mb-4">

                A parent or legal guardian must accompany patients who are minors on the patient’s first visit. This accompanying adult is responsible for payment of the account, according to the policy outlined on the previous pages.               </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you charge a penalty for returned payments?   </h2>
                <p className="mb-4">

                Any charges incurred by the practice collecting balances owed to us during the collection process may be charged to the patient. Returned checks, credit card chargebacks, or returned payments will attract a minimum $35 penalty in addition to the balance owed. Accounts with returned payments will be expected to make payments via cash, money order, or cashier’s checks only.               </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Can you waive my copay?  </h2>
                <p className="mb-4">

                We cannot waive deductibles, coinsurances, or copays that are required by your insurance. This is a violation of insurance rules.              </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">I have a hardship. How can you help me?   </h2>
                <p className="mb-4">

                Some patients may accrue large balances for services provided. At the sole discretion of the practice leadership, we will work with you to set up a mutually feasible payment plan. In some cases, if the minimum payment due cannot be paid, we will need proof of financial hardship. We may be forced to pursue collections of balances in the absence of tangible proof of hardship.               </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you charge for completing forms?   </h2>
                <p className="mb-4">

                Completing disability forms, FMLA forms, and other requested supplemental insurance forms requires time away from patient care and day-to-day business operations. A prepayment of $15.00 per form is required. Please understand that to complete forms, your medical record must be reviewed, forms completed and signed by the physician, and copied into your medical record. Some of these forms can be quite complicated and tedious to fill out. Please provide us with pertinent information, especially dates of disability and return to work. We request that you allow 5 business days for this process.               </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Do you charge for copies of medical records?  </h2>
                <p className="mb-4">

                Patients requesting copies of their medical records will not be charged a fee. 

Attorneys and Insurance companies requesting medical records will be charged a $15 fee plus postage and these fees: 
•	$0.25 per page – under 100 pages 
•	$0.10 per page – over 100 pages 
•	$15 for an itemized bill 
Expedited requests will be charged a special handling fee. 
Records requested via electronic media (flash drives, CDs, DVDs, etc.) will be charged an additional $10 device fee.
              </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">What if I missed my appointment to see the physician?  </h2>
                <p className="mb-4">

                We understand that on rare occasions, issues may arise, causing you to miss your appointment when you cannot notify our office before your appointment. Should you experience any unforeseen circumstance that causes you to miss your appointment, please call our office at least 24 hours prior to having it rescheduled. 

Our highly skilled physicians are committed to your well-being and have reserved time just for you. Patients who miss more than one appointment without notifying our office 24 hours before the appointment time are subject to a $20 missed appointment fee billed to the patient. 


              </p>
              </div>

             




              
            </div>

            <p className="mt-8 mb-6">
              I have read, understand, and agree to the above Financial Policy. I
              understand my financial responsibility to make payments for services
              provided to me and the courtesy extended by <strong>Cary Physicians Primary
              Care</strong> to simplify insurance reimbursement for the services provided to
              me. I acknowledge that these policies do not obligate <strong>Cary Physicians
              Primary Care</strong> to extend credit to me for services provided.
            </p>

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