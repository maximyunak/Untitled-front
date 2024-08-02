import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { minusStep, plusStep, selectStep } from "../../store/registrationSlice";

export const NavButtons = () => {
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();

  const minusClick = () => {
    dispatch(minusStep());
  };

  const plusClick = () => {
    dispatch(plusStep());
  };

  return (
    <div className="flex gap-2 justify-between text-black mt-4">
      <AnimatePresence>
        {step >= 2 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{
              scale: 0,
              transition: {
                duration: 0.15,
              },
            }}
            key="step"
            onClick={minusClick}
            className="bg-slate-100 rounded-2xl py-2 px-5 hover:opacity-80 duration-500 transition-opacity"
            whileTap={{ scale: 0.9 }}
          >
            Back
          </motion.button>
        )}
      </AnimatePresence>
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
