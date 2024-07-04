import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { Sample } from '@/types/Sample';

import { padColors } from '@/config/pad-colors';

@customElement('x-pad')
export class Pad extends LitElement {
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

  @state()
  protected _isActive: boolean = false;

  toggle() {
    this._isActive = !this._isActive;
  }

  render() {
    return html`<button
      class="pad ${this._isActive ? css`is-active` : css``}"
      style="--border-color: ${padColors[this.sample]}"
      @click="${this.toggle}"
    >
      ${this.sample}
    </button> `;
  }
}
