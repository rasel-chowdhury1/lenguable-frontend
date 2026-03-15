import { baseApi } from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTeacher: build.mutation({
      query: (data) => ({
        url: "/teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    createStudent: build.mutation({
      query: (data) => ({
        url: "/student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    getMe: build.query({
      query: () => "/user/getMe",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useCreateStudentMutation,
  useGetMeQuery,
} = userApi;
