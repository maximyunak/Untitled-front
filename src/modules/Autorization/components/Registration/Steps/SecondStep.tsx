import React from "react";
import { motion } from "framer-motion";
import {
  reverseVariantsStepPages,
  variantsStepPages,
} from "../../../helpers/constants";
import { useAppSelector } from "../../../../../store/hooks";
import { selectType } from "../../../store/registrationSlice";

export const SecondStep = () => {
  const type = useAppSelector(selectType);

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
      2Step
    </motion.div>
  );
};
