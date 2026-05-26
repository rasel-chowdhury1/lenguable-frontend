import { baseApi } from "../api/baseApi";

// Helper
const getBrowserTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const availabilityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAvailability: build.mutation({
      query: (data) => ({
        url: `/availability?timezone=${getBrowserTimezone()}`,
        method: "POST",
        body: data,
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
        url: `/availability/${availabilityId}/slots/${slotId}?timezone=${getBrowserTimezone()}`,
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
