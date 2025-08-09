import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface RegisterDto {
  email: string
  username: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: number
    email: string
    username: string
  }
  access_token: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterDto>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    loginUser: builder.mutation<AuthResponse, LoginDto>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterUserMutation, useLoginUserMutation } = authApi
