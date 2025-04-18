import { useState } from 'react';

export default function FinancialPolicyForm() {
  const [signatureDate, setSignatureDate] = useState("");
  const [signatureName, setSignatureName] = useState("");
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <img src="/api/placeholder/200/80" alt="Cary Physicians Primary Care PLLC Logo" className="h-16" />
        <div className="text-right">
          <h1 className="text-2xl font-bold text-blue-800">Cary Physicians Primary Care PLLC</h1>
          <p className="text-sm text-gray-600">1234 Medical Drive, Cary, NC 27513</p>
          <p className="text-sm text-gray-600">Phone: (919) 555-1234</p>
        </div>
      </div>

      {/* Document title */}
      <h2 className="text-xl font-bold text-center mb-6">Practice Financial Policy</h2>

      {/* Introduction */}
      <p className="mb-4">
        Thank you for choosing <strong>Cary Physicians Primary Care PLLC</strong> as your
        healthcare provider. We are committed to building a successful
        physician-patient relationship, and the success of your medical
        treatment and care. Your understanding of our Practice Financial Policy
        and payment for services are important parts of this relationship. For
        your convenience, this document discusses a few commonly asked financial
        policy questions. If you need further information or assistance about
        any of these policies, please ask to speak with our Practice Manager.
      </p>

      {/* Payment section */}
      <h3 className="text-lg font-bold mt-6 mb-2">When are payments due?</h3>
      <p className="mb-4">
        All copayments, deductibles, patient responsibility amounts, and
        past-due balances are due at the time of check-in unless previous
        arrangements have been made with our billing coordinator.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">How may I pay?</h3>
      <p className="mb-4">
        We accept payment by cash, check, VISA, and MasterCard. We will only
        accept post-dated checks when they are provided within an approved
        payment plan.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Do I need a referral or pre-authorization?</h3>
      <p className="mb-4">
        If your insurance plan requires a referral authorization from your
        primary care physician or a pre-authorization from your insurance, you
        will need to contact your primary care physician or insurance company to
        be sure it has been obtained. If we have yet to receive authorization
        prior to your appointment time, we will reschedule. Failure to obtain
        the referral or preauthorization may result in a lower or no payment
        from the insurance company, and the balance will become the patient's
        responsibility.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Will you bill my insurance?</h3>
      <p className="mb-4">
        Insurance is a contract between you and your insurance company. In most
        cases, we are not a party to this contract. We will bill your primary
        insurance company on your behalf as a courtesy to you. To properly bill
        your insurance company, we require that you disclose all insurance
        information, including primary and secondary insurance, as well as any
        change of insurance information.
      </p>
      <p className="mb-4">
        It is your responsibility to notify our office promptly of any patient
        information changes (ie, address, name, insurance information) to
        facilitate appropriate billing for the services rendered to you. Failure
        to provide complete and accurate insurance information may result in the
        entire bill being categorized as a patient's responsibility.
      </p>
      <p className="mb-4">
        Although we may estimate what your insurance company may pay, it is the
        insurance company that makes the final determination of your eligibility
        and benefits. If your insurance company is not contracted with us, you
        agree to pay any portion of the charges not covered by insurance,
        including but not limited to those charges above the usual and customary
        allowance. If we are out of network for your insurance company and your
        insurance pays you directly, you are responsible for payment and agree
        to forward the payment to us immediately.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Which plans do you contract with?</h3>
      <p className="mb-4">
        <strong>Cary Physicians Primary Care PLLC</strong> accepts most major insurance
        plans. However, with the frequent changes that happen in the insurance
        marketplace, it is a good idea for you to contact your insurance company
        prior to your appointment and verify if we are a participating provider
        as per your plan.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">What if my plan does not contract with you?</h3>
      <p className="mb-4">
        If we are not a provider under your insurance plan, you will be
        responsible for payment in full at the time of service. As a courtesy,
        however, we will file your initial insurance claim, and if not paid
        within 45 days, you will be responsible for the total bill. After your
        insurance company has processed your claims, any amount remaining as a
        credit balance will be refunded to you.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">What is my financial responsibility for services?</h3>
      <p className="mb-4">
        It is your responsibility to verify that the physicians and the practice
        where you are seeking treatment are listed as authorized providers under
        your insurance plan. Your employer or insurance company should be able
        to provide a current provider listing.
      </p>

      <p className="font-bold mb-2">If you have:</p>
      <p className="underline mb-2">Workers' Compensation</p>
      <ul className="list-disc ml-8 mb-4">
        <li className="mb-1">
          <em>If we have verified the claim with your carrier</em>: No payment is
          necessary at the time of the visit.
        </li>
        <li className="mb-1">
          <em>If we are not able to verify your claim</em>: Your appointment will
          need to be rescheduled.
        </li>
      </ul>
      <p className="mb-4">
        Our staff will schedule your appointment after your worker's
        compensation carrier calls in advance to verify the accident date, claim
        number, primary care physician, employer information, and referral
        procedures.
      </p>

      <p className="underline mb-2">Workers' Compensation (Out of State) and Occupational Injury</p>
      <ul className="list-disc ml-8 mb-4">
        <li className="mb-1">
          Payment in full is requested at the time of the visit.
        </li>
      </ul>
      <p className="mb-4">
        Our staff will provide a receipt to file the claim with your carrier.
      </p>

      <p className="mb-4">
        The patient or the patient's legal representative is ultimately
        responsible for all charges for services rendered. "Non-covered" means
        that a service will not be paid for under your insurance plan. If
        non-covered services are provided, you will be expected to pay for these
        services at the time they are provided or when you receive a statement
        or explanation of benefits (EOB) from your insurance provider denying
        payment.
      </p>

      <p className="mb-4">
        Your insurance company offers appeal procedures. We will not under any
        circumstances falsify or change a diagnosis or symptom to convince an
        insurer to pay for care that is not covered, nor do we delete or change
        the content in the record that may prevent services from being
        considered covered. We cannot offer services without expectation of
        payment, and if you receive non-covered services, you must agree to pay
        for these services if your insurance company does not. If you are unsure
        whether a service is covered by your plan, ultimately, it is your
        responsibility to call your insurance company to determine what your
        schedule of benefits allows, if a deductible applies, and your potential
        financial responsibility.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">What if I don't have insurance?</h3>
      <p className="mb-4">
        Self-pay accounts are used for patients without insurance coverage,
        patients covered by insurance plans which the office does not accept, or
        patients without an insurance card on file with us. Liability cases will
        also be considered self-pay accounts. We do not accept attorney letters
        or contingency payments. It is always the patient's responsibility to
        know if our office is participating in their plan. If there is a
        discrepancy with our information, the patient will be considered
        self-pay unless otherwise proven. Self-pay patients will be required to
        pay in full for services rendered to them and will be asked to make
        payment arrangements prior to services being rendered. Emergency
        services provided to self-pay patients will be billed to the patient.
      </p>
      <p className="mb-4">
        At the sole discretion of the practice, extended payment arrangements
        may be made for patients. Please speak with our practice manager to
        discuss a mutually agreeable payment plan. It is never our intention to
        cause hardship to our patients, only to provide them with the best care
        possible and reasonable costs.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">I received a bill even though I have secondary insurance.</h3>
      <p className="mb-4">
        Having secondary insurance does not necessarily mean that your services
        are 100% covered. Secondary insurance policies typically pay according
        to a coordination of benefits with the primary insurance.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">What if I have billing or insurance questions?</h3>
      <p className="mb-4">
        <strong>Cary Physicians Primary Care</strong> is supported by a staff of dedicated
        professionals. Our office staff can assist with most financial questions
        and help relieve the patient/caregiver of burdensome paperwork. Please
        ask if you have any questions about our fees, our policies, or your
        responsibilities.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Do you bill workers' compensation?</h3>
      <p className="mb-4">
        We will bill workers' compensation for verified claims. It is the
        patient's responsibility to provide our office staff with employer
        authorization and contact information regarding a workers' compensation
        claim. If the claim is denied by the workers' compensation insurance
        carrier, it then becomes the patient's responsibility.
      </p>
      <p className="mb-4">
        At your request, we will submit the claim to your primary medical
        insurance carrier with a copy of the workers' compensation insurance
        denial. If your primary medical insurance carrier's claim is denied, you
        will be responsible for payment in full.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">What if I need surgery?</h3>
      <p className="mb-4">
        If your physician recommends surgery, your surgery will be scheduled by
        your physician's staff. The staff member can answer specific questions
        about the surgery scheduling process, discuss the paperwork and tests
        involved, and assist with completing all prior authorization your
        insurance company might require.
      </p>
      <p className="mb-4">
        Our office will require a pre-surgical deposit equal to the amount of
        your copayment/deductible to go toward your surgery copayment,
        deductible, or any other amount your insurance carrier deems to be the
        patient's responsibility. After your insurance company has processed
        your surgery claim, any amount remaining as a credit will be refunded to
        you.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">I received more than one bill for my surgery/procedure/service.</h3>
      <p className="mb-4">
        Please note that <strong>Cary Physicians Primary Care</strong> only bills for
        services rendered by our clinical team during the procedure. The
        hospital or other providers may bill you for other services
        provided—which might include operating room costs, anesthesia costs,
        other doctor's charges, etc. If you believe you have been accidentally
        billed twice for the same service, please get in touch with our office
        for clarification or resolution.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Do you bill other third parties?</h3>
      <p className="mb-4">
        We do not bill third parties for services rendered to you. Our
        relationship is with you and not with the third-party liability insurer
        or policy carrier (eg, auto or homeowner). It is your responsibility to
        seek reimbursement from them. However, at your request, we will submit a
        claim to your primary health insurance carrier. You will be asked to pay
        in full for the services we provide you. All formalities required by
        your insurer and the third party should be promptly completed by you. If
        we receive a denial of your claim, you will be responsible for payment
        in full.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">What if my insurance pays late?</h3>
      <p className="mb-4">
        As a courtesy to you, we bill your insurance company for services on
        your behalf. If any insurance company fails to process payment for
        services within 45 days from the date of the claim submission, the total
        balance will be determined to be the patient's responsibility.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Will I receive statements or bills?</h3>
      <p className="mb-4">
        It is our office policy that all accounts with pending balances be sent
        two statements, each one month apart. If payment is not made on the
        account, a single phone call will be made to try and make payment
        arrangements. Accounts with unpaid balances for 90 calendar days or more
        will be sent to an external collection agency or attorney for
        collection. Unpaid bills can also lead to possible discharge from the
        practice.
      </p>
      <p className="mb-4">
        In the event an account is turned over for collections, the person
        financially responsible for the account will be responsible for the
        collections costs, including attorney fees and court costs.
      </p>
      <p className="mb-4">
        Regardless of any personal arrangements that a patient might have
        outside of our office if you are 18 years old or older and receiving
        treatment, you are ultimately responsible for payment of the service.
        Our office will not bill any other personal party.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Do you refer unpaid bills to collection agencies?</h3>
      <p className="mb-4">
        If a patient cannot pay the balance on their account according to the
        financial policy will be referred to an outside collection agency or an
        attorney for further action.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">What if my child needs to see a physician?</h3>
      <p className="mb-4">
        A parent or legal guardian must accompany patients who are minors on the
        patient's first visit. This accompanying adult is responsible for
        payment of the account, according to the policy outlined on the previous
        pages.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Do you charge a penalty for returned payments?</h3>
      <p className="mb-4">
        Any charges incurred by the practice collecting balances owed to us
        during the collection process may be charged to the patient. Returned
        checks, credit card chargebacks, or returned payments will attract a
        minimum $35 penalty in addition to the balance owed. Accounts with
        returned payments will be expected to make payments via cash, money
        order, or cashier's checks only.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Can you waive my copay?</h3>
      <p className="mb-4">
        We cannot waive deductibles, coinsurances, or copays that are required
        by your insurance. This is a violation of insurance rules.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">I have a hardship. How can you help me?</h3>
      <p className="mb-4">
        Some patients may accrue large balances for services provided. At the
        sole discretion of the practice leadership, we will work with you to set
        up a mutually feasible payment plan. In some cases, if the minimum
        payment due cannot be paid, we will need proof of financial hardship. We
        may be forced to pursue collections of balances in the absence of
        tangible proof of hardship.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Do you charge for completing forms?</h3>
      <p className="mb-4">
        Completing disability forms, FMLA forms, and other requested
        supplemental insurance forms requires time away from patient care and
        day-to-day business operations. A prepayment of $15.00 per form is
        required. Please understand that to complete forms, your medical record
        must be reviewed, forms completed and signed by the physician, and
        copied into your medical record. Some of these forms can be quite
        complicated and tedious to fill out. Please provide us with pertinent
        information, especially dates of disability and return to work. We
        request that you allow 5 business days for this process.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">Do you charge for copies of medical records?</h3>
      <p className="mb-4">
        Patients requesting copies of their medical records will not be charged
        a fee.
      </p>
      <p className="mb-4">
        Attorneys and Insurance companies requesting medical records will be
        charged a $15 fee plus postage and these fees:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li className="mb-1">$0.25 per page — under 100 pages</li>
        <li className="mb-1">$0.10 per page — over 100 pages</li>
        <li className="mb-1">$15 for an itemized bill</li>
      </ul>
      <p className="mb-4">
        Expedited requests will be charged a special handling fee.
      </p>
      <p className="mb-4">
        Records requested via electronic media (flash drives, CDs, DVDs, etc.)
        will be charged an additional $10 device fee.
      </p>

      <h3 className="text-lg font-bold mt-6 mb-2">What if I missed my appointment to see the physician?</h3>
      <p className="mb-4">
        We understand that on rare occasions, issues may arise, causing you to
        miss your appointment when you cannot notify our office before your
        appointment. Should you experience any unforeseen circumstance that
        causes you to miss your appointment, please call our office at least 24
        hours prior to having it rescheduled.
      </p>
      <p className="mb-4">
        Our highly skilled physicians are committed to your well-being and have
        reserved time just for you. Patients who miss more than one appointment
        without notifying our office 24 hours before the appointment time are
        subject to a $20 missed appointment fee billed to the patient.
      </p>

      <p className="mt-8 mb-6">
        I have read, understand, and agree to the above Financial Policy. I
        understand my financial responsibility to make payments for services
        provided to me and the courtesy extended by <strong>Cary Physicians Primary
        Care</strong> to simplify insurance reimbursement for the services provided to
        me. I acknowledge that these policies do not obligate <strong>Cary Physicians
        Primary Care</strong> to extend credit to me for services provided.
      </p>

      {/* Signature section */}
      <div className="mt-8 border-t pt-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-2">Patient or authorized representative signature:</label>
            <div className="border-b border-black h-8"></div>
          </div>
          <div>
            <label className="block font-bold mb-2">Date:</label>
            <input 
              type="date" 
              className="border border-gray-300 p-2 w-full" 
              value={signatureDate}
              onChange={(e) => setSignatureDate(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block font-bold mb-2">Patient or authorized representative name:</label>
          <input 
            type="text" 
            className="border border-gray-300 p-2 w-full" 
            value={signatureName}
            onChange={(e) => setSignatureName(e.target.value)}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-sm text-center text-gray-500">
        <p>© {new Date().getFullYear()} Cary Physicians Primary Care PLLC. All rights reserved.</p>
      </div>
    </div>
  );
}