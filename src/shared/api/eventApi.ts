import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { IEvent } from "@shared/types/IEvent";
import { apiUrl, baseQueryWithAuth } from "./apiUrl";
import { IEventQuery } from "@shared/types/IEventQuery";
import { IComment } from "@shared/types/IComment";

export interface IEventRes {
  events: IEvent[];
  totalEvents: number;
  totalPages: number;
  currentPage: number;
}

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Events", "Comment"],
  endpoints: (build) => ({
    fetchEvents: build.query<IEventRes, IEventQuery>({
      query: ({
        titleFilter = "",
        selectedCategories = [],
        selectedCountries = [],
        page = 1,
      }) => ({
        url: "/events",
        params: {
          eventTypes: selectedCategories,
          title: titleFilter,
          countries: selectedCountries,
          page,
        },
      }),
      providesTags: () => ["Events"],
    }),
    createEvent: build.mutation({
      query: (eventData) => ({
        url: "/event",
        method: "post",
        body: eventData,
      }),
      invalidatesTags: () => ["Events"],
    }),

    fetchMyEvents: build.query<IEvent[], void>({
      query: () => {
        const token = localStorage.getItem("token");
        if (!token) {
          return "myevents";
        }
        return {
          url: "myevents",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      // providesTags: () => ['user'],
    }),
    createComment: build.mutation({
      query: (commentData) => ({
        url: `/comment/${commentData.eventId}`,
        method: "post",
        body: commentData,
      }),
      invalidatesTags: () => ["Comment"],
    }),
    fetchComment: build.query<IComment[], string | number>({
      query: (eventId) => ({
        url: `/comment/${eventId}`,
      }),
      providesTags: () => ["Comment"],
    }),
    deleteComment: build.mutation({
      query: (commentId) => ({
        url: `/comment/${commentId}`,
        method: "delete",
      }),
      invalidatesTags: () => ["Comment"],
    }),
    editComment: build.mutation({
      query: (commentData) => ({
        url: `/comment/${commentData.commentId}`, // передаем commentId в URL
        method: "put",
        body: { commentBody: commentData.commentBody }, // передаем только commentBody в теле
      }),
      invalidatesTags: () => ["Comment"],
    }),
    saveEvent: build.mutation({
      query: (eventId) => ({
        url: `/saved/${eventId}`, // передаем commentId в URL
        method: "post",
      }),
      // invalidatesTags: () => ["Comment"],
    }),
    getSavedEvent: build.query({
      query: () => ({
        url: "saved",
      }),
      // providesTags: () => ["Comment"],
    }),
  }),
});
