import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';

function Options() {
  const formOptions = [
    {
      title: "Notice For Privacy Practices",
      instruction: "Click to Read Read Carefully",
      path: "/privacy_policy"
    },
    // {
    //   title: "Basic Information",
    //   instruction: "Fill The Form",
    //   path: "/"
    // },
    // {
    //   title: "Practice Financial Policy",
    //   instruction: "Fill The Form",
    //   path: "/practice_financial_policy"
    // },
    {
      title: "Release of medical Record",
      instruction: "Fill The Form",
      path: "/Release_Medical_Record"
    },
    {
      title: "Permission for Telehealth Visits",
      instruction: "Read Carefully and Fill Form",
      path: "/Telehealth_consent"
    },

    // {
    //   title: "Benefits Assignment and Financial Responsibility",
    //   instruction: "Fill The Form",
    //   path: " "
    // },
    // {
    //   title: "Acknowledgment of Receipt of Notice of Privacy Practices",
    //   instruction: "Fill The Form",
    //   path: "/"
    // },
    // {
    //   title: "Advance Beneficiary Notice for Medicare Patients",
    //   instruction: "Fill The Form",
    //   path: "/Advance_Beneficiary_Notice"
    // }
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Read Carefully and Fill The Forms
        </h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {formOptions.map((option, index) => (
            <Link 
              key={index} 
              to={option.path}
              className={`block hover:bg-blue-50 transition-colors duration-200 ${
                index !== formOptions.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className="p-4 md:p-5 flex items-center justify-between">
                <div className="flex items-start md:items-center gap-3 md:gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg mt-1 md:mt-0">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 md:text-lg">{option.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{option.instruction}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Options;