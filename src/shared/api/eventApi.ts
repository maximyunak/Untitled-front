import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IEvent } from '@shared/types/IEvent';
import { apiUrl } from './apiUrl';
import { IEventQuery } from '@shared/types/IEventQuery';

export interface IEventRes {
  events: IEvent[];
  totalEvents: number;
  totalPages: number;
  currentPage: number;
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ['Events'],
  endpoints: (build) => ({
    fetchEvents: build.query<IEventRes, IEventQuery>({
      query: ({ titleFilter = '', selectedCategories = [], selectedCountries = [], page = 1 }) => ({
        url: '/events',
        params: {
          eventTypes: selectedCategories,
          title: titleFilter,
          countries: selectedCountries,
          page,
        },
      }),
      providesTags: () => ['Events'],
    }),
    createEvent: build.mutation({
      query: (eventData) => ({
        url: '/event',
        method: 'post',
        body: eventData,
      }),
      invalidatesTags: () => ['Events'],
    }),
  }),
});
