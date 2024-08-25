import React from "react";
import { motion, Variants } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import { setStep } from "../../store/registrationSlice.ts";

const steps = [
  { id: 1, label: "Step 1" },
  { id: 2, label: "Step 2" },
  { id: 3, label: "Step 3" },
];

export const Steps = () => {
  const dispatch = useAppDispatch();
  const { step: currentStep } = useAppSelector(
    (state) => state.registrationSlice
  );

  const stepsVariants: Variants = {
    initial: {
      width: `${100 / steps.length}%`,
    },
    animate: {
      width: `${(currentStep / steps.length) * 100}%`,
    },
  };

  const handleClick = (id: number) => {
    dispatch(setStep(id));
  };

  return (
    <div className="flex items-center w-full justify-center flex-col">
      <div className="flex mb-4 max-[780px]:hidden">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={`w-8 h-8 flex items-center justify-center ${
                currentStep >= step.id ? "bg-customPurple" : "bg-gray-400"
              } text-white rounded-full cursor-pointer transition-colors duration-200`}
              whileHover={{ scale: currentStep >= step.id ? 1.1 : 1 }}
              whileTap={{ scale: currentStep >= step.id ? 0.95 : 1 }}
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                className={`h-1 mx-2 ${
                  currentStep > step.id ? "bg-customPurple" : "bg-gray-400"
                } transition-colors duration-200`}
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="w-12 relative min-[781px]:hidden">
        <motion.div
          className="absolute rounded-full bottom-0 left-0  h-4 w-12 flex j items-center bg-customPurple"
          variants={stepsVariants}
          initial="initial"
          animate="animate"
        >
          <div className="absolute flex justify-center items-center">
            {steps.map((_, index) => (
              <span
                key={`${index}_steps`}
                className={`h-2 w-2 block rounded-full mx-1 ${
                  index + 1 <= currentStep ? "bg-white" : "bg-slate-600"
                } transition-colors duration-300 cursor-pointer`}
                onClick={() => handleClick(index + 1)}
              ></span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
