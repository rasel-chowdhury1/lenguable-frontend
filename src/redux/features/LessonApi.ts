import { baseApi } from "../api/baseApi";

export const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL LESSONS
    getAllLessons: builder.query({
      query: () => ({
        url: "/lesson",
        method: "GET",
      }),
      providesTags: ["Lesson"],
    }),

    // GET SINGLE LESSON
    getSingleLesson: builder.query({
      query: (id: string) => ({
        url: `/lesson/${id}`,
        method: "GET",
      }),
      providesTags: ["Lesson"],
    }),

    // CREATE LESSON
    createLesson: builder.mutation({
      query: (data) => ({
        url: "/lesson/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lesson"],
    }),

    // UPDATE LESSON
    updateLesson: builder.mutation({
      query: ({ id, data }) => ({
        url: `/lesson/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Lesson"],
    }),

    // DELETE LESSON
    deleteLesson: builder.mutation({
      query: (id: string) => ({
        url: `/lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllLessonsQuery,
  useGetSingleLessonQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
