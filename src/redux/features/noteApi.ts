import { baseApi } from "../api/baseApi";

export const noteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // existing
    createNote: build.mutation({
      query: (data) => ({ url: "/note", method: "POST", body: data }),
      invalidatesTags: ["Note"],
    }),

    getAllNotes: build.query({
      query: () => "/note",
      providesTags: ["Note"],
    }),

    getNotesByStudent: build.query({
      query: (studentId: string) => `/note/student/${studentId}`,
      providesTags: ["Note"],
    }),

    // new — teacher
    getMyStudents: build.query({
      query: () => "/note/my-students",
      providesTags: ["Note"],
    }),

    getLessonsForStudent: build.query({
      query: (studentId: string) => `/note/students/${studentId}/lessons`,
      providesTags: ["Note"],
    }),

    unlockLesson: build.mutation({
      query: ({ studentId, lessonId }: { studentId: string; lessonId: string }) => ({
        url: `/note/students/${studentId}/lessons/unlock`,
        method: "PATCH",
        body: { lessonId },
      }),
      invalidatesTags: ["Note"],
    }),

    // new — student
    getMyLessons: build.query({
      query: () => "/note/my-lessons",
      providesTags: ["Note"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateNoteMutation,
  useGetAllNotesQuery,
  useGetNotesByStudentQuery,
  useGetMyStudentsQuery,
  useGetLessonsForStudentQuery,
  useUnlockLessonMutation,
  useGetMyLessonsQuery,
} = noteApi;