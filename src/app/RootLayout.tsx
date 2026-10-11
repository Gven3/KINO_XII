import { useEffect } from "react";
import { Outlet } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { CURRENT_USER_KEY } from "@/features/auth/hooks/useCurrentUser";
import { UNAUTHORIZED_EVENT } from "@/lib/apiClient";
import { Header } from "@/components/layout/Header";
import { AuthModal } from "@/features/auth/components/AuthModal";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout() {
  const queryClient = useQueryClient();
  const { openAuth } = useAuthModal();

  // Any 401 logs the user out locally and opens the login modal.
  useEffect(() => {
    const handleUnauthorized = () => {
      queryClient.setQueryData(CURRENT_USER_KEY, null);
      openAuth("login");
    };
    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () =>
      window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [queryClient, openAuth]);

  return (
    // Full-height column: on short pages the footer stays at the bottom.
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}
