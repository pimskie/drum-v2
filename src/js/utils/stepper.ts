const getNextStep = (
  currentStep: number | undefined,
  totalSteps: number,
): number => {
  if (currentStep === undefined) {
    return 0;
  }

  return (currentStep + 1 + totalSteps) % totalSteps;
};

export { getNextStep };
