import { Suspense, useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Flex, Spin } from "antd";

import { lazyImport } from "@/helpers";
import LayoutComponent from "@/components/templates/layout";
import { APP_ROUTES_PATHS } from "@/constants";

import { ProtectedRoute } from "./protected-route";
import { ProtectedRouteNoAuth } from "./protected-route-no-auth";

const { HomePage } = lazyImport(() => import("@/pages/HomePage"), "HomePage");
const { NoAuth } = lazyImport(() => import("@/pages/NoAuth"), "NoAuth");

const { ConfigWillPage } = lazyImport(
  () => import("@/pages/ConfigWillPage"),
  "ConfigWillPage"
);
const { DetailsPage } = lazyImport(
  () => import("@/pages/DetailsPage"),
  "DetailsPage"
);
const { NotFound } = lazyImport(
  () => import("@/routes/components/NotFound"),
  "NotFound"
);
const { ErrorPage } = lazyImport(
  () => import("@/routes/components/ErrorPage"),
  "ErrorPage"
);

export function AppRoutes() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          errorElement: <ErrorPage />,
          element: (
            <ProtectedRouteNoAuth>
              <LayoutComponent />
            </ProtectedRouteNoAuth>
          ),
          children: [
            {
              index: true,
              path: APP_ROUTES_PATHS.NO_AUTH,
              element: <NoAuth />,
            },

            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
        {
          path: "/",
          errorElement: <ErrorPage />,
          element: (
            <ProtectedRoute>
              <LayoutComponent />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              path: APP_ROUTES_PATHS.HOME,
              element: <HomePage />,
            },
            {
              path: `${APP_ROUTES_PATHS.DETAIL_WILL}/:willId`,
              element: <DetailsPage />,
            },
            {
              path: `${APP_ROUTES_PATHS.CONFIG_WILL}/:willType`,
              element: <ConfigWillPage />,
            },

            {
              path: "*",
              element: <NotFound />,
            },
          ],
        },
      ]),
    []
  );

  return (
    <Suspense
      fallback={
        <Flex
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            top: 0,
            backdropFilter: "blur(10px) hue-rotate(90deg)",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
          align="center"
          justify="center"
        >
          <Spin size="large" />
        </Flex>
      }
    >
      <RouterProvider
        router={router}
        fallbackElement={
          <Flex
            style={{
              position: "fixed",
              height: "100vh",
              width: "100vw",
              top: 0,
              backdropFilter: "blur(10px) hue-rotate(90deg)",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
            align="center"
            justify="center"
          >
            <Spin size="large" />
          </Flex>
        }
      />
    </Suspense>
  );
}
