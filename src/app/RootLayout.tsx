import { Outlet } from "react-router";
import { Header } from "@/components/layout/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
