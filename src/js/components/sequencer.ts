import { customElement, property, state } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';

import { getNextStep } from '@/utils/stepper';

@customElement('x-sequencer')
export default class Sequencer extends LitElement {
  static styles = css`
    .sequencer__steps {
      display: grid;
      grid-template-columns: repeat(var(--steps), 1fr);
      gap: var(--size-6);

      text-align: center;
    }
  `;

  @property({ type: Number })
  steps: number = 10;

  @property({ type: Number })
  tempo: number = 500;

  @state()
  private _isActive: boolean = false;

  @state()
  private _currentStep: number | undefined = undefined;

  @state()
  _intervalId: number | undefined = undefined;

  private _toggle() {
    this._isActive = !this._isActive;

    this._isActive ? this._start() : this._stop();
  }

  private _start() {
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

  protected render() {
    const stepsElements = new Array(this.steps)
      .fill(0)
      .map((_, i) => html` <div class="squencer__step">${i + 1}</div> `);

    return html`
      <div class="sequencer" style="--steps: ${this.steps}">
        <div class="sequencer__steps">${stepsElements}</div>
        <div class="sequencer__controls">
          <button @click="${this._toggle}">${this._isActive}</button>
          (${this._currentStep})
        </div>
      </div>
    `;
  }
}
