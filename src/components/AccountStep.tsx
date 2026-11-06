
import { useFormContext } from "react-hook-form";
import type { CheckoutValues } from "../schemas/checkout";
import TextField from "./TextField";

export default function AccountStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutValues>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account Information</h2>

     
<TextField
  label="Full Name"
  {...register("account.fullName")}
  error={errors.account?.fullName?.message}
  autoComplete="name"
  inputMode="text"
/>

<TextField
  label="Email"
  type="email"
  {...register("account.email")}
  error={errors.account?.email?.message}
  autoComplete="email"
  inputMode="email"
/>

<TextField
  label="Password"
  type="password"
  {...register("account.password")}
  error={errors.account?.password?.message}
  autoComplete="new-password"
/>

<TextField
  label="Confirm Password"
  type="password"
  {...register("account.confirmPassword")}
  error={errors.account?.confirmPassword?.message}
  autoComplete="new-password"
/>

    </div>
  );
}
