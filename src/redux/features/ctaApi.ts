/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

const ctaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // READ
    getCTA: builder.query({
      query: () => "/cta",
      providesTags: ["CTA"],
    }),

    // CREATE
    createCTA: builder.mutation({
      query: (formData: FormData) => ({
        url: "/cta",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["CTA"],
    }),

    // UPDATE
    updateCTA: builder.mutation({
      query: ({ id, formData }: any) => ({
        url: `/cta/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["CTA"],
    }),

    // DELETE (NEW)
    deleteCTA: builder.mutation({
      query: (id: string) => ({
        url: `/cta/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CTA"],
    }),
  }),
});

export const {
  useGetCTAQuery,
  useCreateCTAMutation,
  useUpdateCTAMutation,
  useDeleteCTAMutation,
} = ctaApi;
