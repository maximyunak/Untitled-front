import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout.tsx";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Messages } from "./pages/Messages";
import { Profile } from "./pages/Profile";
import { Authorization } from "./pages/Authorization";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/registration" element={<Authorization />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};