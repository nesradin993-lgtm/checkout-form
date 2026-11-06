
type StepperProps = {
  currentStep: number;
};

const steps = ["Account", "Address", "Payment"];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={step} className="flex flex-1 items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full font-semibold ${
                  isActive || isCompleted
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>

              <span className="text-xs">{step}</span>
            </div>

            {index < steps.length - 1 && (
              <div className="h-0.5 flex-1 bg-gray-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
