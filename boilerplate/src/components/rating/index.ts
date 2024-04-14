import { html, LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement(`case-rating`)
export class CaseRating extends LitElement {
  @property({ type: Number })
  numberOfStars = 5;

  @property({ type: Number })
  numberOfRatedStar = 0;

  @property({ type: Boolean })
  disabled = false;

  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getStarClassName(i: number): string {
    let isStarRated = i < this.numberOfRatedStar;
    if (isStarRated) {
      return this.disabled ? 'star_disabled' : 'star_is_rated';
    } else {
      return 'star_not_rated';
    }
  }

  handleStarClick(i: number) {
    this.numberOfRatedStar = i + 1;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (event.key === 'ArrowUp' && this.numberOfRatedStar < 5) {
      this.numberOfRatedStar++;
    } else if (event.key === 'ArrowDown' && this.numberOfRatedStar > 0) {
      this.numberOfRatedStar--;
    } else if (/^[1-5]$/.test(event.key)) {
      this.numberOfRatedStar = parseInt(event.key);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  static styles = css`
  .star_disabled, .star_is_rated, .star_not_rated {
    border: 2px solid transparent;
    border-radius: 15%;
  }

  .component_enabled{
    star_disabled:hover, .star_is_rated:hover, .star_not_rated:hover {
    cursor: pointer;
    border: 2px solid #3c78c8;
    border-radius: 15%;
    }
  }
  .star_disabled path {
    fill: #989897
  }
  .star_is_rated path{
    fill: #cc8d19
  }
  .star_not_rated path {
    fill: #d4d4d4
  }
  `;

  protected render() {
    return html`
    <div class="${this.disabled ? "" : "component_enabled"}"> 
    ${Array.from({ length: this.numberOfStars }, (_, i) => {
      return html`<svg @click=${this.disabled ? () => { } : () => { this.handleStarClick(i); }} class="${this.getStarClassName(i)}"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.07512 22.3085L6.21423 14.999L0.476607 10.1393C0.269663 9.96838 0.120233 9.73794 0.0485476 9.4792C-0.0231375 9.22047 -0.0136153 8.94595 0.0758251 8.69282C0.165265 8.43968 0.330304 8.22015 0.548596 8.06394C0.766889 7.90774 1.02789 7.82241 1.29627 7.8195H8.29337L10.7823 0.859942C10.8692 0.60817 11.0324 0.394579 11.2492 0.239984C11.466 0.0853893 11.7256 0 11.9918 0C12.2581 0 12.5177 0.0853893 12.7345 0.239984C12.9513 0.394579 13.1145 0.60817 13.2013 0.859942L15.7103 7.8695H22.7074C22.977 7.87512 23.2384 7.96323 23.4564 8.12197C23.6744 8.28072 23.8386 8.50247 23.9268 8.75737C24.015 9.01227 24.023 9.28809 23.9498 9.54768C23.8765 9.80728 23.7255 10.0382 23.5171 10.2093L17.6195 15.049L19.9086 22.2385C20.0126 22.4941 20.0319 22.7711 19.9638 23.0385C19.8956 23.3058 19.7436 23.5439 19.53 23.7184C19.3164 23.8929 19.0524 23.985 18.7769 23.9984C18.5014 24.0118 18.2289 23.9414 17.9994 23.7884L12.0148 19.7187L6.00432 23.7884C5.78082 23.9337 5.51778 24.0088 5.2514 23.9984C4.98503 23.988 4.72841 23.8907 4.51687 23.7284C4.30534 23.5661 4.14927 23.3431 4.07016 23.0885C3.99105 22.8338 3.99278 22.5621 4.07512 22.3085Z"/>
      </svg>
      `
    })}
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'case-rating': CaseRating;
  }
}
