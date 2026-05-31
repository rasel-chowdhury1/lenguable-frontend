import { baseApi } from "../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTeacher: build.mutation({
      query: (data) => ({
        url: "/teacher",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teacher"],
    }),

    createStudent: build.mutation({
      query: (data) => ({
        url: "/student",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),

    getMe: build.query({
      query: () => "/user/getMe",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useCreateStudentMutation,
  useGetMeQuery,
} = userApi;
