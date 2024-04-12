import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  @property({ type: String })
  ratingComponentText: string = '';

  render() {
    return html`<div>${this.ratingComponentText}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'case-rating': CaseRating;
  }
}
