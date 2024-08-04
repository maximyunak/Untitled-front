export const variantsStepPages = {
  opened: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: -50,
    opacity: 0,
  },
  initial: {
    x: 100,
    opacity: 0,
  },
};

export const reverseVariantsStepPages = {
  opened: {
    x: 0,
    opacity: 1,
  },
  closed: {
    x: 100,
    opacity: 0,
  },
  initial: {
    x: -50,
    opacity: 0,
  },
};

export const shakeVariants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 180,
  },
};

export const countries = ["Russia", "Island", "Germany"];

export const showModalVariant = {
  initial: { scale: 0, opacity: 0, y: -40 },
  animate: { scale: 1, opacity: 1, y: 0 },
};
