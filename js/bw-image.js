import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwImage extends LitElement {
  static get styles() {
    return css`
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      :host {
        display: flex;
        align-self: stretch;
        animation: fadeIn 0.5s ease-in-out;
      }

      .bw-picture {
        display: flex;
        align-self: stretch;
        width: 100%;

        & .bw-image {
          display: flex;
          align-self: stretch;
          width: 100%;
          object-fit: cover;
        }
      }
    `;
  }

  static properties = {
    imgSrc: { type: String, attribute: "src" },
    imgRatio: { type: String, attribute: "ratio" },
    lazyLoading: { type: String, attribute: "lazy-loading" },
    imgPriority: { type: String, attribute: "priority" },
    altTag: { type: String, attribute: "alt" },
    small: { type: Boolean },
    dev2: { type: Boolean },
    dev3: { type: Boolean },
  };

  constructor() {
    super();
    this.defImg = "/lit/images/bw-fw-banner-img.jpg";
    this.imgixOpt = "?&auto=format&q=15&chromasub=444";
    this.small = false;
    this.dev2 = false;
    this.dev3 = false;
    this.cdnURL = this._determineCdnURL();
  }

  connectedCallback() {
    super.connectedCallback();
    this.cdnURL = this._determineCdnURL();
    this.id = `bw-image-${BwImage.instanceCounter++}`;
  }

  updated(changedProperties) {
    if (changedProperties.has("dev2") || changedProperties.has("dev3")) {
      this.cdnURL = this._determineCdnURL();
    }
  }

  _determineCdnURL() {
    return this.dev2 ? "https://img2.bobswatches.com/_/" : this.dev3 ? "https://img3.bobswatches.com/_/" : "https://cdn2.bobswatches.com/_/";
  }
  static instanceCounter = 0;

  render() {
    const src = this.imgSrc === "" ? this.defImg : this.imgSrc;
    const isDev = this.dev2 || this.dev3;
    const x1 = `/q:50/sh:0.5/plain${src}`;
    const x2 = `/q:50/sh:0.5/dpr:2/plain${src}`;
    const x3 = `/q:50/sh:0.5/dpr:3/plain${src}`;
    return html`
      ${this.small
        ? html`
            <picture class="bw-picture">
              <source media="(min-width: 1920px)" srcset="${this.cdnURL}s:776:0:1${x1} 1x, ${this.cdnURL}s:776:0:1${x2} 2x, ${this.cdnURL}s:776:0:1${x3} 3x" />
              <source media="(min-width: 1280px)" srcset="${this.cdnURL}s:640:0:1${x1} 1x, ${this.cdnURL}s:640:0:1${x2} 2x, ${this.cdnURL}s:640:0:1${x3} 3x" />
              <source media="(min-width: 480px) and (max-width: 1279px)" srcset="${this.cdnURL}s:840:0:1${x1} 1x, ${this.cdnURL}s:840:0:1${x2} 2x, ${this.cdnURL}s:840:0:1${x3} 3x" />
              <source media="(max-width: 479px)" srcset="${this.cdnURL}s:480:0:1${x1} 1x, ${this.cdnURL}s:480:0:1${x2} 2x, ${this.cdnURL}s:480:0:1${x3} 3x" />
              <img class="bw-image" src="${src}" loading="${this.lazyLoading || "eager"}" decoding="${(this.lazyLoading = "lazy" ? "async" : "auto")}" fetchpriority="${this.imgPriority || "low"}" alt="${this.altTag}" style="aspect-ratio: ${this.imgRatio};" />
            </picture>
          `
        : html`
            <picture class="bw-picture">
              <source media="(min-width: 2560px)" srcset="${this.cdnURL}s:1284:0:1${x1} 1x, ${this.cdnURL}s:1284:0:1${x2} 2x, ${this.cdnURL}s:1284:0:1${x3} 3x" />
              <source media="(min-width: 1920px)" srcset="${this.cdnURL}s:968:0:1${x1} 1x, ${this.cdnURL}s:968:0:1${x2} 2x, ${this.cdnURL}s:968:0:1${x3} 3x" />
              <source media="(min-width: 1280px)" srcset="${this.cdnURL}s:640:0:1${x1} 1x, ${this.cdnURL}s:640:0:1${x2} 2x, ${this.cdnURL}s:640:0:1${x3} 3x" />
              <source media="(min-width: 480px) and (max-width: 1279px)" srcset="${this.cdnURL}s:840:0:1${x1} 1x, ${this.cdnURL}s:840:0:1${x2} 2x, ${this.cdnURL}s:840:0:1${x3} 3x" />
              <source media="(max-width: 479px)" srcset="${this.cdnURL}s:480:0:1${x1} 1x, ${this.cdnURL}s:480:0:1${x2} 2x, ${this.cdnURL}s:480:0:1${x3} 3x" />
              <img class="bw-image" src="${src}" loading="${this.lazyLoading || "eager"}" decoding="${(this.lazyLoading = "lazy" ? "async" : "auto")}" fetchpriority="${this.imgPriority || "low"}" alt="${this.altTag}" style="aspect-ratio: ${this.imgRatio};" />
            </picture>
          `}
    `;
  }
}
customElements.define("bw-image", BwImage);
