import { Suspense, useMemo } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { Flex, Spin } from "antd";
import { lazyImport } from "@/helpers";
import LayoutComponent from "@/components/templates/layout";
import { APP_ROUTES_PATHS } from "@/constants";

const { HomePage } = lazyImport(() => import("@/pages/HomePage"), "HomePage");
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
          element: <LayoutComponent />,
          children: [
            {
              path: "/",
              element: <Outlet />, // public route
              children: [
                {
                  index: true,
                  path: APP_ROUTES_PATHS.HOME,
                  element: <HomePage />,
                },
              ],
            },

            {
              path: APP_ROUTES_PATHS.DETAIL_WILL,
              element: <ProtectedRoute />,
              children: [
                {
                  path: ":willId",
                  element: <DetailsPage />,
                },
              ],
            },
            {
              path: APP_ROUTES_PATHS.CONFIG_WILL,
              element: <ProtectedRoute />,
              children: [
                {
                  path: ":willType",
                  element: <ConfigWillPage />,
                },
              ],
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
