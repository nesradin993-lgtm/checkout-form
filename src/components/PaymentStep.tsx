
import { useFormContext } from "react-hook-form";
import type { CheckoutValues } from "../schemas/checkout";
import TextField from "./TextField";

export default function PaymentStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutValues>();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Payment Information
      </h2>

      {/* Cardholder Name */}
      <TextField
        label="Cardholder Name"
        {...register("payment.cardholderName")}
        error={errors.payment?.cardholderName?.message}
        autoComplete="cc-name"
        inputMode="text"
      />

      {/* Card Number */}
      <TextField
        label="Card Number"
        {...register("payment.cardNumber")}
        error={errors.payment?.cardNumber?.message}
        autoComplete="cc-number"
        inputMode="numeric"
      />

      {/* Expiry Date */}
      <TextField
        label="Expiry Date (MM/YY)"
        {...register("payment.expiryDate")}
        error={errors.payment?.expiryDate?.message}
        autoComplete="cc-exp"
        inputMode="numeric"
        placeholder="MM/YY"
      />

      {/* CVV */}
      <TextField
        label="CVV"
        type="password"
        {...register("payment.cvv")}
        error={errors.payment?.cvv?.message}
        autoComplete="cc-csc"
        inputMode="numeric"
      />
    </div>
  );
}
