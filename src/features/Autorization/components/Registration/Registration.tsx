import { useEffect } from "react";
import { Steps } from "./Steps.tsx";
import { NavButtons } from "./NavButtons.tsx";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import { selectStep, setStep } from "../../store/registrationSlice.ts";
import { FirstStep } from "./Steps/FirstStep.tsx";
import { SecondStep } from "./Steps/SecondStep.tsx";
import { ThirdStep } from "./Steps/ThirdStep.tsx";
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FinalStep } from "./Steps/FinalStep.tsx";
import { authApi } from "@shared/api/authApi.ts";
import { clearData } from "@features/Autorization/store/authSlice.ts";

export const Registration = () => {
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentStep } = useParams();

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
        case "4":
          handleChangePage(4);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (currentStep) {
      const stepNumber = Number(currentStep);
      if (stepNumber > 4) {
        navigate("/registration/1");
        dispatch(setStep(1));
      }
    }
  }, [currentStep, dispatch, navigate]);

  useEffect(() => {
    if (currentStep) {
      dispatch(setStep(Number(currentStep)));
    } else {
      dispatch(setStep(1));
    }
  }, [currentStep]);

  useEffect(() => {
    dispatch(clearData());
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    // <div className="flex items-center justify-center h-screen flex-col container">
    // <div className="w-[400px] p-5 rounded-3xl overflow-hidden shadow-lg bg-[#303030]">
    <div>
      {step <= 3 && (
        <>
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
        </>
      )}
      {step === 4 && <FinalStep key="step4" />}
    </div>
  );
};
