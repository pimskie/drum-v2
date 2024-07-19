import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Ref, ref, createRef } from 'lit/directives/ref.js';

import { Sample } from '@/types/Sample';

import { loadLibrary } from '@/utils/library-loader';
import '@/components/rack';
import '@/components/sequencer';

import { Output } from '@/audio-components/output';

import XRack from '@/components/rack';

@customElement('x-app')
export default class App extends LitElement {
  static styles = css`
    .app {
      position: relative;

      display: grid;
      grid-template-columns: repeat(18, 1fr);

      border-radius: var(--radius-2);
      background: #9e9e9e;
      padding: var(--size-5);
    }

    x-rack {
      grid-column: 1 / -1;
    }

    x-sequencer {
      grid-column: 1 / -1;
    }
  `;

  @state()
  protected _rackElement: Ref<XRack> = createRef();

  @state()
  protected _isLoading: boolean = false;

  @state()
  protected _sampleLibrary?: Map<string, AudioBuffer>;

  @state()
  protected _output: Output;

  @state()
  protected _step?: number;

  constructor() {
    super();

    this._output = new Output();

    this._init();
  }

  private async _init() {
    await this._loadLibrary();
  }

  private async _loadLibrary() {
    this._isLoading = true;

    this._sampleLibrary = await loadLibrary();

    this._output.sampleLibrary = this._sampleLibrary;

    this._isLoading = false;
  }

  private _onStepChanged(e: CustomEvent) {
    const { detail } = e;
    const { step } = detail;
    const activeSamples = this._rackElement.value!.getActiveSamples(step);

    this._step = step;

    this._playSamples(activeSamples);
  }

  private _playSamples(samples: { sample: Sample; volume: number }[]) {
    samples.forEach(({ sample, volume }) =>
      this._output.playSample(sample, volume),
    );
  }

  protected render() {
    return html`
      <div class="app">
        <x-rack .currentStep="${this._step}" ${ref(this._rackElement)}></x-rack>
        <x-sequencer @step-changed="${this._onStepChanged}"></x-sequencer>
      </div>
    `;
  }
}
