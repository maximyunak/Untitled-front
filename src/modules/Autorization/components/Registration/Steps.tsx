import React from "react";
import { motion } from "framer-motion";
import { useAppSelector } from "../../../../store/hooks";

const steps = [
  { id: 1, label: "Step 1" },
  { id: 2, label: "Step 2" },
  { id: 3, label: "Step 3" },
];

export const Steps = () => {
  const { step: currentStep } = useAppSelector(
    (state) => state.registrationSlice
  );

  return (
    <div className="flex items-center w-full justify-center">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <motion.div
            className={`w-8 h-8 flex items-center justify-center ${
              currentStep >= step.id ? "bg-customPurple" : "bg-gray-400"
            } text-white rounded-full cursor-pointer transition-colors duration-200`}
            whileHover={{ scale: currentStep >= step.id ? 1.1 : 1 }}
            whileTap={{ scale: currentStep >= step.id ? 0.95 : 1 }}
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
  );
};
