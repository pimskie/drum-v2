import { customElement, property, queryAll } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import '@/components/row';

import XRow from '@/components/row';
import '@/components/sample-selector';
import { Sample } from '@/types/Sample';
import { defaultSamples, allSamples } from '@/config/samples';

@customElement('x-rack')
export default class Rack extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: subgrid;
    }

    .rack {
      display: grid;
      gap: var(--size-6);
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
    }

    .rack__rows {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      gap: var(--size-6);
    }

    .rack__controls {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
    }

    x-sample-selector {
      grid-column: 1 / -1;
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

  public getActiveSamples(step: number): { sample: Sample; volume: number }[] {
    const activeSamples = [...this._rowElements]
      .filter((r) => r.isActive(step))
      .map((r) => ({
        sample: r.sample,
        volume: r.volume,
      }));

    return activeSamples;
  }

  private _getAvailableSampleOptions() {
    return allSamples.filter((s) => !this.samples.includes(s));
  }

  private _onAddRow(e: CustomEvent) {
    this.samples = [...this.samples, e.detail.sample];
  }

  private _onDeleteRow(e: Event) {
    const row = e.target! as XRow;

    this.samples = this.samples.filter((s) => s !== row.sample);
  }

  private _renderSampleSelect() {
    const availableSamples = this._getAvailableSampleOptions();

    if (availableSamples.length) {
      return html`
        <x-sample-selector
          .samples="${availableSamples}"
          @add-sample="${this._onAddRow}"
        ></x-sample-selector>
      `;
    }

    return;
  }

  render() {
    return html`
      <div class="rack__title">
        <h1>Samples</h1>
      </div>
      <div class="rack">
        <div class="rack__rows">
          ${this.samples.map(
            (sample) =>
              html`<x-row sample="${sample}" @delete="${this._onDeleteRow}" />`,
          )}
        </div>

        <div class="rack__controls">${this._renderSampleSelect()}</div>
      </div>
    `;
  }
}
