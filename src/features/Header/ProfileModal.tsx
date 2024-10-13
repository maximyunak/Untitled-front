import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import user from './user.svg';
import { CiSettings, CiLogout } from 'react-icons/ci';
import { BiPalette } from 'react-icons/bi';
import { authApi } from '@shared/api/authApi';
import { useAppDispatch } from '@hooks';
import { logoutUser } from '@store/userSlice';
import { setIsOpenProfile } from './store/headerSlice';
import { useClickOutside } from '@shared/hooks/useClickOutside';

interface IProps {
  closeModal: (b?: boolean) => void;
  avaRef: React.RefObject<HTMLElement>;
}

export const ProfileModal: React.FC<IProps> = ({ closeModal, avaRef }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: user, refetch } = authApi.useFetchUserQuery();
  const dispatch = useAppDispatch();

  useClickOutside([modalRef, avaRef], closeModal);

  const handleLogOut = async () => {
    // dispatch(logoutUser());
    refetch();
    dispatch(setIsOpenProfile(false));
    localStorage.removeItem('token');
  };

  return (
    <motion.div
      ref={modalRef}
      className="bg-slate-100 absolute top-12 -left-44 rounded-xl w-56 py-3 px-4"
      initial={{ scale: 0, opacity: 0, y: -85 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: -85 }}
    >
      <div className="flex flex-col items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFj4CCDNn5bpSqyA3XD3KRHjgBd73ZOmFYTw&s"
          alt=""
          className="w-14 rounded-full"
        />

        <h2 className="mt-2 text-lg font-semibold text-center leading-4">
          {user?.firstname} {user?.lastname}
        </h2>
        <h3 className="mt-1 text-sm">{user?.email}</h3>
      </div>
      <div className="text-base mt-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex gap-2 items-center cursor-pointer"
        >
          <CiSettings />
          Settings
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex gap-2 items-center cursor-pointer"
        >
          <BiPalette />
          Theme
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogOut}
          className="flex gap-2 items-center cursor-pointer"
        >
          <CiLogout />
          Log out
        </motion.div>
      </div>
    </motion.div>
  );
};
