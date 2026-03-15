import { baseApi } from "../api/baseApi";

export const packageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPackage: build.mutation({
      query: (data) => ({
        url: "/package",
        method: "POST",
        body: data,
      }),
    }),
    getAllPackages: build.query({
      query: () => "/package",
    }),
    getSinglePackage: build.query({
      query: (id) => `/package/${id}`,
    }),
    updatePackage: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/package/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePackage: build.mutation({
      query: (id) => ({
        url: `/package/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePackageMutation,
  useGetAllPackagesQuery,
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;
