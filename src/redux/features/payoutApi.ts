import { baseApi } from "../api/baseApi";

export const payoutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Teacher — connect Stripe account
    connectStripe: build.mutation({
      query: () => ({
        url: "/payout/connect",
        method: "POST",
      }),
    }),

    // Teacher — check onboarding status
    checkOnboardingStatus: build.query({
      query: () => "/payout/onboarding-status",
      providesTags: ["Payout"],
    }),

    // Teacher — get own payout history
    getMyPayouts: build.query({
      query: () => "/payout/my",
      providesTags: ["Payout"],
    }),

    // Admin — get all payouts
    getAllPayouts: build.query({
      query: () => "/payout",
      providesTags: ["Payout"],
    }),
  }),
});

export const {
  useConnectStripeMutation,
  useCheckOnboardingStatusQuery,
  useGetMyPayoutsQuery,
  useGetAllPayoutsQuery,
} = payoutApi;