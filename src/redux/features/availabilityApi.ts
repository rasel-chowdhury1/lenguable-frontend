import { baseApi } from "../api/baseApi";

// Helper to get the user's IANA timezone from the browser
const getBrowserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const availabilityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAvailability: build.mutation({
      query: (data) => ({
        url: "/availability",
        method: "POST",
        body: {
          ...data,
          timezone: getBrowserTimezone(),
        },
      }),
      invalidatesTags: ["Availability"],
    }),

    getAllAvailability: build.query({
      query: () => ({
        url: "/availability",
        params: { timezone: getBrowserTimezone() },
      }),
      providesTags: ["Availability"],
    }),

    getMyAvailability: build.query({
      query: () => ({
        url: "/availability/me",
        params: { timezone: getBrowserTimezone() },
      }),
      providesTags: ["Availability"],
    }),

    updateSlot: build.mutation({
      query: ({ availabilityId, slotId, ...data }) => ({
        url: `/availability/${availabilityId}/slots/${slotId}`,
        method: "PATCH",
        body: {
          ...data,
          timezone: getBrowserTimezone(),
        },
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
