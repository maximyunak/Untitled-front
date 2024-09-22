import animation from "@shared/animations/icons8-success.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  mouseEventVariants,
  toTop,
  variantsStepPages,
} from "@shared/animationProps";

export const FinalStep = () => {
  return (
    <motion.div
      key="stepX"
      variants={toTop}
      animate={"opened"}
      initial={"initial"}
      className="h-96 flex flex-col items-center justify-between"
    >
      <h1 className="text-xl font-medium biorhyme text-center">
        Registration was successful
      </h1>
      <Lottie animationData={animation} loop={false} className="w-40 mt-16" />

      <Link to="/" className="w-full">
        <motion.h1
          className="mt-20 text-lg w-full text-center bg-customPurple rounded-2xl text-white py-1 px-5 hover:bg-opacity-80 transition-colors duration-300 flex items-center justify-center gap-3"
          variants={mouseEventVariants}
          whileTap={"tap"}
          whileHover={"hover"}
        >
          Back to home
        </motion.h1>
      </Link>
    </motion.div>
  );
};
