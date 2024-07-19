const context: AudioContext = new AudioContext();
const mainVolume: GainNode = context.createGain();
const { destination }: { destination: AudioDestinationNode } = context;

mainVolume.connect(destination);

const play = (audioBuffer: AudioBuffer, volume: number = 1) => {
  const audioNode = new AudioBufferSourceNode(context);
  audioNode.buffer = audioBuffer;

  const audioVolume = new GainNode(context);
  audioVolume.gain.value = volume;

  audioNode.connect(audioVolume);
  audioVolume.connect(mainVolume);

  audioNode.start();
};

export { play };
