import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IUser } from "@shared/types/IUser";
import { apiUrl, baseQueryWithAuth } from "./apiUrl";

// Функция для добавления Authorization к заголовкам

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Users", "user"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], void>({
      query: () => ({
        url: "/get",
      }),
      providesTags: () => ["Users"],
    }),
    fetchUser: build.query<IUser, void>({
      query: () => ({
        url: "getUser",
      }),
      providesTags: () => ["user"],
    }),
    registrationUser: build.mutation({
      query: (user) => ({
        url: "/registration",
        method: "post",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
    loginUser: build.mutation({
      query: (data) => ({
        url: "/login",
        method: "post",
        body: data,
      }),
    }),
  }),
});
