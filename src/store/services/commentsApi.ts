/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:3000";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    comment: builder.mutation<
      any,
      { text: string; author: string; article: string }
    >({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
    }),
    getCommentsByArticle: builder.query<any, any>({
      query: (id) => ({
        url: `/comments/article/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
    useCommentMutation,
    useGetCommentsByArticleQuery,
} = commentsApi;
