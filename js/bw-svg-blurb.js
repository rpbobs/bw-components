import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwSVGBlurb extends LitElement {
  static properties = {
    icon: { type: String },
    size: { type: String },
    fill: { type: String },
    heading: { type: String },
    level: { type: Number },
    text: { type: String },
    align: { type: String },
  };

  constructor() {
    super();
    this.icon = "transparent";
    this.size = "64px";
    this.fill = "black";
    this.heading = "This is heading";
    this.level = 3;
    this.text = "Sed sit amet bibendum orci. Aenean accumsan, lacus id rhoncus finibus, nisl tortor facilisis dolor.";
    this.align = "left";
  }

  static styles = css`
    :host {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    bw-brand-svg {
      margin-bottom: 24px;
    }
  `;

  render() {
    return html`
      <bw-brand-svg icon="${this.icon}" size="${this.size}" fill="${this.fill}" align="${this.align}"></bw-brand-svg>
      <bw-heading-p level="${this.level}" heading="${this.heading}" text="${this.text}" align="${this.align}"></bw-heading-p>
    `;
  }
}

customElements.define("bw-svg-blurb", BwSVGBlurb);