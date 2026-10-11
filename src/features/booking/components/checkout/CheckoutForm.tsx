import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TextField } from "@/features/auth/components/ui/TextField";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { applyServerErrors } from "@/lib/forms";
import { useCreateOrder } from "../../hooks/useCreateOrder";
import { checkoutSchema, type CheckoutValues } from "../../schemas";
import type { Order } from "../../types";
import { getBookingError } from "../../utils";

export const CHECKOUT_FORM_ID = "checkout-form";

const PREFILLED = ["fullName", "email", "mobileNumber"] as const;

type CheckoutFormProps = {
  holdId: string;
  onPaid: (order: Order) => void;
  onExpired: () => void;
  onContested: (codes: string[]) => void;
};

export function CheckoutForm({
  holdId,
  onPaid,
  onExpired,
  onContested,
}: CheckoutFormProps) {
  const { user } = useCurrentUser();
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors, touchedFields },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      mobileNumber: user?.mobileNumber ?? "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });
  const { mutateAsync: createOrder, isPending } = useCreateOrder();

  // Check the profile values right away, so they show as valid or not.
  useEffect(() => {
    trigger(PREFILLED);
  }, [trigger]);

  const isPrefilled = (field: keyof CheckoutValues) =>
    (PREFILLED as readonly string[]).includes(field);
  const showValid = (field: keyof CheckoutValues) =>
    !errors[field] && (touchedFields[field] || isPrefilled(field));

  const onSubmit = async (values: CheckoutValues) => {
    if (isPending) return;
    try {
      onPaid(await createOrder({ holdId, ...values }));
    } catch (error) {
      const { status, hasFieldErrors, contested } = getBookingError(error);
      if (status === 409) return onContested(contested);
      // 422 without field errors means the hold ran out.
      if (status === 422 && !hasFieldErrors) return onExpired();
      applyServerErrors(error, setError);
    }
  };

  return (
    <form
      id={CHECKOUT_FORM_ID}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col gap-2"
    >
      <TextField
        fieldSize="l"
        label="Full name"
        type="text"
        autoComplete="name"
        error={errors.fullName?.message}
        isValid={showValid("fullName")}
        {...register("fullName")}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          fieldSize="l"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          isValid={showValid("email")}
          {...register("email")}
        />
        <TextField
          fieldSize="l"
          label="Mobile number"
          type="tel"
          autoComplete="tel-national"
          placeholder="e.g. 555 123 456"
          error={errors.mobileNumber?.message}
          isValid={showValid("mobileNumber")}
          {...register("mobileNumber")}
        />
      </div>

      <div className="h-px my-4 shrink-0 bg-surface-light" />

      <TextField
        fieldSize="l"
        label="Card number"
        type="text"
        inputMode="numeric"
        autoComplete="cc-number"
        maxLength={19}
        placeholder="e.g. 1234 4567 8901 2345"
        error={errors.cardNumber?.message}
        isValid={showValid("cardNumber")}
        {...register("cardNumber")}
      />
      <div className="grid grid-cols-2 gap-4">
        <TextField
          fieldSize="l"
          label="Expiry"
          type="text"
          inputMode="numeric"
          autoComplete="cc-exp"
          maxLength={5}
          placeholder="e.g. 12/34"
          error={errors.expiry?.message}
          isValid={showValid("expiry")}
          {...register("expiry")}
        />
        <TextField
          fieldSize="l"
          label="CVV"
          type="password"
          inputMode="numeric"
          autoComplete="cc-csc"
          maxLength={3}
          placeholder="e.g. 123"
          error={errors.cvv?.message}
          isValid={showValid("cvv")}
          {...register("cvv")}
        />
      </div>

      {errors.root && (
        <p role="alert" className="text-body-m text-primary">
          {errors.root.message}
        </p>
      )}
    </form>
  );
}
