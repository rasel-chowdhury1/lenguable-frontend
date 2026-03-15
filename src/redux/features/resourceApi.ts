import { baseApi } from "../api/baseApi";
import { ResourceFormData } from "@/types";

export const resourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllResources: builder.query({
      query: () => ({
        url: "/resource",
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),

    getSingleResource: builder.query({
      query: (id: string) => ({
        url: `/resource/${id}`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),

    createResource: builder.mutation({
      query: (data: ResourceFormData) => ({
        url: "/resource",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Resource"],
    }),

    updateResource: builder.mutation({
      query: ({ id, data }: { id: string; data: ResourceFormData }) => ({
        url: `/resource/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Resource"],
    }),

    deleteResource: builder.mutation({
      query: (id: string) => ({
        url: `/resource/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resource"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllResourcesQuery,
  useGetSingleResourceQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
} = resourceApi;
