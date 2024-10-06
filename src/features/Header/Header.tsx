import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@hooks';
import { authApi } from '@shared/api/authApi.ts';
import { Link } from 'react-router-dom';
import { RiArrowDownSLine } from 'react-icons/ri';
import { setIsOpenProfile } from './store/headerSlice.tsx';
import { ProfileModal } from './ProfileModal.tsx';
import { MobileNavbar } from './MobileNavbar.tsx';
import { LogoBlock } from './LogoBlock.tsx';
import { items } from './constants.ts';
import { MenuItem } from './MenuItem.tsx';
import { skipToken } from '@reduxjs/toolkit/query';

export const Header: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const token = localStorage.getItem('token');

  const { data: user, isLoading } = authApi.useFetchUserQuery(token ? undefined : skipToken);

  const dispatch = useAppDispatch();
  const { opened, rotation, isOpenProfile } = useAppSelector((state) => state.headerSlice);

  const avaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openProfile = () => {
    dispatch(setIsOpenProfile(!isOpenProfile));
  };

  const closeModal = () => {
    dispatch(setIsOpenProfile(false));
  };

  return (
    <div className="fixed w-full z-[500] text-lg">
      <MobileNavbar />

      <nav className="py-2 h-14 items-center flex bg-white filter-m text-black max-[780px]:hidden">
        <div className="container flex gap-10 items-center justify-between">
          <div className="flex items-center gap-32 max-[780px]:flex-col max-[780px]:items-start max-[1030px]:gap-10">
            <LogoBlock />
            <ul className="flex gap-10 max-[780px]:flex-col">
              {items.map((el, i) => (
                <MenuItem key={`${el.title}_${i}_2`} id={i} item={el.title} path={el.path} />
              ))}
            </ul>
          </div>

          {user ? (
            <div ref={avaRef} className="relative flex gap-1 items-center">
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={openProfile}
                className="flex gap-2 items-center cursor-pointer"
              >
                {isLoading ? (
                  <h1>Loading...</h1>
                ) : (
                  <h1>
                    {user?.firstname} {user?.lastname}
                  </h1>
                )}
                <RiArrowDownSLine
                  size={25}
                  className={`${isOpenProfile && 'rotate-180'} transition-transform`}
                />
              </motion.div>
              <AnimatePresence>
                {isOpenProfile && <ProfileModal closeModal={closeModal} avaRef={avaRef} />}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="border rounded-3xl px-5 py-1 hover:border-gray-400 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="rounded-3xl px-5 py-1 bg-customPurple text-white hover:opacity-80  transition duration-300"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
