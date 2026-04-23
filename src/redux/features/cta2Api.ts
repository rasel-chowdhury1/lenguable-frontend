import { baseApi } from "../api/baseApi";

export const cta2Api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET
    getCTA2: builder.query({
      query: () => "/cta-2",
      providesTags: ["CTA2"],
    }),

    // CREATE
    createCTA2: builder.mutation({
      query: (data) => ({
        url: "/cta-2",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CTA2"],
    }),

    // UPDATE
    updateCTA2: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cta-2/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CTA2"],
    }),

    // DELETE
    deleteCTA2: builder.mutation({
      query: (id) => ({
        url: `/cta-2/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CTA2"],
    }),
  }),
});

export const {
  useGetCTA2Query,
  useCreateCTA2Mutation,
  useUpdateCTA2Mutation,
  useDeleteCTA2Mutation,
} = cta2Api;