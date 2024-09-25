import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MyBtnProps {
  children: ReactNode;
  href: string;
}

export const MyButton: React.FC<MyBtnProps> = ({ children, href }) => {
  return (
    <Link
      className="rounded-2xl bg-customPurple px-3 py-1 text-sm font-medium"
      to={href}
    >
      {children}
    </Link>
  );
};
