import { createBrowserRouter } from "react-router";
import RootLayout from "./RootLayout";
import { HomePage } from "@/pages/HomePage";
import { MoviePage } from "@/pages/MoviePage";
import { SessionsPage } from "@/pages/SessionsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { PersonalInformation } from "@/features/profile/components/PersonalInformation";
import { MyTickets } from "@/features/tickets/components/MyTickets";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/movie/:slug", element: <MoviePage /> },
      { path: "/sessions", element: <SessionsPage /> },
      {
        path: "/profile",
        element: <ProfilePage />,
        children: [
          { index: true, element: <PersonalInformation /> },
          { path: "tickets", element: <MyTickets /> },
        ],
      },
    ],
  },
]);
