import { lazy } from "react";

import { ERoutePaths, type TRoutePageType } from "./types";

const Home = lazy(() => import("../../pages/Home"));
const Error = lazy(() => import("../../pages/Error"));
const Profile = lazy(() => import("../../pages/Profile"));
const Article = lazy(() => import("../../pages/Article"));

//@TODO
// we fetch information directly in components: footer, registration and cart
// remove const PrivacyPolicy = lazy(() => import('pages/PrivacyPolicy'))

const routesList: TRoutePageType[] = [
  {
    element: Error,
    path: ERoutePaths.Error,
    title: "Error",
  },

  {
    element: Home,
    path: ERoutePaths.Home,
    title: "Home",
  },

  {
    element: Profile,
    path: ERoutePaths.Profile,
    title: "Profile",
    isPrivate: true,
  },

  {
    element: Article,
    path: ERoutePaths.Article,
    title: "Article,",
  },
];

export default routesList;
