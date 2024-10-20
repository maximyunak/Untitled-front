import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiUrl = "http://localhost:5000/api";
export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // Добавляем Authorization
    }
    return headers;
  },
});
