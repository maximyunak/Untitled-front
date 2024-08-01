import React from "react";
import { Steps } from "./Steps";
import { NavButtons } from "./NavButtons";
import { useAppSelector } from "../../../../store/hooks";
import { selectStep } from "../../store/registrationSlice";
import { FirstStep } from "./Steps/FirstStep";
import { SecondStep } from "./Steps/SecondStep";
import { ThirdStep } from "./Steps/ThirdStep";
import { AnimatePresence } from "framer-motion";

export const Registration = () => {
  const step = useAppSelector(selectStep);

  return (
    <div className="flex items-center justify-center h-screen flex-col container">
      <div className="border w-80 p-5 rounded-3xl overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && <FirstStep key="step1" />}
          {step === 2 && <SecondStep key="step2" />}
          {step === 3 && <ThirdStep key="step3" />}
        </AnimatePresence>

        <Steps />
        <NavButtons />
      </div>
    </div>
  );
};
