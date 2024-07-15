import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-icon-list.js";

//=== BwIconLists ===//
class BwIconLists extends LitElement {
  static properties = {};

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
      animation: fadeIn 0.3s ease-in-out;

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
        /* Your styles here */
      }
    }

    .bw-icon-lists {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `;

  constructor() {
    super();
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-icon-lists-${BwIconLists.instanceCounter++}`;
  }

  render() {
    return html`
      <div class="bw-icon-lists">
        <slot>
          <bw-icon-list dark></bw-icon-list>
          <bw-icon-list dark></bw-icon-list>
          <bw-icon-list dark></bw-icon-list>
          <bw-icon-list dark></bw-icon-list>
        </slot>
      </div>
    `;
  }
}

customElements.define("bw-icon-lists", BwIconLists);
