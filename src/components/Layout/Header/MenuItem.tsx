import React from "react";
import { motion } from "framer-motion";

interface IProps {
  item: string;
  id: number;
}

export const MenuItem: React.FC<IProps> = ({ item, id }) => {
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
    <motion.li custom={id} variants={variants}>
      {item}
    </motion.li>
  );
};
