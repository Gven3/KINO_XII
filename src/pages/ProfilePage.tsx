import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { useAuthModal } from "@/features/auth/hooks/useAuthModal";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { ProfileTabs } from "@/features/profile/components/ProfileTabs";

export function ProfilePage() {
  const { user, isLoading } = useCurrentUser();
  const { openAuth } = useAuthModal();
  const hasPrompted = useRef(false);

  // Profile is for logged in users only: guests get the login modal.
  useEffect(() => {
    if (isLoading || user || hasPrompted.current) return;
    hasPrompted.current = true;
    openAuth("login");
  }, [isLoading, user, openAuth]);

  return (
    <div className="px-15 pt-36 pb-16 flex flex-col gap-8">
      <h1 className="text-h1 text-white">My Profile</h1>
      {user ? (
        <>
          <ProfileTabs />
          <Outlet />
        </>
      ) : (
        !isLoading && (
          <p className="text-muted text-body-l">Log in to see your profile.</p>
        )
      )}
    </div>
  );
}
