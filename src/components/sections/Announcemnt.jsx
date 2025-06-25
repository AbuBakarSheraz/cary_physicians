import React, { useEffect, useState } from 'react';

function Announcement() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('announcementShown');

    if (!status) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        localStorage.setItem('announcementShown', 'true');
      }, 4000); // Show for 4 seconds
    }
  }, []);

  return (
    <>
      {showPopup && (
         <div className="fixed inset-0 bg-none bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-[90%] text-center">
            <h1 className="text-2xl font-bold mb-2 text-blue-600">📢 Announcement</h1>
            <h2 className="text-lg font-semibold mb-1 text-gray-800">
              Office timings from 26 June to 7 July:
            </h2>
            <p className="text-gray-700">🗓️ Monday to Friday: <strong>9:00 AM – 12:00 PM</strong></p>
            <p className="text-gray-700">🚫 Closed on Saturday & Sunday</p>
            <p className="mt-3 text-green-700 font-medium">Thanks for your cooperation!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Announcement;
