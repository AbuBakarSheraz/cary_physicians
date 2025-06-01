import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const UploadID = () => {
  const webcamRef = useRef(null);
  const [patientName, setPatientName] = useState("");
  const [currentStep, setCurrentStep] = useState("name"); // name, front, back, review, submit
  
  // Front side states
  const [frontCaptured, setFrontCaptured] = useState(null);
  const [frontUploaded, setFrontUploaded] = useState(null);
  const [frontFile, setFrontFile] = useState(null);
  
  // Back side states
  const [backCaptured, setBackCaptured] = useState(null);
  const [backUploaded, setBackUploaded] = useState(null);
  const [backFile, setBackFile] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

// REPLACE your sendImagesToBackend function with this:

const sendImagesToBackend = () => {
  const formData = new FormData();
  formData.append("patient_name", patientName.trim());
  formData.append("front_image", frontFile); // Changed from "fi_path"
  formData.append("back_image", backFile);   // Changed from "fi_path"

  setIsSubmitting(true);
  setSubmitSuccess(false);

  fetch("https://www.caryphysicians.com/api/iduploads/upload_id.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        console.log("Upload success:", data);
        setSubmitSuccess(true);
        setTimeout(() => {
          handleCompleteReset();
        }, 3000);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    })
    .catch((err) => {
      console.error("Upload failed:", err);
      alert(`Upload failed: ${err.message}. Please try again or contact our staff for assistance.`);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};

  const handleNameSubmit = () => {
    if (!patientName.trim()) {
      alert("Please enter your full name to continue.");
      return;
    }
    setCurrentStep("front");
  };

  const handleCapture = (side) => {
    const imageSrc = webcamRef.current.getScreenshot();
    const file = dataURLtoFile(imageSrc, `${patientName.replace(/\s+/g, '_')}_${side}.jpg`);
    
    if (side === "front") {
      setFrontCaptured(imageSrc);
      setFrontUploaded(null);
      setFrontFile(file);
    } else {
      setBackCaptured(imageSrc);
      setBackUploaded(null);
      setBackFile(file);
    }
  };

  const handleGalleryUpload = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      
      if (side === "front") {
        setFrontUploaded(imageUrl);
        setFrontCaptured(null);
        setFrontFile(file);
      } else {
        setBackUploaded(imageUrl);
        setBackCaptured(null);
        setBackFile(file);
      }
    }
  };

  const handleContinueToBack = () => {
    if (!frontFile) {
      alert("Please capture or upload the front of your ID first.");
      return;
    }
    setCurrentStep("back");
  };

  const handleReviewImages = () => {
    if (!backFile) {
      alert("Please capture or upload the back of your ID first.");
      return;
    }
    setCurrentStep("review");
  };

  const handleRetake = (side) => {
    if (side === "front") {
      setFrontCaptured(null);
      setFrontUploaded(null);
      setFrontFile(null);
    } else {
      setBackCaptured(null);
      setBackUploaded(null);
      setBackFile(null);
    }
  };

  const handleCompleteReset = () => {
    setPatientName("");
    setCurrentStep("name");
    setFrontCaptured(null);
    setFrontUploaded(null);
    setFrontFile(null);
    setBackCaptured(null);
    setBackUploaded(null);
    setBackFile(null);
    setSubmitSuccess(false);
    setIsSubmitting(false);
  };

  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        {["name", "front", "back", "review"].map((step, index) => (
          <React.Fragment key={step}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-semibold ${
              currentStep === step 
                ? 'bg-blue-600 text-white border-blue-600' 
                : ['name', 'front', 'back'].indexOf(currentStep) > index
                ? 'bg-green-500 text-white border-green-500'
                : 'bg-gray-200 text-gray-600 border-gray-300'
            }`}>
              {['name', 'front', 'back'].indexOf(currentStep) > index ? '✓' : index + 1}
            </div>
            {index < 3 && <div className={`w-8 h-1 ${
              ['name', 'front', 'back'].indexOf(currentStep) > index ? 'bg-green-500' : 'bg-gray-300'
            }`} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Your ID has been uploaded successfully. Our staff will review it shortly.
          </p>
          <button
            onClick={handleCompleteReset}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors text-lg"
          >
            Upload Another ID
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">ID Upload</h1>
            <p className="text-lg text-gray-600">Please follow the simple steps below</p>
          </div>

          <StepIndicator />

          {/* Step 1: Name Input */}
          {currentStep === "name" && (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter Your Name</h2>
              <p className="text-gray-600 mb-6">Please enter your full name as it appears on your ID</p>
              
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                />
                <button
                  onClick={handleNameSubmit}
                  disabled={!patientName.trim()}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
                >
                  Continue to ID Upload
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Front ID */}
          {currentStep === "front" && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-2 3h.01"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Front Side of Your ID</h2>
                <p className="text-gray-600">Take a clear photo of the front of your ID card or driver's license</p>
              </div>

              {!frontCaptured && !frontUploaded && (
                <div className="mb-6">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }}
                    className="rounded-xl shadow-lg w-full max-h-80 object-cover"
                  />
                </div>
              )}

              {(frontCaptured || frontUploaded) && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Front of ID:</p>
                  <img 
                    src={frontCaptured || frontUploaded} 
                    alt="Front of ID" 
                    className="w-full rounded-xl border-2 border-gray-200 shadow-lg max-h-80 object-cover" 
                  />
                </div>
              )}

              <div className="flex flex-col gap-4">
                {!frontCaptured && !frontUploaded && (
                  <button
                    onClick={() => handleCapture("front")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Take Photo
                  </button>
                )}

                <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg cursor-pointer flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Upload from Gallery
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleGalleryUpload(e, "front")}
                    className="hidden"
                  />
                </label>

                {(frontCaptured || frontUploaded) && (
                  <>
                    <button
                      onClick={() => handleRetake("front")}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      Retake Photo
                    </button>
                    
                    <button
                      onClick={handleContinueToBack}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
                    >
                      Continue to Back Side
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Back ID */}
          {currentStep === "back" && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-2 3h.01"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Back Side of Your ID</h2>
                <p className="text-gray-600">Now take a clear photo of the back of your ID card</p>
              </div>

              {!backCaptured && !backUploaded && (
                <div className="mb-6">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }}
                    className="rounded-xl shadow-lg w-full max-h-80 object-cover"
                  />
                </div>
              )}

              {(backCaptured || backUploaded) && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Back of ID:</p>
                  <img 
                    src={backCaptured || backUploaded} 
                    alt="Back of ID" 
                    className="w-full rounded-xl border-2 border-gray-200 shadow-lg max-h-80 object-cover" 
                  />
                </div>
              )}

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setCurrentStep("front")}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back to Front Side
                </button>

                {!backCaptured && !backUploaded && (
                  <button
                    onClick={() => handleCapture("back")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Take Photo
                  </button>
                )}

                <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg cursor-pointer flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  Upload from Gallery
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleGalleryUpload(e, "back")}
                    className="hidden"
                  />
                </label>

                {(backCaptured || backUploaded) && (
                  <>
                    <button
                      onClick={() => handleRetake("back")}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                      </svg>
                      Retake Photo
                    </button>
                    
                    <button
                      onClick={handleReviewImages}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
                    >
                      Review & Submit
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === "review" && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Information</h2>
                <p className="text-gray-600">Please review all information before submitting</p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="font-semibold text-gray-700 mb-2">Patient Name:</p>
                  <p className="text-lg text-gray-800">{patientName}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-gray-700 mb-3">Front of ID:</p>
                    <img 
                      src={frontCaptured || frontUploaded} 
                      alt="Front of ID" 
                      className="w-full rounded-xl border-2 border-gray-200 shadow-lg" 
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-3">Back of ID:</p>
                    <img 
                      src={backCaptured || backUploaded} 
                      alt="Back of ID" 
                      className="w-full rounded-xl border-2 border-gray-200 shadow-lg" 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setCurrentStep("back")}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Go Back to Edit
                  </button>

                  <button
                    onClick={sendImagesToBackend}
                    disabled={isSubmitting}
                    className={`font-semibold py-4 px-6 rounded-xl transition-colors text-lg flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Submit ID Documents
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Need Help?
          </h3>
          <div className="text-gray-600 space-y-2">
            <p>• Make sure your ID is well-lit and all text is clearly visible</p>
            <p>• Hold your phone steady when taking photos</p>
            <p>• If you need assistance, please ask our front desk staff</p>
            <p>• Contact us at: <span className="font-medium text-blue-600">919 230 7439</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadID;