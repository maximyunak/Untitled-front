import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseMenu } from "./closeMenu";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { MenuItem } from "./MenuItem";
import { openMenu, setRotation } from "./MenuSlice";

import logo from "./logo.svg";
import { LogoBlock } from "./LogoBlock";

const items = ["Home", "bla", "bla", "bla"];

export const Header: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const isMobile = windowWidth < 780;

  const dispatch = useAppDispatch();

  const { opened, rotation } = useAppSelector((state) => state.menuSlice);

  useEffect(() => {
    const handleResize = () => {
      // setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const variants = {
    open: {
      clipPath: `circle(${windowHeight * 2 + 200}px at 0px 0px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
        duration: 0.1,
      },
    },
    closed: {
      clipPath: "circle(0px at 0px 0px)",
      transition: {
        delay: 0.55,
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.1,
      },
    },
  };

  const onClose = () => {
    dispatch(openMenu(!opened));
    dispatch(setRotation(rotation + 720));
  };

  return (
    <div>
      <div className="container flex justify-between items-center min-[781px]:hidden">
        <LogoBlock />
        <CloseMenu />
      </div>
      <AnimatePresence initial={false}>
        <AnimatePresence>
          {opened && (
            <motion.div
              onClick={onClose}
              className="fixed inset-0 bg-black opacity-20 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
              }}
            />
          )}
        </AnimatePresence>
        <motion.nav
          className="mobile bg-slate-50 min-[780px]:hidden text-black max-[780px]:absolute max-[780px]:h-screen max-[780px]:w-1/2 max-[780px]:top-0 max-[450px]:w-3/4 z-50"
          initial={{ opacity: 0 }}
          animate={opened ? "open" : "closed"}
          exit={{ opacity: 0 }}
          variants={variants}
        >
          <div className="container flex  gap-10 items-center justify-between max-[780px]:flex-col max-[780px]:items-start max-[640px]:ml-0 max-[780px]:ml-11 max-[768px]:ml-4">
            <div className="flex  items-center gap-32 max-[780px]:flex-col max-[780px]:items-start max-[780px]:gap-10">
              <LogoBlock />
              <ul className="flex gap-4 max-[780px]:flex-col">
                {items.map((el, i) => (
                  <MenuItem key={`${el}_${i}_1`} id={i} item={el} />
                ))}
              </ul>
            </div>

            <div className="flex gap-5 max-[780px]:flex-col max-[780px]:items-start">
              <motion.button
                animate={opened ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                transition={{ delay: (items.length + 1) * 0.1 }}
                initial={{ x: 50, opacity: 0 }}
              >
                Login
              </motion.button>
              <motion.button
                animate={opened ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                transition={{ delay: (items.length + 2) * 0.1 }}
                initial={{ x: 50, opacity: 0 }}
              >
                Sign up
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>

      <nav className="bg-slate-50 text-black max-[780px]:hidden">
        <div className="container flex gap-10 items-center justify-between">
          <div className="flex items-center gap-32 max-[780px]:flex-col max-[780px]:items-start max-[780px]:gap-10">
            <LogoBlock />
            <ul className="flex gap-4 max-[780px]:flex-col">
              {items.map((el, i) => (
                <MenuItem key={`${el}_${i}_2`} id={i} item={el} />
              ))}
            </ul>
          </div>

          <div className="flex gap-5 max-[780px]:flex-col max-[780px]:items-start">
            <button>Login</button>
            <button>Sign up</button>
          </div>
        </div>
      </nav>
    </div>
  );
};
