import React, { useEffect } from "react";
import { Steps } from "./Steps";
import { NavButtons } from "./NavButtons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectStep, setStep } from "../../store/registrationSlice";
import { FirstStep } from "./Steps/FirstStep";
import { SecondStep } from "./Steps/SecondStep";
import { ThirdStep } from "./Steps/ThirdStep";
import { AnimatePresence } from "framer-motion";

export const Registration = () => {
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();

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
    // Добавляем обработчик события нажатия клавиш
    document.addEventListener("keydown", handleKeyDown);

    // Убираем обработчик при размонтировании
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
