import { baseApi } from "../api/baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Student — create a review
    createReview: build.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    // Student — update own review
    updateReview: build.mutation({
      query: ({ reviewId, ...data }) => ({
        url: `/review/${reviewId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),

    // Student — delete own review
    deleteReview: build.mutation({
      query: (reviewId: string) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),

    // Student — get own reviews
    getMyReviews: build.query({
      query: () => "/review/my",
      providesTags: ["Review"],
    }),

    // Public — get reviews for a specific teacher
    getTeacherReviews: build.query({
      query: (teacherId: string) => `/review/teacher/${teacherId}`,
      providesTags: ["Review"],
    }),

    // Admin — get all reviews
    getAllReviews: build.query({
      query: () => "/review",
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetMyReviewsQuery,
  useGetTeacherReviewsQuery,
  useGetAllReviewsQuery,
} = reviewApi;
