import { authApi } from "@shared/api/authApi";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginUser, {}] = authApi.useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = {
        email,
        password,
      };

      const user = await loginUser(data);
      if (user && user.data.accessToken) {
        localStorage.setItem("token", user.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
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
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300`}
          />
        </div>

        <div className="">
          <h1 className="text-lg font-medium biorhyme">Enter password</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full border border-transparent py-1 px-3 border-gray-400 bg-[#282828] rounded-xl placeholder:text-sm hover:bg-[#272727] focus:border focus:border-customPurple transition-colors mt-1 duration-300 `}
          />
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
