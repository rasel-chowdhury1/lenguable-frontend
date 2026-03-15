import { baseApi } from "../api/baseApi";

export const availabilityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAvailability: build.mutation({
      query: (data) => ({
        url: "/availability",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Availability"],
    }),

    getAllAvailability: build.query({
      query: () => "/availability",
      providesTags: ["Availability"],
    }),

    getMyAvailability: build.query({
      query: () => "/availability/me",
      providesTags: ["Availability"],
    }),
  }),
});

export const {
  useCreateAvailabilityMutation,
  useGetAllAvailabilityQuery,
  useGetMyAvailabilityQuery,
} = availabilityApi;
