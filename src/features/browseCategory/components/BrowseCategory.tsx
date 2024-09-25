import React from "react";
import { MyButton } from "@shared/UI/MyButton";
import { Category } from "./Category";
export const BrowseCategory = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold biorhyme text-xl">Browse By Category</h1>
        <MyButton href="/registration">Show More</MyButton>
      </div>
      <span className="h-[1px] mt-4 mb-8 w-full block bg-white opacity-70"></span>

      <div>
        <Category />
      </div>
    </div>
  );
};
