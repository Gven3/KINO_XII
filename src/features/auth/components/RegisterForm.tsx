import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { applyServerErrors } from "@/lib/forms";
import { useAuthModal } from "../hooks/useAuthModal";
import { useRegister } from "../hooks/useRegister";
import { registerSchema, type RegisterValues } from "../schemas";
import { ImageUpload } from "./ImageUpload";
import { AuthButton } from "./ui/AuthButton";
import { TextField } from "./ui/TextField";

export function RegisterForm() {
  const { switchAuth, closeAuth } = useAuthModal();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid, touchedFields },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      avatar: null,
    },
  });
  const { mutateAsync: registerUser } = useRegister();

  const onSubmit = async (values: RegisterValues) => {
    try {
      await registerUser(values);
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
      <Controller
        name="avatar"
        control={control}
        render={({ field, fieldState }) => (
          <ImageUpload
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />

      <TextField
        type="text"
        label="Username"
        error={errors.username?.message}
        {...register("username")}
        isValid={touchedFields.username && !errors.username}
      />
      <TextField
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
        isValid={touchedFields.email && !errors.email}
      />

      <div className="grid grid-cols-2 items-start gap-3">
        <TextField
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password", { deps: ["password_confirmation"] })}
          isValid={touchedFields.password && !errors.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          error={errors.password_confirmation?.message}
          {...register("password_confirmation")}
          isValid={
            touchedFields.password_confirmation && !errors.password_confirmation
          }
        />
      </div>

      {errors.root && (
        <p role="alert" className="text-body-m text-primary">
          {errors.root.message}
        </p>
      )}

      <AuthButton type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Signing up..." : "Sign up"}
      </AuthButton>

      <p className="text-center text-body-m text-muted">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => switchAuth("login")}
          className="cursor-pointer text-button text-primary"
        >
          Log in
        </button>
      </p>
    </form>
  );
}
