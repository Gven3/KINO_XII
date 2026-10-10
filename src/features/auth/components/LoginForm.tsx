import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { applyServerErrors } from "@/lib/forms";
import { useAuthModal } from "../hooks/useAuthModal";
import { useLogin } from "../hooks/useLogin";
import { loginSchema, type LoginValues } from "../schemas";
import { AuthButton } from "./ui/AuthButton";
import { TextField } from "./ui/TextField";

export function LoginForm() {
  const { switchAuth, closeAuth } = useAuthModal();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields, isValid, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });
  const { mutateAsync: loginUser } = useLogin();

  const onSubmit = async (values: LoginValues) => {
    try {
      await loginUser(values);
      closeAuth();
    } catch (error) {
      applyServerErrors(error, setError);
    }
  };

  return (
    <form
      className="flex flex-col gap-6"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        isValid={touchedFields.email && !errors.email}
        {...register("email")}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        isValid={touchedFields.password && !errors.password}
        {...register("password")}
      />

      {errors.root && (
        <p role="alert" className="text-body-m text-primary">
          {errors.root.message}
        </p>
      )}

      <AuthButton type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Logging in..." : "Log in"}
      </AuthButton>

      <p className="text-center text-body-m text-muted">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => switchAuth("register")}
          className="cursor-pointer text-button text-primary"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
