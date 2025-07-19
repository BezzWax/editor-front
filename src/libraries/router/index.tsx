import { type FC, Suspense, useEffect, useMemo } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { HelmetLayout, PageLayout, PrivateRoute, RouteLoader} from 'components'

import routesList from './routes'
import { getUserToken } from 'utils'

export const RoutesWrapper: FC = () => {
  const { pathname } = useLocation()
  const isAuthenticated = !!getUserToken()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])


  const renderRoutes = useMemo(
    () =>
      routesList.map(({ element: Element, path, title, isPrivate, children }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} isPrivate={isPrivate}>
              <Suspense fallback={<RouteLoader />}>
                <HelmetLayout title={title}>
                  <PageLayout>
                    <Element />
                  </PageLayout>
                </HelmetLayout>
              </Suspense>
            </PrivateRoute>
          }
        >
          {children?.map(({ element: ChildElement, path: childPath }) => (
            <Route key={childPath} path={childPath} element={<ChildElement />} />
          ))}
        </Route>
      )),
    [isAuthenticated]
  )

  return <Routes>{renderRoutes}</Routes>
}
