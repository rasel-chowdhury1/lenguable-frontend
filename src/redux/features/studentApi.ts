import { baseApi } from "../api/baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateStudent: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/student/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const { useUpdateStudentMutation } = studentApi;
