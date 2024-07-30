import React from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { openMenu, setRotation } from "./MenuSlice";

export const CloseMenu: React.FC = () => {
  const { opened, rotation } = useAppSelector((state) => state.menuSlice);

  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(openMenu(!opened));
    dispatch(setRotation(rotation + 720));
  };

  return (
    <>
      <motion.div
        onClick={handleToggle}
        className=" inline-flex gap-[5px] flex-col cursor-pointer z-[55] items-center justify-center rounded-full min-[781px]:hidden"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <motion.span
          animate={opened ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          className="w-8 h-1 bg-white z-50 block"
        ></motion.span>
        <motion.span
          animate={opened ? { opacity: 0 } : { opacity: 1 }}
          className="w-4 h-1 bg-white z-50 block self-end"
        ></motion.span>
        <motion.span
          animate={opened ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          className="w-8 h-1 bg-white z-50 block"
        ></motion.span>
      </motion.div>
    </>
  );
};
