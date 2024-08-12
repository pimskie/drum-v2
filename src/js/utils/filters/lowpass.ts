import { context } from '@/utils/audio';

const options: BiquadFilterOptions = {
  type: 'lowpass',
};

const lowpassFilter = new BiquadFilterNode(context, options);

export { lowpassFilter };
