import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import { HomePage } from "@/pages/HomePage";
import { MoviePage } from "@/pages/MoviePage";
import { SessionsPage } from "@/pages/SessionsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/movie/:slug", element: <MoviePage /> },
      { path: "/sessions", element: <SessionsPage /> },
    ],
  },
]);
