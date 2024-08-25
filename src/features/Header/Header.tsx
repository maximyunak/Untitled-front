import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseMenu } from "./closeMenu.tsx";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { MenuItem } from "./MenuItem.tsx";
import { openMenu, setIsOpenProfile, setRotation } from "./headerSlice.tsx";

import { LogoBlock } from "./LogoBlock.tsx";
import { items } from "./constants.ts";

import ArrowDown from "./arrowDown.svg";

import { RiArrowDownSLine } from "react-icons/ri";
import { ProfileModal } from "./ProfileModal.tsx";
import { MobileNavbar } from "./MobileNavbar.tsx";

export const Header: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const isMobile = windowWidth < 780;

  const dispatch = useAppDispatch();

  const { opened, rotation, isOpenProfile } = useAppSelector(
    (state) => state.headerSlice
  );

  const avaRef = useRef<HTMLDivElement>(null);

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

  // const onClose = () => {
  //   dispatch(openMenu(!opened));
  //   dispatch(setRotation(rotation + 720));
  // };

  const openProfile = () => {
    dispatch(setIsOpenProfile(!isOpenProfile));
  };

  const closeModal = () => {
    dispatch(setIsOpenProfile(false));
  };

  return (
    <div className="fixed w-full z-50">
      <MobileNavbar />

      <nav className=" py-2 h-14 items-center flex bg-white filter-m text-black max-[780px]:hidden">
        <div className="container flex gap-10 items-center justify-between">
          <div className="flex items-center gap-32 max-[780px]:flex-col max-[780px]:items-start max-[780px]:gap-10">
            <LogoBlock />
            <ul className="flex gap-10 max-[780px]:flex-col">
              {items.map((el, i) => (
                <MenuItem
                  key={`${el.title}_${i}_2`}
                  id={i}
                  item={el.title}
                  path={el.path}
                />
              ))}
            </ul>
          </div>

          {/* <div className="flex gap-5 max-[780px]:flex-col max-[780px]:items-start">
            <button>Login</button>
            <button>Sign up</button>
          </div> */}

          <div ref={avaRef} className="relative flex gap-1 items-center">
            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={openProfile}
              className="flex gap-2 items-center cursor-pointer"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFj4CCDNn5bpSqyA3XD3KRHjgBd73ZOmFYTw&s"
                alt="avatar"
                className=" h-10 rounded-full "
              />
              <RiArrowDownSLine
                size={25}
                className={`${
                  isOpenProfile && "rotate-180"
                } transition-transform`}
              />
            </motion.div>
            <AnimatePresence>
              {isOpenProfile && (
                <ProfileModal closeModal={closeModal} avaRef={avaRef} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </div>
  );
};
