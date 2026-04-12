import { baseApi } from "../api/baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateStudent: build.mutation({
      query: ({ id, file, ...data }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (file) {
          formData.append("file", file);
        }
        return {
          url: `/student/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Student"],
    }),
  }),
});

export const { useUpdateStudentMutation } = studentApi;
