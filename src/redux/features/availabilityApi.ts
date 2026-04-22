// import { baseApi } from "../api/baseApi";

// export const availabilityApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     createAvailability: build.mutation({
//       query: (data) => ({
//         url: "/availability",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Availability"],
//     }),

//     getAllAvailability: build.query({
//       query: () => "/availability",
//       providesTags: ["Availability"],
//     }),

//     getMyAvailability: build.query({
//       query: () => "/availability/me",
//       providesTags: ["Availability"],
//     }),
//   }),
// });

// export const {
//   useCreateAvailabilityMutation,
//   useGetAllAvailabilityQuery,
//   useGetMyAvailabilityQuery,
// } = availabilityApi;

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

    updateSlot: build.mutation({
      query: ({ availabilityId, slotId, ...data }) => ({
        url: `/availability/${availabilityId}/slots/${slotId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Availability"],
    }),

    deleteSlot: build.mutation({
      query: ({ availabilityId, slotId }) => ({
        url: `/availability/${availabilityId}/slots/${slotId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Availability"],
    }),
  }),
});

export const {
  useCreateAvailabilityMutation,
  useGetAllAvailabilityQuery,
  useGetMyAvailabilityQuery,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
} = availabilityApi;