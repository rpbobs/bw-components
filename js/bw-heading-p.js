import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class HeadingBlurb extends LitElement {
  static properties = {
    heading: { type: String },
    level: { type: Number },
    text: { type: String },
    align: { type: String },
  };

  static styles = css`
    :host {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
      font-family: var(--bw-font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    p {
      margin: 0;
      line-height: 24px;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0 0 8px 0;
      font-family: var(--bw-font-head), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      text-transform: capitalize;
      font-style: normal;
    }

    h1 {
      font-size: 80px;
      line-height: 88px; /* 110% */
    }

    h2 {
      font-size: 48px;
      line-height: 56px; /* 125% */
    }

    h3 {
      font-size: 40px;
      line-height: 48px; /* 133.333% */
    }

    h4 {
      font-size: 24px;
      line-height: 28px; /* 130% */
    }

    h5 {
      font-size: 22px;
      line-height: 28px; /* 133.333% */
    }

    h6 {
      font-size: 17px;
      line-height: 24px; /* 141.176% */
    }

    .bw-heading-p__h3 {
      font-family: var(--bw-font-head);
      font-size: 24px;
      line-height: 28px;
      font-weight: 500;
    }
  `;

  computeHeading(level) {
    switch (level) {
      case 1:
        return html`<h1 class="bw-heading-p__h1">${this.heading}</h1>`;
      case 2:
        return html`<h2 class="bw-heading-p__h2">${this.heading}</h2>`;
      case 3:
        return html`<h3 class="bw-heading-p__h3">${this.heading}</h3>`;
      case 4:
        return html`<h4 class="bw-heading-p__h4">${this.heading}</h4>`;
      case 5:
        return html`<h5 class="bw-heading-p__h5">${this.heading}</h5>`;
      case 6:
        return html`<h6 class="bw-heading-p__h6">${this.heading}</h6>`;
      default:
        return html`<span role="heading" aria-level="7">${this.heading}</span>`;
    }
  }

  textAlign(align) {
    return ["center", "left", "right"].includes(align) ? align : "inherit";
  }

  render() {
    this.style.setProperty("text-align", this.align);
    return html`
      ${this.computeHeading(this.level)}
      <p>${this.text}</p>
    `;
  }
}

customElements.define("bw-heading-p", HeadingBlurb);