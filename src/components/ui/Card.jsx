import React from "react";

const Card = ({ title, description, children, className = "" }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  );
};

export default Card;



// import Card from "./Card";

// export default function App() {
//   return (
//     <div className="p-6 space-y-4">
//       <Card title="Card Title" description="This is a simple card.">
//         <Button variant="primary">Learn More</Button>
//       </Card>

//       <Card title="Another Card" description="With some additional text.">
//         <Button variant="secondary">Click Me</Button>
//       </Card>
//     </div>
//   );
// }
