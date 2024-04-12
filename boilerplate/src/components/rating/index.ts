import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import star from './star.svg';

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  @property({ type: String })
  ratingComponentText: string = '';

  @property({ type: Number })
  numberOfStars = 5;

  static styles = css`
  `;

  protected render() {
    return html`
    <div> 
    ${Array.from({ length: this.numberOfStars }, () => {
      return html`<img class="" src="${star}" alt="star"></img>`
    })}
    </div>
      <div> ${this.ratingComponentText} </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'case-rating': CaseRating;
  }
}
