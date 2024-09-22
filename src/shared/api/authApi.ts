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
      query: (): FetchArgs | typeof skipToken => {
        const token = localStorage.getItem("token");

        // Если токен отсутствует, запрос не выполняется
        if (!token) return skipToken;

        return {
          url: "getUser",
          headers: {
            Authorization: `Bearer ${token}`, // Передача токена в заголовке
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
