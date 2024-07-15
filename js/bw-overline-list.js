import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== BwOverlineList ===//
class BwOverlineList extends LitElement {
  static properties = {
    overline: { type: String },
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
      animation: fadeIn 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      padding: 12px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);

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

    .bw-overline-list-overline {
      color: rgba(0, 0, 0, 0.87);
      font-family: var(--bw-font-body, Inter), sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 171.429% */
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .bw-overline-list-text {
      color: rgba(0, 0, 0, 0.72);
      font-family: var(--bw-font-body, Inter), sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 23px; /* 175% */
    }
  `;

  constructor() {
    super();
    this.overline = "Overline";
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-overline-list-${BwOverlineList.instanceCounter++}`;
  }

  render() {
    return html`
      <span class="bw-overline-list-overline">${this.overline}</span>
      <div class="bw-overline-list-text"><slot>Text</slot></div>
    `;
  }
}

customElements.define("bw-overline-list", BwOverlineList);
