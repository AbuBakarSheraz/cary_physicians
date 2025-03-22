import React, { useState } from 'react';
import p1 from '../../assets/images/our-photos/practice1.webp';
import p2 from '../../assets/images/our-photos/practice2.webp';
import p3 from '../../assets/images/our-photos/practice3.webp';
import p4 from '../../assets/images/our-photos/practice4.webp';
import p5 from '../../assets/images/our-photos/practice5.webp';
import p6 from '../../assets/images/our-photos/practice6.webp';

function Gallery() {
  // All images in a flat array
  const allImages = [p1, p2, p3, p4, p5, p6];
  
  // Group images into pairs for larger screens
  const imageGroups = [
    [p1, p2],
    [p3, p4],
    [p5, p6]
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const next = () => {
    setCurrentIndex((prev) => {
      // On small screens, navigate through all images
      if (window.innerWidth < 640) {
        return (prev + 1) % allImages.length;
      }
      // On larger screens, navigate through pairs
      return (prev + 1) % imageGroups.length;
    });
  };
  
  const prev = () => {
    setCurrentIndex((prev) => {
      // On small screens, navigate through all images
      if (window.innerWidth < 640) {
        return (prev - 1 + allImages.length) % allImages.length;
      }
      // On larger screens, navigate through pairs
      return (prev - 1 + imageGroups.length) % imageGroups.length;
    });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto my-8 overflow-hidden rounded-lg shadow-">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
          Step Inside <strong className='text-emerald-400'>Cary Physicians</strong></h1>
      {/* Mobile view (single image) */}
      <div className="relative h-70 overflow-hidden sm:hidden">
        {allImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex ? 'translate-x-0' : 
              index < currentIndex ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="w-full p-1">
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105" 
              />
            </div>
          </div>
        ))}
        
        {/* Mobile navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Desktop view (image pairs) */}
      <div className="relative h-70 overflow-hidden hidden sm:block">
        {imageGroups.map((group, index) => (
          <div
            key={index}
            className={`flex absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentIndex ? 'translate-x-0' : 
              index < currentIndex ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className="w-1/2 p-1">
              <img 
                src={group[0]} 
                alt={`Gallery image ${index * 2 + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105" 
              />
            </div>
            <div className="w-1/2 p-1">
              <img 
                src={group[1]} 
                alt={`Gallery image ${index * 2 + 2}`}
                className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105" 
              />
            </div>
          </div>
        ))}
        
        {/* Desktop navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {imageGroups.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-gray-400 bg-opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation buttons for both views */}
      <button
        className="absolute top-[60%] left-3 transform -translate-y-1/2 bg-white bg-opacity-50  w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-opacity-75 focus:outline-none"
        onClick={prev}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" className='text-emerald-400' />
        </svg>
      </button>
      <button
        className="absolute top-[60%] right-3 transform -translate-y-1/2 bg-white bg-opacity-50  w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-opacity-75 focus:outline-none"
        onClick={next}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" className='text-emerald-400' />
        </svg>
      </button>
    </div>
  );
}

export default Gallery;