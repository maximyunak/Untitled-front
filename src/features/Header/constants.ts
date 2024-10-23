import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const MotionLink = motion(Link);

export const items = [
  {
    title: "Home",
    path: "/",
    block: false,
  },
  {
    title: "Profile",
    path: "/profile",
    block: true,
  },
  {
    title: "Saved",
    path: "/saved",
    block: true,
  },
];
