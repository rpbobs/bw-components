import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== BwOverlineLists ===//
class BwOverlineLists extends LitElement {
  static properties = {
    title: { type: String },
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

      ::slotted(bw-overline-list:last-of-type) {
        border-color: transparent;
      }
    }

    .bw-overline-lists-title {
      color: #000;
      font-family: var(--bw-font-body, Inter), sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 150% */
      letter-spacing: 2px;
      text-transform: uppercase;
      border-bottom: 1px solid black;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
  `;

  constructor() {
    super();
    this.title = "Title";
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-overline-lists-${BwOverlineLists.instanceCounter++}`;
  }

  render() {
    return html`
      <div class="bw-overline-lists-title">${this.title}</div>
      <slot></slot>
    `;
  }
}

customElements.define("bw-overline-lists", BwOverlineLists);
