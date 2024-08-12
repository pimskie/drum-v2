const wrapIndex = (index: number | undefined, maxIndex: number): number => {
  if (index === undefined) {
    return 0;
  }

  return (index + 1) % (maxIndex + 1);
};

export { wrapIndex };
