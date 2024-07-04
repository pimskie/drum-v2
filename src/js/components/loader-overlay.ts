import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('x-loader-overlay')
export class LoaderOverlay extends LitElement {
  static styles = css`
    .loader {
      position: absolute;
    }
  `;

  render() {
    return html`<div class="loader">
      <div class="loader__spinner"></div>
    </div>`;
  }
}
