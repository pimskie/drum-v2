import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Sample } from '@/types/Sample';

@customElement('x-pad')
export class Pad extends LitElement {
  @property()
  sample: Sample = Sample.hihat;

  render() {
    return html`<button class="pad">${this.sample}</button> `;
  }
}
