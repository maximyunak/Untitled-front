import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout.tsx";
import { Home } from "./pages/Home";
// import { Login } from "./pages/Login";
import { Messages } from "./pages/Messages";
import { Profile } from "./pages/Profile";
import { Authorization } from "./pages/Authorization";
import { Saved } from "./pages/Saved.tsx";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/registration/:currentStep?" element={<Authorization />} />
      <Route path="/login" element={<Authorization />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/login" element={<Login />} /> */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/saved" element={<Saved />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};
