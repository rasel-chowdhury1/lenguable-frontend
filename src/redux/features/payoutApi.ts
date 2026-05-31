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

    // // Teacher — check onboarding status
    // checkOnboardingStatus: build.query({
    //   query: () => "/payout/onboarding-status",
    //   providesTags: ["Payout"],
    // }),

    checkOnboardingStatus: build.query({
      query: () => "/payout/onboarding-status",
      providesTags: ["Payout"],
      // Invalidate user cache when onboarding status is fetched
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.isOnboarded) {
            dispatch(baseApi.util.invalidateTags(["User"]));
          }
        } catch {}
      },
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
