
import { z } from "zod";

// ==========================================
// 1. ACCOUNT SCHEMA
// ==========================================

export const AccountSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  confirmPassword: z
    .string()
    .min(8, "Please confirm your password"),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);


// ==========================================
// 2. ADDRESS SCHEMA
// ==========================================

export const AddressSchema = z.object({
  street: z
    .string()
    .min(3, "Street address is required"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters"),

  state: z
    .string()
    .min(2, "State or region is required"),

  postalCode: z
    .string()
    .min(3, "Postal code must be at least 3 characters"),

  country: z
    .string()
    .min(2, "Please select a country"),

  phone: z
    .string()
    .min(7, "Please enter a valid phone number"),
});


// ==========================================
// 3. PAYMENT SCHEMA
// ==========================================

export const PaymentSchema = z.object({
  cardholderName: z
    .string()
    .min(3, "Cardholder name is required"),

  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "Enter a valid card number")
    .refine((cardNumber) => {
      const digits = cardNumber.split("").map(Number);

      let sum = 0;

      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];

        if ((digits.length - 1 - i) % 2 === 1) {
          digit *= 2;

          if (digit > 9) {
            digit -= 9;
          }
        }

        sum += digit;
      }

      return sum % 10 === 0;
    }, "Invalid card number"),

  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Use MM/YY format"
    )
    .refine((expiryDate) => {
      const [month, year] = expiryDate.split("/").map(Number);

      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear() % 100;

      return (
        year > currentYear ||
        (year === currentYear && month >= currentMonth)
      );
    }, "Card expiry date must be in the future"),

  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV must contain 3 or 4 digits"),
});


// ==========================================
// 4. COMPLETE CHECKOUT SCHEMA
// ==========================================

export const CheckoutSchema = z.object({
  account: AccountSchema,
  address: AddressSchema,
  payment: PaymentSchema,
});


// ==========================================
// 5. TYPESCRIPT TYPE
// ==========================================

export type CheckoutValues = z.infer<typeof CheckoutSchema>;
