import { baseApi } from "../api/baseApi";

const whatYouGetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWhatYouGet: builder.mutation({
      query: (data) => ({
        url: "/what-you-get",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WhatYouGet"],
    }),

    getAllWhatYouGet: builder.query({
      query: () => ({
        url: "/what-you-get",
        method: "GET",
      }),
      providesTags: ["WhatYouGet"],
    }),

    getWhatYouGetById: builder.query({
      query: (id: string) => ({
        url: `/what-you-get/${id}`,
        method: "GET",
      }),
      providesTags: ["WhatYouGet"],
    }),

    updateWhatYouGet: builder.mutation({
      query: ({ id, data }: { id: string; data: object }) => ({
        url: `/what-you-get/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["WhatYouGet"],
    }),

    deleteWhatYouGet: builder.mutation({
      query: (id: string) => ({
        url: `/what-you-get/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WhatYouGet"],
    }),
  }),
});

export const {
  useCreateWhatYouGetMutation,
  useGetAllWhatYouGetQuery,
  useGetWhatYouGetByIdQuery,
  useUpdateWhatYouGetMutation,
  useDeleteWhatYouGetMutation,
} = whatYouGetApi;
