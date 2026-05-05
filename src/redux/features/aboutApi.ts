import { baseApi } from "../api/baseApi";

const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAbout: builder.mutation({
      query: (formData: FormData) => ({
        url: "/about",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["About"],
    }),

    getAllAbout: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      providesTags: ["About"],
    }),

    getAboutById: builder.query({
      query: (id: string) => ({
        url: `/about/${id}`,
        method: "GET",
      }),
      providesTags: ["About"],
    }),

    updateAbout: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/about/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["About"],
    }),

    deleteAbout: builder.mutation({
      query: (id: string) => ({
        url: `/about/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const {
  useCreateAboutMutation,
  useGetAllAboutQuery,
  useGetAboutByIdQuery,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
} = aboutApi;
