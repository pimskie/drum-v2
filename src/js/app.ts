import { customElement, state } from 'lit/decorators.js';
import { LitElement, html, css } from 'lit';

import { loadLibrary } from '@/utils/library-loader';
import '@/components/rack';

@customElement('x-app')
export default class App extends LitElement {
  static styles = css`
    .app {
      position: relative;
    }
  `;

  @state()
  protected _isLoading: boolean = false;

  @state()
  protected _sampleLibrary?: Map<string, AudioBuffer>;

  constructor() {
    super();

    this.loadLibrary();
  }

  async loadLibrary() {
    this._isLoading = true;

    this._sampleLibrary = await loadLibrary();

    this._isLoading = false;
  }

  render() {
    return html`
      <div class="app">
        <x-rack></x-rack>
      </div>
    `;
  }
}
