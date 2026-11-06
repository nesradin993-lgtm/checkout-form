
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckoutSchema,
  type CheckoutValues,
} from "../schemas/checkout";

import Stepper from "./Stepper";
import AccountStep from "./AccountStep";
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<CheckoutValues>({
    resolver: zodResolver(CheckoutSchema),

    defaultValues: {
      account: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phone: "",
      },
      payment: {
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      },
    },

    mode: "onTouched",
    shouldUnregister: false,
  });

  const stepFields: FieldPath<CheckoutValues>[][] = [
    [
      "account.fullName",
      "account.email",
      "account.password",
      "account.confirmPassword",
    ],
    [
      "address.street",
      "address.city",
      "address.state",
      "address.postalCode",
      "address.country",
      "address.phone",
    ],
    [
      "payment.cardholderName",
      "payment.cardNumber",
      "payment.expiryDate",
      "payment.cvv",
    ],
  ];

  // Validate before moving to the next step
  const handleNext = async () => {
    const isValid = await methods.trigger(
      stepFields[currentStep - 1],
      { shouldFocus: true }
    );

    if (isValid) {
      setCurrentStep((step) => step + 1);
    }
  };

  // Go backward and preserve values
  const handleBack = () => {
    setCurrentStep((step) => step - 1);
  };

  // Handle the final form submission
  const onSubmit = (data: CheckoutValues) => {
    // Display the fully typed form data
    console.log("Checkout payload:", data);

    // Simulate a server-side field error
    methods.setError("payment.cardNumber", {
      type: "server",
      message: "This card was declined. Please try another card.",
    });

    // Simulate a general server error
    methods.setError("root.server", {
      type: "server",
      message: "Demo server error: Checkout could not be completed.",
    });
  };

  return (
    <FormProvider {...methods}>
      <form
  onSubmit={methods.handleSubmit(onSubmit)}
  onKeyDown={(event) => {
    if (
      event.key === "Enter" &&
      currentStep < 3 &&
      event.target instanceof HTMLInputElement
    ) {
      event.preventDefault();
      void handleNext();
    }
  }}
  noValidate
  className="mx-auto max-w-xl space-y-6 rounded-xl bg-white p-6 shadow-lg"
>
        <h1 className="text-2xl font-bold">
          Checkout Form
        </h1>

        <Stepper currentStep={currentStep} />

        {currentStep === 1 && <AccountStep />}
        {currentStep === 2 && <AddressStep />}
        {currentStep === 3 && <PaymentStep />}

        {/* Display general server error */}
        {methods.formState.errors.root?.server?.message && (
          <p
            role="alert"
            className="rounded-lg bg-red-100 p-3 text-sm text-red-700"
          >
            {methods.formState.errors.root.server.message}
          </p>
        )}

        <div className="flex justify-between">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg bg-gray-200 px-5 py-2"
            >
              Back
            </button>
          )}

          {currentStep < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto rounded-lg bg-blue-600 px-5 py-2 text-white"
            >
              Next
            </button>
          )}

          {currentStep === 3 && (
            <button
              type="submit"
              className="ml-auto rounded-lg bg-blue-600 px-5 py-2 text-white"
            >
              Place Order
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
