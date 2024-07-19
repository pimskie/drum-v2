import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('x-heading')
export class Heading extends LitElement {
  static styles = css`
    .heading {
      margin-block-start: 0;
    }
  `;

  render() {
    return html`<h1 class="heading">
      <slot></slot>
    </h1>`;
  }
}
