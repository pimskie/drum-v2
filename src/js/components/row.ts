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
      grid-template-columns: repeat(var(--steps), 1fr);
      gap: var(--size-6);
    }
  `;

  @property({ type: Number })
  steps: number = 10;

  @property({ type: String })
  sample: Sample = Sample.bassdrum;

  @queryAll('x-pad')
  private _padElements!: XPad[];

  public isActive(step: number): boolean {
    const currentPad = this._padElements[step];

    return currentPad.isActive;
  }

  private _onDelete() {
    this.dispatchEvent(new Event('delete'));
  }

  protected render() {
    const stepsArray = new Array(this.steps).fill(0);

    return html`
      <div class="row" style="--steps: ${this.steps + 1}">
        ${stepsArray.map((_, index) => {
          return html` <x-pad data-index="${index}" sample="${this.sample}"></x-pad> `;
        })}
        <button @click="${this._onDelete}">x</button>
      </div>
    `;
  }
}
