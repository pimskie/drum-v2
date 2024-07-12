import { Sample } from '@/types/Sample';
import type { SampleLibrary } from '@/types/SampleLibrary';

class Output {
  public sampleLibrary: SampleLibrary = new Map();

  private _context!: AudioContext;
  private _mainVolume!: GainNode;
  private _destination!: AudioDestinationNode;

  constructor() {
    this._init();
  }

  private _init() {
    this._context = new AudioContext();
    this._mainVolume = new GainNode(this._context);
    this._destination = this._context.destination;

    this._mainVolume.connect(this._destination);
  }

  public playSample(sampleId: Sample, volume: number = 1) {
    if (!this.sampleLibrary.has(sampleId)) {
      throw Error(`No sample with id "${sampleId}"`);
    }

    // volume for each sample
    const sampleGain = new GainNode(this._context);
    sampleGain.gain.value = volume;
    sampleGain.connect(this._destination);

    const audioBuffer: AudioBuffer = this.sampleLibrary.get(sampleId)!;
    const sourceNode = this._context.createBufferSource();

    sourceNode.buffer = audioBuffer;
    sourceNode.connect(sampleGain);
    sourceNode.start();
  }
}

export { Output };
