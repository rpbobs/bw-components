import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== BwFAQ ===//
class BwFAQ extends LitElement {
  static properties = {
    title: { type: String },
    padded: { type: Boolean },
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

    :host {
      display: block;
      container-type: inline-size;
    }

    .bw-faq-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      border-radius: 8px;
      background-color: #fff;

      ::slotted(bw-accordion) {
        background-color: #fff;
      }

      h2 {
        font-size: 32px;
        line-height: 40px;
        font-family: var(--bw-font-head, "utopia std"), serif;
        font-weight: 400;
        margin: 0;
      }
    }

    .padded {
      padding: 24px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
    }

    @container (min-width: 576px) {
      .bw-faq-container {
        gap: 32px;

        h2 {
          font-size: 40px;
          line-height: 48px;
        }
      }
    }

    @container (min-width: 1024px) {
      .bw-faq-container {
        h2 {
          font-size: 48px;
          line-height: 56px;
        }
      }
    }
  `;

  constructor() {
    super();
    this.title = "Frequently Asked Questions";
    this.padded = false;
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw--${BwFAQ.instanceCounter++}`;
  }

  render() {
    return html`
      <section class="bw-faq-container ${this.padded ? "padded" : null}">
        <h2 class="font-utopia">${this.title}</h2>
        <slot></slot>
      </section>
    `;
  }
}

customElements.define("bw-faq", BwFAQ);
