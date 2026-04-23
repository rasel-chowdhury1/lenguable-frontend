import { baseApi } from "../api/baseApi";

export const heroApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHero: build.mutation({
      query: (data) => ({
        url: "/hero",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),

    getHero: build.query({
      query: () => ({
        url: "/hero",
        method: "GET",
      }),
      providesTags: ["Hero"],
    }),

    updateHero: build.mutation({
      query: ({ id, data }) => ({
        url: `/hero/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),

    deleteHero: build.mutation({
      query: (id) => ({
        url: `/hero/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
});

export const {
  useCreateHeroMutation,
  useGetHeroQuery,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
} = heroApi;