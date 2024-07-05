import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { Sample } from '@/types/Sample';
import { padColors } from '@/config/pad-colors';

@customElement('x-pad')
export default class Pad extends LitElement {
  static styles = css`
    .pad {
      width: 100%;
      aspect-ratio: 1/1;
      padding: var(--size-2);

      border: 3px solid var(--border-color);
      border-radius: var(--radius-3);

      filter: contrast(0.8);

      transition:
        filter 0.5s var(--ease-out-3),
        transform 0.1s var(--ease-out-3);
    }

    .pad.is-active {
      filter: contrast(2);
      transform: scale(1.04);
    }
  `;

  @property()
  sample: Sample = Sample.hihat;

  @property({ type: Boolean, reflect: true })
  isActive: boolean = false;

  toggle() {
    this.isActive = !this.isActive;
  }

  render() {
    return html`<button
      class="pad ${this.isActive ? css`is-active` : css``}"
      style="--border-color: ${padColors[this.sample]}"
      @click="${this.toggle}"
    >
      ${this.sample}
    </button> `;
  }
}
