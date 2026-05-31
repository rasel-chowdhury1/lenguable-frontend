import { baseApi } from "../api/baseApi";

export const teacherApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTeacher: build.query({
      query: () => ({
        url: "/teacher",
        method: "GET",
      }),
      providesTags: ["Teacher"],
    }),
    updateTeacher: build.mutation({
      query: ({ id, file, ...data }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (file) {
          formData.append("file", file);
        }
        return {
          url: `/teacher/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Teacher", "User"],
    }),
  }),
});

export const { useGetTeacherQuery, useUpdateTeacherMutation } = teacherApi;
