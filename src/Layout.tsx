import React, { ReactNode } from 'react';
import { Header } from './features/Header/Header.tsx';
import { useAppSelector } from './store/hooks.ts';
// import { Sidebar } from '@features/Sidebar/index.ts';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkmode } = useAppSelector((state) => state.themeSlice);

  return (
    <div
      // className=" min-h-screen"
      className={`${darkmode ? 'bg-[#282828]' : 'bg-slate-100'} min-w-screen min-h-screen ${
        darkmode ? 'text-white' : 'text-dark'
      } transition text-xl `}
    >
      <Header />
      <div className="container flex gap-4 justify-center">
        {/* <Sidebar /> */}
        <main className="mt-14 max-w-[60vw] w-full">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
