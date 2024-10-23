import { skipToken } from "@reduxjs/toolkit/query";
import { authApi } from "@shared/api/authApi";
import { useMemo } from "react";

export const useUser = () => {
  const token = localStorage.getItem("token");

  // const { data: user } = useMemo(() => {
  //   return authApi.useFetchUserQuery(token ? undefined : skipToken);
  // }, [token]);

  const { data: user, isLoading } = authApi.useFetchUserQuery(
    token ? undefined : skipToken
  );

  return user;
};
