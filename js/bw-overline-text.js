import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwOverlineText extends LitElement {
  static get styles() {
    return css`
      :host {
        --overline-color: rgba(0, 0, 0, 1);
      }

      :host,
      .bw-overline-container {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
      }

      *,
      .bw-overline-container {
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box;
      }

      .bw-overline-container {
        font-weight: 500;
        margin: 0;
      }

      .bw-overline-container__overline {
        font-family: var(--bw-font-body, Inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        text-transform: uppercase;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 2px;
        color: var(--overline-color);
      }

      .bw-overline-container__title {
        display: block;
        font-family: var(--bw-font-head, "utopia std"), serif;
        margin: 0;
        font-size: 48px;
        line-height: 56px;
        font-style: normal;
      }

      @media screen and (max-width: 1199px) {
        .bw-overline-container__title {
          font-size: 40px;
          line-height: 48px;
        }
      }

      @media screen and (max-width: 767px) {
        .bw-overline-container__title {
          font-size: 32px;
          line-height: 40px;
        }
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      overline: { type: String },
      uid: { type: String },
      reverse: { type: Boolean },
      noOverline: { type: Boolean },
    };
  }

  static instanceCounter = 0;

  constructor() {
    super();
    // Setting default values
    this.overline = this.overline || "Overline";
    this.title = this.title || "Title Text";
    this.noOverline = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.uid = `bw-overline-text-${BwOverlineText.instanceCounter++}`;
  }

  render() {
    const isReverse = this.reverse === true;
    return html`
      <h2 class="bw-overline-container" id="${this.uid}">
        ${this.noOverline ? null : html`<span class="${isReverse ? "bw-overline-container__title" : "bw-overline-container__overline"}" style="${this.overline ? "margin-bottom: 4px;" : ""}">${isReverse ? this.title : this.overline}</span>`}
        <span class="${isReverse ? "bw-overline-container__overline" : "bw-overline-container__title"}">${isReverse ? this.overline : this.title}</span>
      </h2>
    `;
  }
}

customElements.define("bw-overline-text", BwOverlineText);
