import { Outlet } from "react-router";
import { Header } from "@/components/layout/Header";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </>
  );
}
