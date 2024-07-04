import { customElement } from 'lit/decorators.js';
import { LitElement, html } from 'lit';

import '@/components/rack';

@customElement('x-app')
export default class App extends LitElement {
  render() {
    return html` <x-rack /> `;
  }
}
