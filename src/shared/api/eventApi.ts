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
  tagTypes: ["Events", "Comment", "Saved", "MyEvents"],
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
      invalidatesTags: () => ["Events", "MyEvents"],
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
      providesTags: () => ["MyEvents"],
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
        url: `/comment/${commentData.commentId}`,
        method: "put",
        body: { commentBody: commentData.commentBody },
      }),
      invalidatesTags: () => ["Comment", "MyEvents"],
    }),
    saveEvent: build.mutation({
      query: (eventId) => ({
        url: `/saved/${eventId}`,
        method: "post",
      }),
      invalidatesTags: () => ["Events", "Saved", "MyEvents"],
    }),
    getSavedEvent: build.query<IEvent[], void>({
      query: () => ({
        url: "saved",
      }),
      providesTags: () => ["Saved"],
    }),
    editEvent: build.mutation({
      query: (editData) => ({
        url: `/event/${editData.eventId}`,
        method: "put",
        body: editData.data,
      }),
      invalidatesTags: () => ["Events", "Saved", "MyEvents"],
    }),
    deleteEvent: build.mutation({
      query: (eventId) => ({
        url: `/event/${eventId}`,
        method: "delete",
      }),
      invalidatesTags: () => ["Events", "Saved", "MyEvents"],
    }),
  }),
});
