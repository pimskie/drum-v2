import { customElement, property } from 'lit/decorators.js';
import { html, css, LitElement } from 'lit';

import '@/components/pad';
import { Sample } from '@/types/Sample';

import { padColors } from '@/config/pad-colors';

const STEPS = 10;

@customElement('x-row')
export default class Row extends LitElement {
  static styles = css`
    .row {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      gap: var(--size-6);
    }
  `;

  @property({ type: Sample })
  sample: Sample = Sample.bassdrum;

  render() {
    const stepsArray = new Array(STEPS).fill(0);

    return html`
      <div class="row">
        ${stepsArray.map(() => html`<x-pad sample="${this.sample}" />`)}
      </div>
    `;
  }
}
