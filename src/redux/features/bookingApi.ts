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
      query: () => ({
        url: "/booking",
        method: "GET",
        params: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }, 
      }),
      providesTags: ["Booking"],
    }),

    cancelBooking: build.mutation({
      query: ({ bookingId, reason }: { bookingId: string; reason: string }) => ({
        url: `/booking/${bookingId}/cancel`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useMyBookingQuery,
  useCancelBookingMutation,
} = bookingApi;