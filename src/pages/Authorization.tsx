import { useLayoutEffect } from 'react';
import { Registration } from '../features/Autorization';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Login } from '@features/Login/Login';
import { AnimatePresence, motion } from 'framer-motion';
import { reverseVariantsStepPages, variantsStepPages } from '@shared/animationProps';
import { authApi } from '@shared/api/authApi';
import { skipToken } from '@reduxjs/toolkit/query';

export const Authorization = () => {
  const token = localStorage.getItem('token');
  const { data: user } = authApi.useFetchUserQuery(token ? undefined : skipToken);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [user]);
  return (
    <div className="min-w-screen min-h-screen bg-[#282828] text-white">
      <div className="flex items-center justify-center h-screen flex-col">
        <div
          className="w-[400px] p-5 rounded-3xl overflow-hidden shadow-lg bg-[#303030] max-[450px]:w-[95%]
        max-[400px]:p-3
        "
        >
          <AnimatePresence mode="wait">
            {pathname === '/login' ? (
              <motion.div
                key="login"
                variants={variantsStepPages}
                animate={'opened'}
                initial={'initial'}
                exit={'closed'}
              >
                <Login />
              </motion.div>
            ) : (
              <motion.div
                key="registration"
                variants={reverseVariantsStepPages}
                animate={'opened'}
                initial={'initial'}
                exit={'closed'}
                transition={
                  {
                    // duration: 0.5,
                  }
                }
              >
                <Registration />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {pathname === '/login' ? (
          <h4 className="text-sm mt-2 opacity-90">
            U haven't an account?{' '}
            <Link to="/registration" className="text-customPurple underline">
              Registration
            </Link>
          </h4>
        ) : (
          <h4 className="text-sm mt-2 opacity-90">
            U have already an account?{' '}
            <Link to="/login" className="text-customPurple underline">
              Log in
            </Link>
          </h4>
        )}
      </div>
    </div>
  );
};
