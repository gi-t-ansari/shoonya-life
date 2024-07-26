import React from "react";

const Chip = ({ name }) => {
  return (
    <span className="text-xs py-1 px-2 bg-gray-400 rounded-full first-letter:uppercase font-semibold">
      {name}
    </span>
  );
};

export default Chip;
