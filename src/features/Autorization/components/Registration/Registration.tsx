import React, { useEffect } from "react";
import { Steps } from "./Steps.tsx";
import { NavButtons } from "./NavButtons.tsx";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import {
  selectStep,
  selectType,
  setStep,
} from "../../store/registrationSlice.ts";
import { FirstStep } from "./Steps/FirstStep.tsx";
import { SecondStep } from "./Steps/SecondStep.tsx";
import { ThirdStep } from "./Steps/ThirdStep.tsx";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

export const Registration = () => {
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentStep } = useParams();
  const type = useAppSelector(selectType);

  const handleChangePage = (id: number) => {
    dispatch(setStep(id));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.altKey) {
      switch (event.key) {
        case "1":
          handleChangePage(1);
          break;
        case "2":
          handleChangePage(2);
          break;
        case "3":
          handleChangePage(3);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (currentStep) {
      dispatch(setStep(Number(currentStep)));
    } else {
      dispatch(setStep(1));
    }
  }, [currentStep]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen flex-col container">
      <div className="w-[400px] p-5 rounded-3xl overflow-hidden shadow-lg bg-[#303030]">
        <div className="h-96">
          <h1 className="text-2xl text-center font-bold mt-2 biorhyme ">
            Registration
          </h1>
          <div className="mt-4">
            <AnimatePresence mode="wait">
              {step === 1 && <FirstStep key="step1" />}
              {step === 2 && <SecondStep key="step2" />}
              {step === 3 && <ThirdStep key="step3" />}
            </AnimatePresence>
          </div>
        </div>
        <Steps />
        <NavButtons />
      </div>
    </div>
  );
};
