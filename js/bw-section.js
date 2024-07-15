import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwSection extends LitElement {
  static get styles() {
    return css`
      .bw-section--fw {
        width: 100%;
        max-width: 100%;
      }
      .bw-section--l {
        width: 100%;
        max-width: 1920px;
        margin: auto;
      }

      .bw-section--m {
        width: 100%;
        max-width: 100%;
      }

      .bw-section--s {
        width: 100%;
        max-width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      width: { type: String },
    };
  }

  computeClass(type) {
    switch (type) {
      case "fw":
        return "bw-section--fw";
      case "l":
        return "bw-section--l";
      case "m":
        return "bw-section--m";
      case "s":
        return "bw-section--s";
      default:
        return "bw-btn";
    }
  }

  render() {
    return html` <section class=${this.computeClass(this.width)} ><slot></section> `;
  }
}
customElements.define("bw-section", BwSection);
