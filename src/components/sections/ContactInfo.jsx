import React from "react";
'use server';

import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Linkedin } from 'lucide-react';




const ContactInfo = () => {
  return (
    <div className="h-full">
      <div className="bg-emerald-400 shadow-lg rounded-lg overflow-hidden h-full">
        {/* Google Map */}
        <div className="w-full h-64 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.718179989672!2d-78.76881132436219!3d35.745623472566606!2m3!1f0!2f0!3f0!3m2!1i1024!1i768!4f13.1!3m3!1m2!1s0x89acf3489455e797%3A0x2b1c65e21189b160!2s115%20Parkway%20Office%20Ct%20Suite%20104%2C%20Cary%2C%20NC%2027518%2C%20USA!5e1!3m2!1sen!2sin!4v1738675828174!5m2!1sen!2sin"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            title="Cary Physicians Location"
          ></iframe>
        </div>

        {/* Contact Information */}
        <div className="p-6 text-white">
          <h3 className="text-xl font-bold mb-1">Cary Physicians Primary Care, PLLC</h3>
          <p className="italic text-emerald-100 mb-4">Compassionate Care, Exceptional Results</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Address:</h4>
              <p>115 Parkway Office Ct, Suite 104, Cary NC, 27518</p>
            </div>

            <div>
              <h4 className="font-semibold">Phone:</h4>
              <p>
                <a className="hover:underline" href="tel:9192307439">
                  (919) 230-7439
                </a>
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Fax:</h4>
              <p>
                <a className="hover:underline" href="fax:1 919 912 5442">
                1 919 912 5442
                </a>
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Email:</h4>
              <p>
                <a className="hover:underline" href="mailto:office@caryphysicians.com">
                  office@caryphysicians.com
                </a>
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="mt-6">
            <h4 className="text-lg font-bold border-b border-emerald-400 pb-2 mb-2">
              Office Hours
            </h4>
            <table className="w-full text-sm">
              <tbody>
                {[
                  { day: "Monday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Friday", hours: "9:00 AM - 5:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 2:00 PM", special: true },
                  { day: "Sunday", hours: "Closed", special: true }
                ].map(({ day, hours, special }) => (
                  <tr key={day}>
                    <td className="py-1 pr-4 font-medium">{day}</td>
                    <td className={special ? "py-1 text-red-200 font-medium" : "py-1"}>
                      {hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Social Media Links */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Connect with Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61568347179500"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 rounded-full p-2 inline-flex items-center justify-center hover:bg-blue-100 transition-colors"
                aria-label="Facebook"
              >
               <Facebook />
              </a>
              <a
                href="https://www.instagram.com/cary_physicians?igsh=YzljYTk1ODg3Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-pink-600 rounded-full p-2 inline-flex items-center justify-center hover:bg-pink-100 transition-colors"
                aria-label="Instagram"
              >
              <Instagram />
              </a>
              <a
                href="https://www.instagram.com/cary_physicians?igsh=YzljYTk1ODg3Zg=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-500 rounded-full p-2 inline-flex items-center justify-center hover:bg-pink-100 transition-colors"
                aria-label="Instagram"
              >
               <Linkedin />
               </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;