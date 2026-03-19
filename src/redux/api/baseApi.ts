import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    // baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    credentials: "include",
  }),
  tagTypes: [
    "Auth",
    "User",
    "Lesson",
    "Resource",
    "Availability",
    "Purchase",
    "Teacher",
    "Student",
    "Booking",
    "Note",
    "Payout",
  ],
  endpoints: () => ({}),
});
