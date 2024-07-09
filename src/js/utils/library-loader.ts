import { Sample } from '@/types/Sample';

interface SampleLoadResonse {
  url: string;
  name: string;
  audioBuffer: AudioBuffer;
}

const context = new AudioContext();

const loadSample = async ({ name, url }: { name: string; url: string }) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const audioBuffer = await context.decodeAudioData(buffer);

  const loadResponse: SampleLoadResonse = {
    url,
    name,
    audioBuffer,
  };

  return loadResponse;
};

const loadLibrary = async () => {
  const library = new Map();

  const sampleNames: string[] = Object.values(Sample);

  const promises = sampleNames.map((sampleName) =>
    loadSample({
      url: `/audio/${sampleName}.wav`,
      name: sampleName,
    }),
  );

  const sampleResponses = await Promise.all(promises);

  sampleResponses.forEach(({ name, audioBuffer }) => {
    library.set(name, audioBuffer);
  });

  return library;
};

export { loadLibrary };
