import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  skipToken,
} from "@reduxjs/toolkit/query/react";
import { IUser } from "@shared/types/IUser";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
  }),
  tagTypes: ["Users", "user"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], void>({
      query: () => ({
        url: "/get",
      }),
      providesTags: () => ["Users"],
    }),
    fetchUser: build.query<IUser, void>({
      query: (arg: void): string | FetchArgs => {
        const token = localStorage.getItem("token");
        if (!token) {
          return "getUser"; // Просто возвращаем URL, если токена нет
        }
        return {
          url: "getUser",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
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
