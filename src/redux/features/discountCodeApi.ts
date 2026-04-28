import { baseApi } from "../api/baseApi";

export const discountCodeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    validateDiscountCode: builder.mutation({
      query: (data: { code: string; packageId: string }) => ({
        url: "/discount-code/validate",
        method: "POST",
        body: data,
      }),
    }),

    generateDiscountCode: builder.mutation({
      query: (data: { packageId: string; discountPercent: number }) => ({
        url: "/discount-code/generate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DiscountCode"],
    }),

    getAllDiscountCodes: builder.query({
      query: () => ({
        url: "/discount-code",
        method: "GET",
      }),
      providesTags: ["DiscountCode"],
    }),

    deleteDiscountCode: builder.mutation({
      query: (id: string) => ({
        url: `/discount-code/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DiscountCode"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useValidateDiscountCodeMutation,
  useGenerateDiscountCodeMutation,
  useGetAllDiscountCodesQuery,
  useDeleteDiscountCodeMutation,
} = discountCodeApi;