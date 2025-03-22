import React from "react";

const Heading = ({ level = "h1", children, className = "" }) => {
  const Tag = level; // Dynamically set the heading tag

  const baseStyles = "font-bold tracking-wide";
  const sizes = {
    h1: "text-3xl md:text-4xl",
    h2: "text-2xl md:text-3xl",
    h3: "text-xl md:text-2xl",
  };

  return <Tag className={`${baseStyles} ${sizes[level]} ${className}`}>{children}</Tag>;
};

export default Heading;


// import Heading from "./Heading";

// export default function App() {
//   return (
//     <div className="p-6">
//       <Heading level="h1" className="text-blue-600">
//         This is an H1 Heading
//       </Heading>

//       <Heading level="h2" className="text-gray-700">
//         This is an H2 Heading
//       </Heading>

//       <Heading level="h3" className="text-red-500">
//         This is an H3 Heading
//       </Heading>
//     </div>
//   );
// }
