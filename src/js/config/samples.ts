import { Sample } from '@/types/Sample';

const defaultSamples: Array<Sample> = [Sample.bassdrum, Sample.clap];
const allSamples: Sample[] = Object.values(Sample);

export { defaultSamples, allSamples };
