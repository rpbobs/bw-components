import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-ytembed.js";

class CMSHero extends LitElement {
  static properties = {
    src: { type: String },
    quality: { type: Number },
    sharpen: { type: Boolean },
    lossless: { type: Boolean },
    video: { type: Boolean },
    videoWithSrc: { type: Boolean, attribute: "video-with-src" },
    videoID: { type: String },
    useSrc: { type: Boolean },
  };

  static styles = css`
    :not(:defined) {
      visibility: hidden;
    }

    :host {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
      container: cms-hero / inline-size;
    }

    .heroIMG {
      width: 100%;
      object-fit: cover;
      height: 360px;
    }

    bw-ytembed {
      width: 100%;
      height: 360px;
    }

    @container (width < 1199px) {
      .heroIMG {
        height: 256px;
      }

      bw-ytembed {
        width: 100%;
        height: 256px;
      }
    }
  `;

  constructor() {
    super();
    this.src = "/images/z159-Luxury.jpg";
    this.quality = 50;
    this.sharpen = false;
    this.lossless = false;
    this.video = false;
    this.videoID = "mVjYG9TSN88";
    this.useSrc = false;
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-cms-hero-${CMSHero.instanceCounter++}`;
  }

  render() {
    return html`
      ${this.video
        ? html`<bw-ytembed ratio="16/9" videoID="${this.videoID}"></bw-ytembed>`
        : this.videoWithSrc
        ? html`<bw-ytembed banner ratio="16/9" videoID="${this.videoID}" image="${this.src}"></bw-ytembed>`
        : html`
            <picture>
              <source media="(min-width: 1921px)" srcset="https://img.bobswatches.com/_/s:2560:360:1/${this.lossless ? null : "q:50/"}dpr:2/${this.sharpen ? "sh:0.5/" : null}plain${this.src}" />
              <source media="(min-width: 1200px)" srcset="https://img.bobswatches.com/_/s:1920:360:1/${this.lossless ? null : "q:50/"}dpr:2/${this.sharpen ? "sh:0.5/" : null}plain${this.src}" />
              <source media="(min-width: 480px) and (max-width: 1199px)" srcset="https://img.bobswatches.com/_/exar:1/rs:fill:768:256:0/${this.lossless ? null : "q:50/"}dpr:2/${this.sharpen ? "sh:0.5/" : null}plain${this.src}" />
              <source media="(min-width: 0px) and (max-width: 479px)" srcset="https://img.bobswatches.com/_/exar:1/rs:fill:480:256:0/${this.lossless ? null : "q:50/"}dpr:2/${this.sharpen ? "sh:0.5/" : null}plain${this.src}" />
              <img class="heroIMG" src="${this.src}" fetchpriority="high" loading="eager" alt="Hero image" />
            </picture>
          `}
    `;
  }
}

customElements.define("bw-cms-hero", CMSHero);
