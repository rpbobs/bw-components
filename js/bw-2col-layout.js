import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-button.js";
import "./bw-overline-text.js";

//=== Bw2ColLayout ===//
class Bw2ColLayout extends LitElement {
  static properties = {
    title: { type: String },
    noTitle: { type: Boolean },
    overline: { type: String },
    right: { type: Boolean },
    btn: { type: Boolean },
    btnLink: { type: String },
    btnText: { type: String },
    noOverline: { type: Boolean },
    noPadding: { type: Boolean },
    xPadding: { type: Boolean },
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
    }

    .bw-2col-layout {
      padding: 40px 0;
    }

    .bw-2col-layout-content,
    .bw-2col-layout-content--right {
      display: flex;
      flex-direction: column-reverse;
      width: 100%;
      align-items: center;
      max-width: 1528px;
      margin: auto;
      gap: 24px;
    }

    .bw-2col-layout__left {
      width: 100%;
      color: rgba(0, 0, 0, 0.72);

      /* ::slotted(p) {
        color: rgba(0, 0, 0, 0.72);
      } */

      bw-overline-text {
        margin-bottom: 24px;
        color: black;
      }

      bw-button {
        margin-top: 56px;
      }
    }

    .bw-2col-layout__right {
      width: 100%;
      height: 100%;
    }

    .bw-2col-layout__title {
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .xy-padding {
      padding: 24px;
    }

    .x-padding {
      padding: 0 12px;
    }

    .y-padding {
      padding-top: 24px;
      padding-bottom: 24px;
    }

    /* Extra small devices (xs): 0px and up */
    @media screen and (max-width: 575.98px) {
      bw-button {
        --width: 100%;
      }
    }

    /* Small devices (sm): 576px and up */
    @media screen and (min-width: 576px) {
    }

    /* Medium devices (md): 768px and up */
    @media screen and (min-width: 768px) {
      .bw-2col-layout {
        padding: 80px 32px;
      }

      .x-padding {
        padding: 0;
      }
    }

    /* Large devices (lg): 992px and up */
    @media screen and (min-width: 992px) {
      /* Your styles here */
    }

    /* Large devices (lg): 992px and up */
    @media screen and (min-width: 1024px) {
      .bw-2col-layout {
        padding: 144px 40px;
      }

      .bw-2col-layout__left {
        width: 50%;

        bw-button {
          margin-top: 56px;
        }
      }

      .bw-2col-layout__right {
        width: 50%;
      }

      .bw-2col-layout-content {
        display: flex;
        flex-direction: row;
      }

      .bw-2col-layout-content--right {
        flex-direction: row-reverse;
      }

      .bw-2col-layout-content--right,
      .bw-2col-layout-content {
        gap: 40px;
      }

      .x-padding {
        padding: 0;
      }
    }

    /* Extra large devices (xl): 1200px and up */
    @media screen and (min-width: 1200px) {
      /* Your styles here */
    }
  `;

  constructor() {
    super();
    this.title = "Hello world!";
    this.right = false;
    this.btnLink = "#";
    this.btnText = "Call Us Now";
    this.noOverline = false;
    this.btn = false;
    this.noTitle = false;
    this.xPadding = false;
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-2col-layout-${Bw2ColLayout.instanceCounter++}`;
  }

  render() {
    return html`
      <div class="bw-2col-layout">
        <div class="bw-2col-layout-content${this.right ? "--right" : null}">
          <div class="bw-2col-layout__left ${this.xPadding ? "x-padding" : null}">
            <!-- ${this.noOverline ? html`<bw-overline-text nooverline title="${this.title}"></bw-overline-text>` : html`<bw-overline-text overline="${this.overline}" title="${this.title}"></bw-overline-text>`} -->
            ${this.noTitle ? null : html`<bw-overline-text overline="${this.overline}" title="${this.title}"></bw-overline-text>`}
            <slot name="left"></slot>
            ${this.btn ? html`<bw-button kind="link" variant="" link="${this.btnLink}">${this.btnText}</bw-button>` : null}
          </div>
          <div class="bw-2col-layout__right">
            <slot name="right"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("bw-2col-layout", Bw2ColLayout);
