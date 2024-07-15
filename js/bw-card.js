import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-image.js";

//=== BwCard ===//
class BwCard extends LitElement {
  static properties = {
    title: { type: String },
    text: { type: String },
    image: { type: String },
    link: { type: String },
    category: { type: String },
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
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;

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

    .bw-card {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: start;
      width: 100%;
      background-color: white;
      text-decoration: none;
      color: black;

      .bw-card__image-container {
        position: relative;
        width: 100%;

        .bw-card__image {
          aspect-ratio: 16/9;
          object-fit: cover;
          width: 100%;
        }

        .bw-card__category {
          position: absolute;
          top: 16px;
          left: 16px;
          background-color: rgba(0, 0, 0, 0.75);
          font-weight: 600;
          color: white;
          font-size: 12px;
          line-height: 1.5;
          text-align: left;
          padding: 8px 12px;
          border-radius: 16px;
          z-index: 1;
        }
      }

      .bw-card__details {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        align-items: center;
        padding: 24px 0;
        gap: 1rem;

        .bw-card__title {
          /* display: flex; */
          height: 100%;
          width: 100%;
          font-family: "utopia std", serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 28px;
        }

        .bw-card__text {
          width: 100%;
          display: flex;
          flex: 1;
          font-size: 1rem;
          line-height: 1.5;
        }
      }
    }
  `;

  constructor() {
    super();
    this.title = "The Evolution of the Rolex Coronet: A Symbol of Timeless Luxury";
    this.image = "/rolex-blog/wp-content/uploads/2024/06/rolex-coronet.jpg";
    this.text = "The Rolex coronet, the crown-shaped logo representing the luxury watch brand, has not only been a symbol of qual";
    this.link = "https://www.bobswatches.com/rolex-blog/editorial/evolution-rolex-coronet.html";
    this.category = "Editorial";
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-card-${BwCard.instanceCounter++}`;
  }

  render() {
    const cdnURL = `https://cdn2.bobswatches.com/_/`;
    const x1 = `/q:50/sh:0.5/plain${this.image}`;
    const x2 = `/q:50/sh:0.5/dpr:2/plain${this.image}`;
    const x3 = `/q:50/sh:0.5/dpr:3/plain${this.image}`;

    return html`
      <a class="bw-card" href="${this.link}" target="_blank">
        <div class="bw-card__image-container">
          <span class="bw-card__category">${this.category}</span>
          <picture class="bw-picture">
            <source media="(min-width: 1920px)" srcset="${cdnURL}s:480:0:1${x1} 1x, ${cdnURL}s:480:0:1${x2} 2x, ${cdnURL}s:480:0:1${x3} 3x" />
            <source media="(min-width: 1280px)" srcset="${cdnURL}s:392:0:1${x1} 1x, ${cdnURL}s:392:0:1${x2} 2x, ${cdnURL}s:392:0:1${x3} 3x" />
            <source media="(min-width: 480px) and (max-width: 1279px)" srcset="${cdnURL}s:356:0:1${x1} 1x, ${cdnURL}s:356:0:1${x2} 2x, ${cdnURL}s:356:0:1${x3} 3x" />
            <source media="(max-width: 479px)" srcset="${cdnURL}s:343:0:1${x1} 1x, ${cdnURL}s:343:0:1${x2} 2x, ${cdnURL}s:343:0:1${x3} 3x" />
            <img class="bw-card__image" src="${this.image}" loading="lazy" decoding="async" fetchpriority="low" alt="${this.title} Image" />
          </picture>
        </div>
        <div class="bw-card__details">
          <span class="bw-card__title">${this.title}</span>
          <span class="bw-card__text">${this.text.substring(0, 150)}...</span>
        </div>
      </a>
    `;
  }
}

customElements.define("bw-card", BwCard);
