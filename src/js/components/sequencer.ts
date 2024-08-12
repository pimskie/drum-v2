import { customElement, property, state } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';
import { Ref, ref, createRef } from 'lit/directives/ref.js';

import { wrapIndex } from '@/utils/wrap-index';
import { getInterval } from '@/utils/get-interval';
import { steps } from '@/config';

@customElement('x-sequencer')
export default class Sequencer extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: subgrid;
    }

    .sequencer__controls {
      grid-column: 1 / -1;
      display: flex;
      gap: var(--size-3);
    }
  `;

  @property({ type: Number })
  steps: number = steps;

  @state()
  private _isActive: boolean = false;

  @state()
  tempo: number = 500;

  @state()
  private _currentStep: number | undefined = undefined;

  @state()
  _intervalId: number | undefined = undefined;

  @state()
  protected _tempoElement: Ref<HTMLInputElement> = createRef();

  private _toggle() {
    this._isActive = !this._isActive;

    this._isActive ? this._start() : this._stop();
  }

  private _start() {
    clearInterval(this._intervalId);

    this._intervalId = window.setInterval(() => {
      this._updateStep();
    }, this.tempo);
  }

  private _stop() {
    clearInterval(this._intervalId);

    this._currentStep = undefined;
  }

  private _updateStep() {
    this._currentStep = wrapIndex(this._currentStep, this.steps);

    const event = new CustomEvent('step-changed', {
      detail: {
        step: this._currentStep,
      },
    });

    this.dispatchEvent(event);
  }

  private _onTempoSliderChanged() {
    const sliderValue = this._tempoElement.value!.valueAsNumber;

    this.tempo = getInterval(sliderValue);

    this._start();
  }

  protected render() {
    return html`
      <div class="sequencer__controls">
        <div>
          <button @click="${this._toggle}">
            ${this._isActive ? 'Stop' : 'Play'}
          </button>
        </div>

        <input
          ${ref(this._tempoElement)}
          type="range"
          min="0"
          max="1"
          step="0.1"
          @input="${this._onTempoSliderChanged}"
        />
      </div>
    `;
  }
}
