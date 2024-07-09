import { customElement, property, state } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';
import { Ref, ref, createRef } from 'lit/directives/ref.js';

import { getNextStep } from '@/utils/stepper';
import { getTempo } from '@/utils/get-tempo';

@customElement('x-sequencer')
export default class Sequencer extends LitElement {
  static styles = css`
    .sequencer__steps {
      display: grid;
      grid-template-columns: repeat(var(--steps), 1fr);
      gap: var(--size-6);

      text-align: center;
    }

    .sequencer__step {
      width: 100%;
      height: 2rem;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: var(--radius-2);
      background: transparent;

      transition: background-color 0.15s var(--ease-in-3);
    }

    .sequencer__step.is-active {
      background-color: var(--red-12);
    }

    .sequencer__controls {
      display: flex;
      gap: var(--size-3);
    }
  `;

  @property({ type: Number })
  steps: number = 10;

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

    this._intervalId = setInterval(() => {
      this._updateStep();
    }, this.tempo);
  }

  private _stop() {
    clearInterval(this._intervalId);

    this._currentStep = undefined;
  }

  private _updateStep() {
    this._currentStep = getNextStep(this._currentStep, this.steps);

    const event = new CustomEvent('step-changed', {
      detail: {
        step: this._currentStep,
      },
    });

    this.dispatchEvent(event);
  }

  private _onTempoSliderChanged() {
    const sliderValue = this._tempoElement.value!.valueAsNumber;

    this.tempo = getTempo(sliderValue);

    this._start();
  }

  protected render() {
    const stepsElements = new Array(this.steps).fill(0).map((_, i) => html` <div class="sequencer__step ${this._currentStep === i ? css`is-active` : css``}">${i + 1}</div> `);

    return html`
      <div class="sequencer" style="--steps: ${this.steps + 1}">
        <div class="sequencer__steps">${stepsElements}</div>
        <div class="sequencer__controls">
          <div>
            <button @click="${this._toggle}">${this._isActive ? 'Stop' : 'Play'}</button>
          </div>

          <input ${ref(this._tempoElement)} type="range" min="0" max="1" step="0.1" @input="${this._onTempoSliderChanged}" />
        </div>
      </div>
    `;
  }
}
