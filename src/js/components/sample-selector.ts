import { customElement, property, state } from 'lit/decorators.js';
import { html, LitElement } from 'lit';
import { Ref, ref, createRef } from 'lit/directives/ref.js';

import '@/components/row';

import { Sample } from '@/types/Sample';

@customElement('x-sample-selector')
export default class SampleSelector extends LitElement {
  @property({ type: Array })
  samples: Sample[] = [];

  @state()
  protected _selectElement: Ref<HTMLSelectElement> = createRef();

  private _onAdd() {
    const sample: Sample = this._selectElement.value?.value as Sample;

    const event = new CustomEvent('add-sample', {
      detail: {
        sample,
      },
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      <select name="sample" ${ref(this._selectElement)}>
        ${this.samples.map((sample) => html` <option value="${sample}">${sample}</option> `)}
      </select>

      <button @click="${this._onAdd}">Add</button>
    `;
  }
}
