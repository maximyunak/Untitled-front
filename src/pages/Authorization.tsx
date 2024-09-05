import React, { useEffect } from "react";
import { Registration } from "../features/Autorization";
import { useNavigate } from "react-router-dom";

export const Authorization = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/registration/1");
  // });
  return (
    <div className="min-w-screen min-h-screen bg-[#282828] text-white">
      <Registration />
    </div>
  );
};
