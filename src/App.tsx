import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Messages } from "./pages/Messages";
import { Profile } from "./pages/Profile";
// import { Home } from "./pages/home";

export const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Messages" element={<Messages />} />
        </Routes>
      </Layout>
    </>
  );
};
