
import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-image.js";
import "./bw-button.js";

class BwLocationCard extends LitElement {
  static properties = {
    buttonText: { type: String },
    buttonLink: { type: String },
    cardImage: { type: String },
    cardTitle: { type: String },
    cardText: { type: String },
  };

  static styles = css`
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
      font-family: Inter, sans-serif;
    }

    :host {
      animation: fadeIn 0.3s ease-in-out;
      display: block;
    }

    .bw-location-card {
      display: grid;
      grid-template-columns: 1fr;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      overflow: hidden;
      height: 100%;
      width: 100%;

      .bw-location-card__text-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1.5rem;
        gap: 24px;
      }

      h3 {
        font-size: 22px;
        line-height: 26px;
        font-weight: 500;
        margin: 0 0 12px 0;
      }
    }

    /* Extra small devices (xs): 0px and up */
    @media screen and (max-width: 575.98px) {
      /* Your styles here */
    }

    /* Small devices (sm): 576px and up */
    @media screen and (min-width: 576px) {
    }

    /* Medium devices (md): 768px and up */
    @media screen and (min-width: 768px) {
      .bw-location-card {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* Large devices (lg): 992px and up */
    @media screen and (min-width: 992px) {
      .bw-location-card h3 {
        font-size: 1.5rem;
        line-height: 1.2;
      }
    }

    /* Extra large devices (xl): 1200px and up */
    @media screen and (min-width: 1200px) {
      /* Your styles here */
    }
  `;

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-location-card-${BwLocationCard.instanceCounter++}`;
  }

  render() {
    return html`
      <div class="bw-location-card">
        <bw-image src="${this.cardImage}" lazy-loading="lazy" priority="low" alt="Newport Beach Location" ratio="16/9"></bw-image>
        <div class="bw-location-card__text-container">
          <div>
            <h3 class="h4">${this.cardTitle || "Newport Beach, CA"}</h3>
            <span>${this.cardText || "1900 Quail St. Newport Beach, CA 92660"}</span>
          </div>
          <bw-button kind="link" variant="default" link="${this.buttonLink}" style="--width: 100%;">${this.buttonText || "Click Me"}</bw-button>
        </div>
      </div>
    `;
  }
}

customElements.define("bw-location-card", BwLocationCard);