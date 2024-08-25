import React from "react";
import { MotionLink } from "./constants.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import { openMenu } from "./headerSlice.tsx";

interface IProps {
  item: string;
  id: number;
  path: string;
}

export const MenuItem: React.FC<IProps> = ({ item, id, path }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openMenu(false));
  };

  const variants = {
    open: (id: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 10000, velocity: 200 },
        delay: id * 0.1,
      },
    }),
    closed: (id: number) => ({
      x: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 10000 },
        delay: id * 0.1,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    }),
  };

  return (
    <MotionLink
      to={path}
      custom={id}
      variants={variants}
      onClick={handleClick}
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.1,
        },
      }}
      whileTap={{
        scale: 0.9,

        transition: {
          duration: 0.1,
        },
      }}
      className="font-normal hover:text-[#aca0e7] transition-colors  duration-300"
    >
      {item}
    </MotionLink>
  );
};
