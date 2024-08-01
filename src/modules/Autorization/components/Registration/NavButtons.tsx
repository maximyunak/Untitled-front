import React from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../../store/hooks";
import { minusStep, plusStep } from "../../store/registrationSlice";

export const NavButtons = () => {
  const dispatch = useAppDispatch();

  const minusClick = () => {
    dispatch(minusStep());
  };

  const plusClick = () => {
    dispatch(plusStep());
  };

  return (
    <div className="flex gap-2 justify-between text-black mt-4">
      <motion.button
        onClick={minusClick}
        className="bg-slate-100 rounded-2xl py-2 px-5 hover:opacity-80 duration-300 transition-colors"
        whileTap={{ scale: 0.9 }}
      >
        Back
      </motion.button>
      <motion.button
        onClick={plusClick}
        className="bg-[#6647ff] w-full rounded-2xl text-white py-2 px-5 hover:bg-customPurple transition-colors duration-300"
        whileTap={{ scale: 0.9 }}
      >
        Continue
      </motion.button>
    </div>
  );
};
