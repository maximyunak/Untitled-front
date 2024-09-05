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

export const mouseEventVariants = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};

export const selectEventVariants = {
  hover: {
    x: 5,
  },
  tap: {
    color: "#8b74ff",
  },
};

export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const years = Array.from(
  { length: 75 },
  (_, i) => new Date().getFullYear() - i
);
