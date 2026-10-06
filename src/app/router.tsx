import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import { HomePage } from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
