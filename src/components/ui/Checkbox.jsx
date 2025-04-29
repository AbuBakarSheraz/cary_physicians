import React from "react";

export function Checkbox({ id, name, checked, onCheckedChange, className = "" }) {
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${className}`}
    />
  );
}
