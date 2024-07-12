import { customElement, property, queryAll } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';

import '@/components/pad';
import XPad from '@/components/pad';
import { Sample } from '@/types/Sample';

@customElement('x-row')
export default class Row extends LitElement {
  static styles = css`
    .row {
      display: grid;
      grid-template-columns: 1fr 10fr auto;
      gap: var(--size-6);
    }

    .row__pads {
      display: grid;
      grid-template-columns: repeat(var(--steps), 1fr);
      gap: var(--size-6);
    }

    .volume-input {
      padding: 0.75rem;
      width: 3rem;
    }
  `;

  @property({ type: Number })
  steps: number = 12;

  @property({ type: String })
  sample: Sample = Sample.bassdrum;

  @property({ type: Number })
  volume: number = 1;

  @queryAll('x-pad')
  private _padElements!: XPad[];

  public isActive(step: number): boolean {
    const currentPad = this._padElements[step];

    return currentPad.isActive;
  }

  private _onDelete() {
    this.dispatchEvent(new Event('delete'));
  }

  private _onVolumeChanged(e: InputEvent) {
    const volume = (e.target as HTMLInputElement)!.valueAsNumber;

    this.volume = volume;
  }

  protected render() {
    const stepsArray = new Array(this.steps).fill(0);

    return html`
      <div class="row" style="--steps: ${this.steps}">
        <div class="row__config">
          <div class="row__label">${this.sample}</div>
          <input
            class="volume-input"
            type="number"
            min="0"
            max="1"
            step="0.1"
            .value="${`${this.volume}`}"
            @input="${this._onVolumeChanged}"
          />
        </div>

        <div class="row__pads">
          ${stepsArray.map((_, index) => {
            return html`
              <x-pad data-index="${index}" sample="${this.sample}"></x-pad>
            `;
          })}
        </div>
        <button @click="${this._onDelete}">x</button>
      </div>
    `;
  }
}
