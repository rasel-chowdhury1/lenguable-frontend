import { baseApi } from "../api/baseApi";

export const purchaseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    purchase: build.mutation({
      query: (data: { packageId: string }) => ({
        url: "/purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Purchase"],
    }),
    getAllPurchases: build.query({
      query: () => "/purchase",
      providesTags: ["Purchase"],
    }),
  }),
});

export const { usePurchaseMutation, useGetAllPurchasesQuery } = purchaseApi;