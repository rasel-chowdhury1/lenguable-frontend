import { baseApi } from "../api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation({
      query: (data) => ({
        url: "/booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"],
    }),

    myBooking: build.query({
      query: () => "/booking",
      providesTags: ["Booking"],
    }),
  }),
});

export const { useCreateBookingMutation, useMyBookingQuery } = bookingApi;
