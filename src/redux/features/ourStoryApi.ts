import { baseApi } from "../api/baseApi";

const ourStoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOurStory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/our-story",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["OurStory"],
    }),

    getAllOurStory: builder.query({
      query: () => ({
        url: "/our-story",
        method: "GET",
      }),
      providesTags: ["OurStory"],
    }),

    getOurStoryById: builder.query({
      query: (id: string) => ({
        url: `/our-story/${id}`,
        method: "GET",
      }),
      providesTags: ["OurStory"],
    }),

    updateOurStory: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/our-story/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["OurStory"],
    }),

    deleteOurStory: builder.mutation({
      query: (id: string) => ({
        url: `/our-story/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OurStory"],
    }),
  }),
});

export const {
  useCreateOurStoryMutation,
  useGetAllOurStoryQuery,
  useGetOurStoryByIdQuery,
  useUpdateOurStoryMutation,
  useDeleteOurStoryMutation,
} = ourStoryApi;