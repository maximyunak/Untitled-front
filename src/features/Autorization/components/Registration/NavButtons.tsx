import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks.ts";
import {
  minusStep,
  plusStep,
  selectStep,
} from "../../store/registrationSlice.ts";
import {
  selectEmailError,
  selectPasswordError,
  validateData,
  validateFields,
} from "../../store/userSlice.ts";
import { useNavigate } from "react-router-dom";

export const NavButtons = () => {
  const step = useAppSelector(selectStep);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isEditFS, setIsEditFS] = useState(false);
  const [isEditSS, setIsEditSS] = useState(false);

  const {
    email,
    password,
    emailError,
    passwordError,
    firstnameError,
    lastnameError,
    lastname,
    firstname,
  } = useAppSelector((state) => state.userSlice);

  // Обработчик кнопки "Назад"
  const handleBackClick = () => {
    if (step > 1) {
      // dispatch(minusStep());
      navigate(`/registration/${step - 1}`);
    }
  };

  useEffect(() => {
    // if submited first step
    if (isEditFS) {
      dispatch(validateFields());
    }
  }, [email, password]);

  useEffect(() => {
    // if submited second step
    if (isEditSS) {
      dispatch(validateData());
    }
  }, [firstname, lastname]);

  // Обработчик кнопки "Продолжить"
  const handleNextClick = () => {
    if (step === 1) {
      dispatch(validateFields());
      if (
        !emailError &&
        !passwordError &&
        email.length > 3 &&
        password.length > 3
      ) {
        navigate(`/registration/${step + 1}`);
      } else {
        console.log("Email или пароль введены неправильно");
      }
    } else if (step === 2) {
      setIsEditSS(true);
      dispatch(validateData());
      if (!firstnameError && !lastnameError && lastname.length > 3) {
        navigate(`/registration/${step + 1}`);
      } else {
        console.log("err");
      }
    } else if (step < 3) {
      dispatch(plusStep());
      navigate(`/registration/${step + 1}`);
    }
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
            key="backButton"
            onClick={handleBackClick}
            className="bg-slate-100 rounded-2xl py-2 px-5 hover:opacity-80 duration-500 transition-opacity"
            whileTap={{ scale: 0.9 }}
          >
            Back
          </motion.button>
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleNextClick}
        className="bg-customPurple w-full rounded-2xl text-white py-2 px-5 hover:bg-opacity-80 transition-colors duration-300"
        whileTap={{ scale: 0.9 }}
      >
        Continue
      </motion.button>
    </div>
  );
};
