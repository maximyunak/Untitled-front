import React, { ReactNode } from "react";
import { Header } from "./Header/Header";
import { useAppSelector } from "../../store/hooks";
// import Footer from "./Footer";
// import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkmode } = useAppSelector((state) => state.themeSlice);

  return (
    <div
      // className=" min-h-screen"
      className={`${
        darkmode ? "bg-[#282828]" : "bg-slate-100"
      } min-w-screen min-h-screen ${
        darkmode ? "text-white" : "text-dark"
      } transition text-xl `}
    >
      <Header />
      <div className="container">
        {/* <Sidebar /> */}
        <main className="">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
