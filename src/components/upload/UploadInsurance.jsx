import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const UploadInsurance = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setUploadedImage(null); // Clear gallery image if any
    sendImageToBackend(imageSrc, true); // true for base64
  };

  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setCapturedImage(null); // Clear camera image if any
        sendImageToBackend(reader.result, true); // true for base64
      };
      reader.readAsDataURL(file);
    }
  };

  const sendImageToBackend = (imageData, isBase64) => {
    fetch("http://your-server/upload.php", {
      method: "POST",
      body: JSON.stringify({ image: imageData }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("Upload success:", data))
      .catch((err) => console.error("Upload failed:", err));
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Upload Your Insurance Card</h2>

      {/* Webcam Preview (opens automatically) */}
      {!capturedImage && !uploadedImage && (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "environment" }}
          className="rounded shadow-md w-64"
        />
      )}

      {/* Display Captured Image */}
      {capturedImage && (
        <img src={capturedImage} alt="Captured" className="w-64 rounded" />
      )}

      {/* Display Uploaded Image */}
      {uploadedImage && (
        <img src={uploadedImage} alt="Uploaded" className="w-64 rounded" />
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        {!capturedImage && !uploadedImage && (
          <button
            onClick={handleCapture}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Capture Photo
          </button>
        )}

        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload from Gallery
          <input
            type="file"
            accept="image/*"
            onChange={handleGalleryUpload}
            style={{ display: "none" }}
          />
        </label>

        {(capturedImage || uploadedImage) && (
          <button
            onClick={() => {
              setCapturedImage(null);
              setUploadedImage(null);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Retake / Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadInsurance;
