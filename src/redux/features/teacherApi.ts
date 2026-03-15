/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../api/baseApi";

export const teacherApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTeacher: build.query({
      query: () => ({
        url: "/teacher",
        method: "GET",
      }),
    }),
    updateTeacher: build.mutation({
      query: ({ id, ...data }: { id: string; [key: string]: any }) => ({
        url: `/teacher/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Teacher", "User"],
    }),
  }),
});

export const { useGetTeacherQuery, useUpdateTeacherMutation } = teacherApi;
