
import {
  Controller,
  useFormContext,
  useWatch,
} from "react-hook-form";

import type { CheckoutValues } from "../schemas/checkout";
import TextField from "./TextField";

export default function AddressStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CheckoutValues>();

  // Watch the selected country
  const country = useWatch({
    control,
    name: "address.country",
  });

  // Change the region label based on the selected country
  const regionLabel =
    country === "Ethiopia"
      ? "Region"
      : country === "United States"
        ? "State"
        : "State / Province";

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">
        Address Information
      </h2>

      {/* Street */}
      <TextField
        label="Street"
        {...register("address.street")}
        error={errors.address?.street?.message}
        autoComplete="street-address"
        inputMode="text"
      />

      {/* City */}
      <TextField
        label="City"
        {...register("address.city")}
        error={errors.address?.city?.message}
        autoComplete="address-level2"
        inputMode="text"
      />

      {/* Region / State */}
      <TextField
        label={regionLabel}
        {...register("address.state")}
        error={errors.address?.state?.message}
        autoComplete="address-level1"
        inputMode="text"
      />

      {/* Postal Code */}
      <TextField
        label="Postal Code"
        {...register("address.postalCode")}
        error={errors.address?.postalCode?.message}
        autoComplete="postal-code"
        inputMode="text"
      />

      {/* Country dropdown controlled by Controller */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="country"
          className="text-sm font-medium"
        >
          Country
        </label>

        <Controller
          name="address.country"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id="country"
              autoComplete="country-name"
              aria-invalid={Boolean(errors.address?.country)}
              aria-describedby={
                errors.address?.country
                  ? "country-error"
                  : undefined
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            >
              <option value="">Select your country</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Kenya">Kenya</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
            </select>
          )}
        />

        {errors.address?.country && (
          <p
            id="country-error"
            role="alert"
            className="text-sm text-red-600"
          >
            {errors.address.country.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <TextField
        label="Phone"
        type="tel"
        {...register("address.phone")}
        error={errors.address?.phone?.message}
        autoComplete="tel"
        inputMode="tel"
      />
    </div>
  );
}
