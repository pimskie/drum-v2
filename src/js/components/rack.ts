import { customElement, property, queryAll } from 'lit/decorators.js';
import { css, html, LitElement } from 'lit';
import '@/components/row';

import XRow from '@/components/row';
import '@/components/sample-selector';
import { Sample } from '@/types/Sample';
import { defaultSamples, allSamples } from '@/config/samples';
import { steps } from '@/config';

@customElement('x-rack')
export default class Rack extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: subgrid;
    }

    .rack {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
    }

    .rack__rows {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
    }

    x-row:nth-child(even) {
      background: #828181;
    }

    .rack__controls {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
    }

    .rack__steps {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 2 / -1;
      place-items: center;
    }

    .rack__step {
      width: 100%;
      height: 2rem;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: var(--radius-2);
      background: transparent;

      transition: background-color 0.1s var(--ease-in-3);
    }

    .rack__step.is-active {
      background-color: var(--red-12);
    }

    x-sample-selector {
      grid-column: 1 / -1;
    }
  `;

  @queryAll('x-row')
  private _rowElements!: XRow[];

  @property({ type: Array })
  public samples: Sample[] = [];

  @property({ type: Number })
  public steps: number = steps;

  @property({ type: Number })
  public currentStep?: number;

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

  public addRow(sample: Sample) {
    this.samples = [...this.samples, sample];
  }

  public deleteRow(sample: Sample) {
    this.samples = this.samples.filter((s) => s !== sample);
  }

  private _getAvailableSampleOptions() {
    return allSamples.filter((s) => !this.samples.includes(s));
  }

  private _onAddRow(e: CustomEvent) {
    this.addRow(e.detail.sample);
  }

  private _onDeleteRow(e: Event) {
    const row = e.target! as XRow;

    this.deleteRow(row.sample);
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
    const stepsArray = new Array(this.steps).fill(0);

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

        <div class="rack__steps">
          ${stepsArray.map((_, index) => {
            return html`
              <div
                class="rack__step ${this.currentStep === index
                  ? css`is-active`
                  : css``}"
              >
                ${index + 1}
              </div>
            `;
          })}
        </div>

        <div class="rack__controls">${this._renderSampleSelect()}</div>
      </div>
    `;
  }
}
