// import { baseApi } from "../api/baseApi";

// export const purchaseApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     purchase: build.mutation({
//       query: (data: { packageId: string }) => ({
//         url: "/purchase",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Purchase"],
//     }),
//     getAllPurchases: build.query({
//       query: () => "/purchase",
//       providesTags: ["Purchase"],
//     }),
//   }),
// });

// export const { usePurchaseMutation, useGetAllPurchasesQuery } = purchaseApi;

import { baseApi } from "../api/baseApi";

export const purchaseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    purchase: build.mutation({
      query: (data: { packageId: string; discountCode?: string }) => ({
        url: "/purchase/checkout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Purchase"],
    }),
    getAllPurchases: build.query({
      query: () => "/purchase",
      providesTags: ["Purchase"],
    }),

    verifySession: build.query({
      query: (sessionId: string) => `/purchase/verify?session_id=${sessionId}`,
      providesTags: ["Purchase"],
    }),
  }),
});

export const {
  usePurchaseMutation,
  useGetAllPurchasesQuery,
  useVerifySessionQuery,
} = purchaseApi;
