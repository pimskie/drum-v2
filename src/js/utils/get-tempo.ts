const getTempo = (percentage: number): number => {
  const minTempo = 900;
  const maxTempo = 200;
  const diffTempo = minTempo - maxTempo;

  // the lower the value, the higher the tempo
  const tempo = minTempo - percentage * diffTempo;

  return tempo;
};

export { getTempo };
