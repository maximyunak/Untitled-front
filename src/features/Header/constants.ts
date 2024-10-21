import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const MotionLink = motion(Link);

export const items = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Messages",
    path: "/messages",
  },
  {
    title: "Profile",
    path: "/profile",
  },
  {
    title: "Saved",
    path: "/saved",
  },
];
