import { Link } from "react-router-dom";
import { Loader } from "../features/Loader/Loader";
// import { StrokeToFillOnce } from "../features/Loader/StrokeToFillOnce";
import { authApi } from "@shared/api/authApi";
import { useEffect, useState } from "react";
import { BrowseCategory } from "@features/browseCategory";
// import { BrowseCategory } from "@features/browseCategory/components/browseCategory";
// import {BrowseCategory} from "../features/browseCategory";

export const Home = () => {
  // const token = localStorage.getItem("token");
  // const { data: user, isLoading } = authApi.useFetchUserQuery();

  return (
    <div className="">
      {/* <Registration /> */}
      <BrowseCategory />
      <Link to="/registration">
        <Loader />
      </Link>
    </div>
  );
};
