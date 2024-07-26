import React from "react";

const Button = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={` p-2 px-3 text-white text-sm font-semibold lg:rounded-md rounded-full ${
        !disabled ? "shadow-md hover:shadow-gray-500 bg-primary" : "bg-gray-400"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
