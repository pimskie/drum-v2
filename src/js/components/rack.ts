import { customElement, queryAll } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import '@/components/row';

import XRow from '@/components/row';
import { Sample } from '@/types/Sample';

const samples: Sample[] = Object.values(Sample);
@customElement('x-rack')
export default class Rack extends LitElement {
  static styles = css`
    .rack {
      display: grid;
      gap: var(--size-6);
    }
  `;

  @queryAll('x-row')
  private _rowElements!: XRow[];

  public getActiveSamples(step: number): Sample[] {
    const samples = [...this._rowElements]
      .filter((r) => r.isActive(step))
      .map((r) => r.sample);

    return samples;
  }

  render() {
    return html`
      <h1>Samples</h1>

      <div class="rack">
        ${samples.map((sample) => html`<x-row sample="${sample}" />`)}
      </div>
    `;
  }
}
