import React from "react";
import concert from "@shared/assets/categories/concert.png";
export const Category = ({}) => {
  return (
    <div className="relative inline-block cursor-pointer hover:opacity-85 transition-opacity duration-300">
      <img src={concert} alt="" />
      <h3 className="absolute right-1/2 translate-x-1/2 -translate-y-1/2 rounded-2xl border-[4px] bg-[#393431] border-[#282828] px-3 py- font-bold text-base">
        Concert
      </h3>
    </div>
  );
};
