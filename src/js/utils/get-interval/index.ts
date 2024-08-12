const minInterval = 900;
const maxInterval = 200;

const diffTempo = minInterval - maxInterval;

const getInterval = (percentage: number): number => minInterval - percentage * diffTempo;

export { minInterval, maxInterval, getInterval };
