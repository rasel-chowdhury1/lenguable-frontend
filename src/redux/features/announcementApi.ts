import { baseApi } from "../api/baseApi";

const announcementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnnouncement: builder.query({
      query: () => ({
        url: "/announcement",
        method: "GET",
      }),
    }),

    createAnnouncement: builder.mutation({
      query: (data) => ({
        url: "/announcements",
        method: "POST",
        body: data,
      }),
    }),

    updateAnnouncement: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/announcement/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteAnnouncement: builder.mutation({
      query: (id) => ({
        url: `/announcement/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAnnouncementQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
