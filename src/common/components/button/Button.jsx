import React from "react";

const Button = ({ children, onClick, disabled, color }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` p-2 px-3 text-white text-sm font-semibold md:rounded-md rounded-full ${
        !disabled
          ? `shadow-md hover:shadow-gray-500 ${
              color ? `bg-${color}-500` : "bg-primary"
            }`
          : "bg-gray-400"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
