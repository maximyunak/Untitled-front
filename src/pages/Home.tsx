import { Link } from "react-router-dom";
import { Loader } from "../features/Loader/Loader";
// import { StrokeToFillOnce } from "../features/Loader/StrokeToFillOnce";
import { authApi } from "@shared/api/authApi";
import { useEffect, useState } from "react";

export const Home = () => {
  // const token = localStorage.getItem("token");
  // const { data: user, isLoading } = authApi.useFetchUserQuery();

  return (
    <div className="">
      {/* <Registration /> */}
      <button>aaaa</button>
      <Link to="/registration">
        <Loader />
      </Link>
    </div>
  );
};
