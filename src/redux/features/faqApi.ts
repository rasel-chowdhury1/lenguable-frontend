import { baseApi } from "../api/baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFAQ: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    getAllFAQ: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: ["FAQ"],
    }),

    updateFAQ: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    deleteFAQ: builder.mutation({
      query: (id: string) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),
  }),
});

export const {
  useCreateFAQMutation,
  useGetAllFAQQuery,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;