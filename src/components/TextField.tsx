
import type { InputHTMLAttributes } from "react";

type TextFieldProps = {
  label: string;
  name: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function TextField({
  label,
  name,
  error,
  id,
  ...inputProps
}: TextFieldProps) {
  const inputId = id ?? name;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className="text-sm font-medium"
      >
        {label}
      </label>

      <input
        {...inputProps}
        id={inputId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-lg border px-3 py-2 outline-none ${
          error
            ? "border-red-500 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-100"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`}
      />

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
