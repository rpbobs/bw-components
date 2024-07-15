import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwFwBanner extends LitElement {
  static styles = css`
    @keyframes fadeInUp {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    :host {
      display: flex;
      overflow: hidden;
      width: 100%;
      opacity: 1;
      transform: translate(0, 0px);
      transition: all 0.3s ease-in-out;
    }

    * {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
    }

    .bw-fw-banner-container {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      background-color: black;
      color: white;
    }

    .img-right {
      flex-direction: row-reverse;
    }

    .img-left {
      flex-direction: row;
    }

    .btn-margin-top {
      margin-top: 56px;
    }

    bw-image,
    bw-ytembed {
      display: flex;
      width: 50%;
      align-self: stretch;
    }

    .bw-fw-banner-content {
      width: 50%;
      padding: 40px;
      max-width: 100%;
      align-content: center;

      bw-overline-text {
        margin-bottom: 24px;
        --overline-color: rgba(255, 255, 255, 1);
      }

      .bw-fw-banner-overline {
        font-family: var(--bw-font-body, Inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        text-transform: uppercase;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 2px;
        margin-bottom: 4px;
      }

      .bw-fw-banner-title {
        display: block;
        font-family: var(--bw-font-head, "utopia std"), serif;
        font-weight: 500;
        margin: 0;
        font-size: 48px;
        line-height: 56px;
        font-style: normal;
        margin-bottom: 24px;
      }
    }

    .bw-fw-banner-paragraph {
      font-family: var(--bw-font-body, Inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      margin: 0;
      font-size: 16px;
      line-height: 28px;
    }

    /* Styles for small devices and up (mobile-first) */
    @media screen and (max-width: 430px) {
      ::slotted(bw-button) {
        --width: 100%;
      }
    }

    @media screen and (max-width: 768px) {
      .bw-fw-banner-content {
        padding: 24px 12px;
      }
    }

    @media screen and (max-width: 1024px) {
      .bw-fw-banner-container,
      .img-left,
      .img-right {
        flex-direction: column;
      }

      bw-image,
      bw-ytembed {
        min-height: 320px;
        width: 100%;
      }

      .bw-fw-banner-content {
        width: 100%;
        padding: 24px;
      }

      /* .btn-margin-top {
        margin-top: 32px;
      } */
    }

    @media screen and (max-width: 1199px) {
      .bw-fw-banner-content {
        max-width: 988px; /* Is this the correct max-width? It seems large for this breakpoint. */
      }
    }

    /* Styles for larger devices - handling inconsistencies */
    @media screen and (min-width: 1681px) {
      .bw-fw-banner-content {
        max-width: 804px;
      }
    }

    @media screen and (min-width: 2400px) {
      .bw-fw-banner-content {
        max-width: 988px;
      }
    }
  `;

  static properties = {
    variant: { type: String },
    imgSrc: { type: String, attribute: "img-src" },
    imgRatio: { type: String, attribute: "img-ratio" },
    layout: { type: String },
    lazyLoading: { type: String, attribute: "lazy-loading" },
    imgPriority: { type: String, attribute: "img-priority" },
    altTag: { type: String, attribute: "img-alt" },
    overline: { type: String },
    title: { type: String },
    videoID: { type: String },
    btnMarginTop: { type: Boolean, attribute: "btn-margin" },
    // Add new state properties
    ytEmbedLoaded: { type: Boolean },
    imageLoaded: { type: Boolean },
    overlineTextLoaded: { type: Boolean },
  };

  static instanceCounter = 0;

  constructor() {
    super();
    this.titleId = `bw-fw-banner-title-${BwFwBanner.instanceCounter++}`;
    this.btnMarginTop = false;
    this.imgRatio = "16/8";
    this.ytEmbedLoaded = false;
    this.imageLoaded = false;
    this.overlineTextLoaded = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-fw-banner-${BwFwBanner.instanceCounter++}`;
    this.loadComponents();
  }

  async loadComponents() {
    if (this.variant === "video") {
      await import("./bw-ytembed.js");
      this.ytEmbedLoaded = true;
    } else {
      await import("./bw-image.js");
      this.imageLoaded = true;
    }
    await import("./bw-overline-text.js");
    this.overlineTextLoaded = true;
  }

  render() {
    return html`
      <section class="bw-fw-banner-container ${this.layout || "img-left"}" role="banner" aria-labelledby="${this.titleId}">
        ${this.variant === "video" && this.ytEmbedLoaded ? html`<bw-ytembed ratio="${this.imgRatio}" videoID="${this.videoID}" image="${this.imgSrc}"></bw-ytembed>` : ""} ${this.variant !== "video" && this.imageLoaded ? html`<bw-image src="${this.imgSrc}" lazy-loading="${this.lazyLoading}" priority="${this.imgPriority || "low"}" alt="${this.title} Banner Image" ratio=${this.imgRatio}></bw-image>` : ""}
        <div class="bw-fw-banner-content">
          ${this.overlineTextLoaded ? html`<bw-overline-text overline="${this.overline}" title="${this.title}" uid="${this.titleId}"></bw-overline-text>` : ""}
          <div class="bw-fw-banner-paragraph"><slot name="content"></slot></div>
          <div class="bw-fw-banner-btn-container ${this.btnMarginTop ? "btn-margin-top" : ""}"><slot name="cta"></slot></div>
        </div>
      </section>
    `;
  }
}

customElements.define("bw-fw-banner", BwFwBanner);
