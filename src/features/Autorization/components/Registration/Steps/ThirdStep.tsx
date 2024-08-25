import React from "react";
import { motion } from "framer-motion";
import {
  reverseVariantsStepPages,
  variantsStepPages,
} from "../../../helpers/constants.ts";
import { useAppSelector } from "../../../../../store/hooks.ts";
import { selectType } from "../../../store/registrationSlice.ts";

export const ThirdStep = () => {
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
      FirstStep
    </motion.div>
  );
};
