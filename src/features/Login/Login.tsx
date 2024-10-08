import { authApi } from '@shared/api/authApi';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginUser] = authApi.useLoginUserMutation();
  const navigate = useNavigate();
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const { refetch } = authApi.useFetchUserQuery();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async () => {
    try {
      const emailValidate = emailRegex.test(email);
      if (emailValidate && password.length > 3) {
        const data = {
          email,
          password,
        };

        const user = await loginUser(data);

        if (user && user.data.accessToken) {
          localStorage.setItem('token', user.data.accessToken);
          refetch();
          navigate('/');
        }
      } else {
        if (password.length < 3) {
          setPasswordErr(true);
        }
        if (!emailValidate) {
          setEmailErr(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e: string) => {
    setEmail(e);
    if (emailErr) {
      const validate = emailRegex.test(email);
      if (validate) {
        setEmailErr(false);
      }
    }
  };

  const handlePasswordChange = (e: string) => {
    setPassword(e);
    if (passwordErr) {
      if (password.length >= 3) {
        setPasswordErr(false);
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mt-2 biorhyme ">Login</h1>
      <form className="flex flex-col gap-4 mt-4">
        <div>
          <h1 className="text-lg font-medium biorhyme">Enter email</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300`}
          />
          {emailErr && <p className="absolute text-red-600 text-xs">Email is incorrect</p>}
        </div>

        <div className="">
          <h1 className="text-lg font-medium biorhyme">Enter password</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={`w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300 `}
          />
          {passwordErr && (
            <p className="absolute text-red-600 text-xs">
              Password cannot be shorter than 3 characters
            </p>
          )}
        </div>
      </form>
      <motion.button
        onClick={handleLogin}
        className="mt-10 bg-customPurple w-full rounded-2xl text-white py-2 px-5 hover:bg-opacity-80 transition-colors duration-300"
        whileTap={{ scale: 0.9 }}
      >
        Continue
      </motion.button>
    </div>
  );
};
