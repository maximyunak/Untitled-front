import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  reverseVariantsStepPages,
  showModalVariant,
  variantsStepPages,
  countries,
  shakeVariants,
  selectEventVariants,
} from "../../../helpers/constants.ts";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks.ts";
import {
  selectType,
  selectVisibleCounty,
  setVisibleCountry,
} from "../../../store/registrationSlice.ts";
import { BiHide, BiShowAlt } from "react-icons/bi";

import selectIcon from "../arrowDown.svg";

export const FirstStep = () => {
  const type = useAppSelector(selectType);
  const visibleCounty = useAppSelector(selectVisibleCounty);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const toggleCountry = () => {
    dispatch(setVisibleCountry(!visibleCounty));
  };
  const closeModal = () => {
    dispatch(setVisibleCountry(false));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <motion.div
      variants={type === 0 ? variantsStepPages : reverseVariantsStepPages}
      animate={"opened"}
      initial={"initial"}
      exit={"closed"}
      transition={{
        duration: 0.2,
      }}
    >
      <form className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-medium biorhyme">Enter email</h1>
          <input
            type="text"
            placeholder="Email"
            className=" w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
          />
        </div>

        <div className="">
          <h1 className="text-lg font-medium biorhyme">Enter password</h1>
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300"
            />
            <AnimatePresence>
              {visible ? (
                <motion.div
                  // className="absolute top-1/2 mt-[2px] right-3 -translate-y-1/2 cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  key="showIcon"
                  className="inline"
                >
                  <BiShowAlt
                    onClick={() => setVisible(!visible)}
                    className="absolute top-1/2 mt-[2px] right-3 -translate-y-1/2 cursor-pointer"
                  />
                </motion.div>
              ) : (
                <motion.div
                  // className="absolute top-1/2 mt-[2px] right-3 -translate-y-1/2 cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  key="hideIcon"
                  className="inline"
                >
                  <BiHide
                    onClick={() => setVisible(!visible)}
                    // initial={{ opacity: 0, scale: 0 }}
                    // animate={{ opacity: 1, scale: 1 }}
                    // exit={{ opacity: 0, scale: 0 }}
                    // transition={{ duration: 0.3 }}
                    className="absolute top-1/2 mt-[2px] right-3 -translate-y-1/2 cursor-pointer"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="relative">
          <h1 className="text-lg font-medium biorhyme">Select a country</h1>
          <motion.div
            className="w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] transition-colors mt-1 duration-300 cursor-pointer flex justify-between"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={toggleCountry}
            ref={triggerRef}
          >
            Russia
            <motion.img
              src={selectIcon}
              alt=""
              className="invert w-3"
              variants={shakeVariants}
              animate={visibleCounty ? "visible" : { rotate: 0 }}
            />
          </motion.div>
          <AnimatePresence>
            {visibleCounty && (
              <motion.div
                ref={modalRef}
                className="bg-[#282828] rounded-xl py-3 px-4 w-full absolute top-[70px] left-0 z-50"
                variants={showModalVariant}
                animate="animate"
                exit="initial"
                initial="initial"
              >
                {countries.map((el, index) => (
                  <motion.h1
                    key={index}
                    variants={selectEventVariants}
                    onClick={closeModal}
                    whileHover={"hover"}
                    whileTap={"tap"}
                    className="block cursor-pointer"
                  >
                    {el}
                  </motion.h1>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
};
