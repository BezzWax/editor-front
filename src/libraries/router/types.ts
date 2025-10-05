import type { FC } from 'react'

export type TRoutePageType = {
  path: string
  element: FC
  title: string
  isPrivate?: boolean
  children?: TRoutePageType[]
  index?: boolean
}

export const ERoutePaths = {
  Error: '*',
  Home: '/',
  Profile: '/profile',
  Article: '/article/:id'
} as const