/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:3000";

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
    createArticle: builder.mutation<
      any,
      { title: string; content: string; author: string }
    >({
      query: (body) => ({
        url: "/articles",
        method: "POST",
        body,
      }),
    }),
    getArticles: builder.query<any[], void>({
      query: () => "/articles",
    }),
    getArticleById: builder.query<any, any>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "GET",
      }),
    }),
    getArticleByUserId: builder.query<any, any>({
      query: (id) => ({
        url: `/articles/author/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useCreateArticleMutation,
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  useGetArticleByUserIdQuery,
} = articlesApi;
