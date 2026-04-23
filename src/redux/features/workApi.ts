import { baseApi } from "../api/baseApi";


const howItWorksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createHowItWorks: builder.mutation({
      query: (formData: FormData) => ({
        url: "/how-it-works",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["HowItWorks"],
    }),

    getAllHowItWorks: builder.query({
      query: () => ({
        url: "/how-it-works",
        method: "GET",
      }),
      providesTags: ["HowItWorks"],
    }),

    getHowItWorksById: builder.query({
      query: (id: string) => ({
        url: `/how-it-works/${id}`,
        method: "GET",
      }),
      providesTags: ["HowItWorks"],
    }),

    updateHowItWorks: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/how-it-works/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["HowItWorks"],
    }),

    deleteHowItWorks: builder.mutation({
      query: (id: string) => ({
        url: `/how-it-works/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HowItWorks"],
    }),
  }),
});

export const {
  useCreateHowItWorksMutation,
  useGetAllHowItWorksQuery,
  useGetHowItWorksByIdQuery,
  useUpdateHowItWorksMutation,
  useDeleteHowItWorksMutation,
} = howItWorksApi;