import { useAuthModal } from "../hooks/useAuthModal";
import { RegisterForm } from "./RegisterForm";
import Modal from "./ui/Modal";

export function AuthModal() {
  const { view, switchAuth, closeAuth } = useAuthModal();
  //   const { isLoggedIn } = useCurrentUser();
  //   const activeView = isLoggedIn ? null : view;

  return (
    <Modal
      isOpen={view !== null}
      onClose={closeAuth}
      title={view === "register" ? "Sign up" : "Log in"}
    >
      {view === "login" && (
        <div>hello</div>
        // <LoginForm
        //   onSuccess={closeAuth}
        //   onSwitchToRegister={() => switchAuth("register")}
        // />
      )}
      {view === "register" && <RegisterForm />}
    </Modal>
  );
}
