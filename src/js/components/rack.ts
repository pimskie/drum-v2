import { customElement, property, queryAll } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import '@/components/row';

import XRow from '@/components/row';
import { Sample } from '@/types/Sample';
import { defaultSamples, allSamples } from '@/config/samples';

@customElement('x-rack')
export default class Rack extends LitElement {
  static styles = css`
    .rack__rows {
      display: grid;
      gap: var(--size-6);
    }
  `;

  @queryAll('x-row')
  private _rowElements!: XRow[];

  @property({ type: Array })
  public samples: Sample[] = [];

  constructor() {
    super();

    this.samples = [...defaultSamples];
  }

  public getActiveSamples(step: number): Sample[] {
    const activeSamples = [...this._rowElements].filter((r) => r.isActive(step)).map((r) => r.sample);

    return activeSamples;
  }

  private _addRow() {
    // oldie but golie: re-assign to trigger re-render
    const [firstAvailableSample] = this._getAvailableSampleOptions();

    this.samples = [...this.samples, firstAvailableSample];
  }

  private _getAvailableSampleOptions() {
    return allSamples.filter((s) => !this.samples.includes(s));
  }

  private _renderAddRow() {
    const availableSamples = this._getAvailableSampleOptions();

    if (!availableSamples.length) {
      return;
    }

    return html`<button @click="${this._addRow}">Add</button>`;
  }

  render() {
    return html`
      <h1>Samples</h1>

      ${this._getAvailableSampleOptions()}

      <div class="rack">
        <div class="rack__rows">${this.samples.map((sample) => html`<x-row sample="${sample}" />`)}</div>
        <div class="rack__controls">${this._renderAddRow()}</div>
      </div>
    `;
  }
}
