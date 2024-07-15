import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class Grid extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        --resGap: clamp(40px, 3dvw, 64px);
        --gap: var(--grid-gap, 64px);
        --gap-md: var(--grid-gap-md, 32px);
        --gap-sm: var(--grid-gap-sm, 24px);
        --gap-xs: var(--grid-gap-xs, 16px);
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(calc(var(--col-width) - var(--gap)), 1fr));
        gap: var(--gap);
        width: 100%;
        max-width: var(--max-width, 100%);
        margin: auto;
      }

      @media screen and (max-width: 1199px) {
        :host {
          gap: var(--gap-md);
        }
      }

      @media screen and (max-width: 767px) {
        :host {
          gap: var(--gap-sm);
        }
      }

      @media screen and (max-width: 479px) {
        :host {
          gap: var(--gap-xs);
        }
      }
    `;
  }

  render() {
    return html`<slot></slot>`; // Use slot for child elements
  }
}

customElements.define("bw-grid", Grid);