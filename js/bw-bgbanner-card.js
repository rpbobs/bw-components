import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== BwBgBannerCard ===//
class BwBgBannerCard extends LitElement {
  static properties = {
    title: { type: String },
    layout: { type: String },
    image: { type: String },
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
      position: relative;
      /* display: block; */
    }

    .bw-bgbanner-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 100%;

      .bw-bgbanner-card-picture {
        display: flex;
        z-index: -1;

        .bw-bgbanner-card-picture__img {
          min-height: 320px;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }

    .bw-bgbanner-card-wrapper--left,
    .bw-bgbanner-card-wrapper--right {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      max-width: 1552px;
      margin: auto;
    }

    .bw-bgbanner-card-content {
      width: 100%;
      padding: 24px;
      align-content: center;
      background-color: white;

      h2 {
        display: block;
        font-weight: 500;
        font-family: var(--bw-font-head, "utopia std"), serif;
        margin: 0 0 24px 0;
        font-size: 32px;
        line-height: 40px;
        font-style: normal;
      }

      ::slotted(p) {
        color: rgba(0, 0, 0, 0.72);
      }
    }

    .bw-bgbanner-card-wrapper--right {
      align-items: end;
    }

    .bw-bgbanner-card-wrapper--left {
      align-items: start;
    }

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
      .bw-bgbanner-card-content {
        h2 {
          font-size: 40px;
          line-height: 48px;
        }
      }
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
      .bw-bgbanner-card {
        min-height: 620px;
        padding: clamp(16px, 2dvw, 64px);

        .bw-bgbanner-card-picture {
          flex-direction: row;

          .bw-bgbanner-card-picture__img {
            position: absolute;
            width: 100%;
            height: 100%;
            max-height: 620px;
            top: 0;
            left: 0;
          }
        }
      }

      .bw-bgbanner-card-content {
        padding: 40px;
        max-width: 640px;
        align-content: center;
        background-color: white;
        border-radius: 24px;

        h2 {
          font-size: 48px;
          line-height: 56px;
        }
      }
    }
  `;

  constructor() {
    super();
    this.title = "Our Authenticity Guarantee";
    this.layout = "right";
    this.image = "/pdp/images/bobs-guarantee.jpg";
    this.titleId = `bw-bgbanner-card-title-${BwBgBannerCard.instanceCounter++}`;
    this.btnMarginTop = false;
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-bgbanner-card-${BwBgBannerCard.instanceCounter++}`;
  }

  render() {
    return html`
      <section class="bw-bgbanner-card" role="banner" aria-labelledby="${this.titleId}">
        <picture class="bw-bgbanner-card-picture">
          <source media="(min-width: 1921px)" srcset="https://cdn2.bobswatches.com/_/s:2560:620:1/q:50/dpr:2/plain${this.image}" />
          <source media="(min-width: 1200px)" srcset="https://cdn2.bobswatches.com/_/s:1920:620:1/q:50/dpr:2/plain${this.image}" />
          <source media="(min-width: 480px) and (max-width: 1199px)" srcset="https://cdn2.bobswatches.com/_/exar:1/rs:fill:1200:0:0/q:50/dpr:2/plain${this.image}" />
          <source media="(min-width: 0px) and (max-width: 479px)" srcset="https://cdn2.bobswatches.com/_/exar:1/rs:fill:0:320:0/q:50/dpr:2/plain${this.image}" />
          <img class="bw-bgbanner-card-picture__img" src="${this.image}" fetchpriority="low" loading="lazy" decoding="async" alt="${this.title} image" />
        </picture>
        <div class="bw-bgbanner-card-wrapper--${this.layout}">
          <div class="bw-bgbanner-card-content">
            <h2>${this.title}</h2>
            <div class="bw-bgbanner-card-content__inner"><slot name="content"></slot></div>
            <div class="bw-bgbanner-card-content__button ${this.btnMarginTop ? "btn-margin-top" : ""}"><slot name="cta"></slot></div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("bw-bgbanner-card", BwBgBannerCard);
