import { customElement } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import '@/components/row';

import { Sample } from '@/types/Sample';

const samples: Sample[] = Object.values(Sample);

@customElement('x-rack')
export default class Rack extends LitElement {
  render() {
    return html`
      <h1>Samples</h1>
      ${samples.map((sample) => html`<x-row sample="${sample}" />`)}
    `;
  }
}
