import { useAuthModal } from "../hooks/useAuthModal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import Modal from "./ui/Modal";

export function AuthModal() {
  const { view, closeAuth } = useAuthModal();
  //   const { isLoggedIn } = useCurrentUser();
  //   const activeView = isLoggedIn ? null : view;

  return (
    <Modal
      isOpen={view !== null}
      onClose={closeAuth}
      title={view === "register" ? "Sign Up" : "Log In"}
    >
      {view === "login" && <LoginForm />}
      {view === "register" && <RegisterForm />}
    </Modal>
  );
}
