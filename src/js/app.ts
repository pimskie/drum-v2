import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { Ref, ref, createRef } from 'lit/directives/ref.js';

import { loadLibrary } from '@/utils/library-loader';
import '@/components/rack';
import '@/components/sequencer';

import XRack from '@/components/rack';

@customElement('x-app')
export default class App extends LitElement {
  static styles = css`
    .app {
      position: relative;

      display: grid;
      gap: var(--size-6);
    }
  `;

  @state()
  protected _rackElement: Ref<XRack> = createRef();

  @state()
  protected _isLoading: boolean = false;

  @state()
  protected _sampleLibrary?: Map<string, AudioBuffer>;

  constructor() {
    super();

    this._init();
  }

  private async _init() {
    await this._loadLibrary();
  }

  private async _loadLibrary() {
    this._isLoading = true;

    this._sampleLibrary = await loadLibrary();

    this._isLoading = false;
  }

  private _onStepChanged(e: CustomEvent) {
    const { detail } = e;
    const { step } = detail;

    this._rackElement.value!.getActiveSamples(step);
  }

  protected render() {
    return html`
      <div class="app">
        <x-rack ${ref(this._rackElement)}></x-rack>
        <x-sequencer @step-changed="${this._onStepChanged}"></x-sequencer>
      </div>
    `;
  }
}
