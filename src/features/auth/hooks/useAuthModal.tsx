import { useSearchParams } from "react-router";
import { pendingAuthAction } from "../pendingAction";

export type AuthView = "login" | "register";

const AUTH_PARAM = "auth";

function isAuthView(value: string | null): value is AuthView {
  return value === "login" || value === "register";
}

export function useAuthModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(AUTH_PARAM);
  const view = isAuthView(value) ? value : null;

  const openAuth = (nextView: AuthView) => {
    setSearchParams((params) => {
      params.set(AUTH_PARAM, nextView);
      return params;
    });
  };

  const switchAuth = (nextView: AuthView) => {
    setSearchParams(
      (params) => {
        params.set(AUTH_PARAM, nextView);
        return params;
      },
      { replace: true },
    );
  };

  const closeAuth = () => {
    pendingAuthAction.clear();
    setSearchParams((params) => {
      params.delete(AUTH_PARAM);
      return params;
    });
  };

  return { view, openAuth, switchAuth, closeAuth };
}
