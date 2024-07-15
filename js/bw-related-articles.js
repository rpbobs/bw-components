import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-related-article.js";
import "./bw-overline-text.js";

//=== BwRelatedArticles ===//
class BwRelatedArticles extends LitElement {
  static properties = {
    articles: { type: Number },
  };

  static styles = css`
    :not(:defined) {
      visibility: hidden;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    * {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
    }

    p {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    :host {
      /* animation: fadeIn 0.3s ease-in-out; */
      /* display: block; */
    }

    .bw-related-articles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }

    /* Extra small devices (xs): 0px and up */
    @media screen and (max-width: 575.98px) {
      /* Your styles here */
    }

    /* Small devices (sm): 576px and up */
    @media screen and (min-width: 576px) {
      /* Your styles here */
    }

    /* Medium devices (md): 768px and up */
    @media screen and (min-width: 768px) {
    }

    /* Large devices (lg): 992px and up */
    @media screen and (min-width: 992px) {
      /* Your styles here */
    }

    /* Large devices (lg): 992px and up */
    @media screen and (min-width: 1024px) {
      /* Your styles here */
    }

    /* Extra large devices (xl): 1200px and up */
    @media screen and (min-width: 1200px) {
      .bw-related-articles {
        margin-top: 64px;
      }
    }
  `;

  constructor() {
    super();
    this.articles = 4;
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-related-articles-${BwRelatedArticles.instanceCounter++}`;
  }

  render() {
    return html`
      <bw-overline-text title="Articles" overline="Related"></bw-overline-text>
      <div class="bw-related-articles">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("bw-related-articles", BwRelatedArticles);
