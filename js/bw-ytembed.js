import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-button.js";

class BwYtEmbed extends LitElement {
  static properties = {
    videoID: { type: String },
    image: { type: String },
    ratio: { type: String },
    imgix: { type: Boolean },
    cdnURL: { type: String },
    extImg: { type: Boolean },
    banner: { type: Boolean },
    env: { type: String },
  };

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

      * {
        box-sizing: border-box;
        font-family: Inter, sans-serif;
      }

      :host {
        container: bw-ytembed / inline-size;
        animation: fadeIn 0.3s ease-in-out;
        display: flex;
        max-height: var(--max-height, 100%);
      }

      #video {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        max-height: var(--max-height, 100%);
        margin: auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      iframe {
        width: 100%;
        height: 100%;
      }

      .play-btn {
        cursor: pointer;
        width: 100px;
        height: 48px;
        padding: 12px 24px;
        gap: 16px;
        background: black;
        border: none;
        border-radius: 32px;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 1px;
        color: #fff;
      }

      bw-button {
        svg {
          margin: auto 8px 0 auto;

          path {
            transition: all 0.2s ease-in-out;
          }
        }

        &:hover svg path {
          fill: rgba(177, 243, 71, 1);
        }
      }
    `;
  }

  constructor() {
    super();
    this.videoID = "mVjYG9TSN88";
    this.ratio = "16/9";
    this.defImg = "/lit/images/bw-fw-banner-img.jpg";
    this.imgixOpt = "?&auto=format&q=15&chromasub=444";
    this.imgix = false;
    this.env = "prod";
    this.banner = false;
    this.updateCdnURL();
    this.updateRatio();
    window.addEventListener("resize", () => this.updateRatio());
  }

  updateCdnURL() {
    const envMap = { prod: "img", dev2: "img2", dev3: "img3" };
    this.cdnURL = `https://${envMap[this.env] || envMap.prod}.bobswatches.com/_/`;
  }

  updated(changedProperties) {
    if (changedProperties.has("env")) {
      this.updateCdnURL();
    }
  }

  firstUpdated() {
    this.loadYouTubeAPI();
    this.containerResize();
  }

  initializePlayer() {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    this.shadowRoot.querySelector("bw-button").style.display = "none";
    this.player = new YT.Player(this.shadowRoot.querySelector("#player-container"), {
      height: "100%",
      videoId: this.videoID,
      playerVars: {
        autoplay: 1,
        playsinline: 1,
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
      },
    });
  }

  containerResize() {
    const container = this.shadowRoot.querySelector("#video");

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (!this.image) return;

        const width = entry.contentRect.width;
        const getSize = (width, banner) => {
          if (banner) {
            if (width < 480) return "408:256";
            if (width < 800) return "640:256";
            if (width < 1200) return "1024:256";
            if (width < 1440) return "1320:360";
            if (width < 1600) return "1520:360";
            if (width < 1920) return "1760:360";
            return "2240:360";
          } else {
            if (width < 480) return "408:0";
            if (width < 800) return "640:0";
            if (width < 1200) return "1024:0";
            if (width < 1440) return "1320:0";
            if (width < 1600) return "1520:0";
            if (width < 1920) return "1760:0";
            return "2240:0";
          }
        };

        const selectedSize = getSize(width, this.banner);
        const imageSet = `image-set(
          url(${this.cdnURL}exar:1/rs:fill:${selectedSize}:1/q:35/dpr:2/plain${this.image}) 1x, 
          url(${this.cdnURL}exar:1/rs:fill:${selectedSize}:1/q:40/sh:0.5/dpr:2/plain${this.image}) 2x, 
          url(${this.cdnURL}exar:1/rs:fill:${selectedSize}:1/q:40/sh:0.5/dpr:3/plain${this.image}) 3x
        )`;

        container.style.setProperty("background-image", imageSet);
      }
    });

    resizeObserver.observe(container);
  }

  loadYouTubeAPI() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube IFrame API is ready.");
    };
  }

  onPlayerReady(event) {
    console.log("Player is ready.");
    // Additional logic for when the player is ready
  }

  onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      this.player.destroy();
      this.shadowRoot.querySelector("bw-button").style.display = "block";
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("resize", this.updateRatio);
  }

  updateRatio() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      if (window.innerWidth <= 768) {
        this.ratio = "16/9";
      }
    }, 150);
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-ytembed-${BwYtEmbed.instanceCounter++}`;
  }

  render() {
    const fbRatio = this.ratio || "16/9";
    const src = this.image && this.image.trim() !== "" ? this.image : this.defImg;
    const ytThumb = `url(https://img.youtube.com/vi/${this.videoID}/maxresdefault.jpg)`;
    const isYT = `${this.image ? null : ytThumb}`;

    return html`
      <div id="video" style="background-image: ${isYT}; aspect-ratio: ${fbRatio};">
        <bw-button kind="button" variant="" link="#" @click="${this.initializePlayer}">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.875 13.125L12.9375 10.5208C13.1319 10.3958 13.2292 10.2222 13.2292 9.99996C13.2292 9.77774 13.1319 9.60413 12.9375 9.47913L8.875 6.87496C8.66666 6.73607 8.45472 6.72552 8.23917 6.84329C8.02361 6.96107 7.91611 7.14524 7.91667 7.39579V12.6041C7.91667 12.8541 8.02444 13.0383 8.24 13.1566C8.45555 13.275 8.66722 13.2644 8.875 13.125ZM10 18.3333C8.84722 18.3333 7.76389 18.1144 6.75 17.6766C5.73611 17.2388 4.85417 16.6452 4.10417 15.8958C3.35417 15.1463 2.76055 14.2644 2.32333 13.25C1.88611 12.2355 1.66722 11.1522 1.66667 9.99996C1.66611 8.84774 1.885 7.7644 2.32333 6.74996C2.76167 5.73552 3.35528 4.85357 4.10417 4.10413C4.85305 3.35468 5.735 2.76107 6.75 2.32329C7.765 1.88551 8.84833 1.66663 10 1.66663C11.1517 1.66663 12.235 1.88551 13.25 2.32329C14.265 2.76107 15.1469 3.35468 15.8958 4.10413C16.6447 4.85357 17.2386 5.73552 17.6775 6.74996C18.1164 7.7644 18.335 8.84774 18.3333 9.99996C18.3317 11.1522 18.1128 12.2355 17.6767 13.25C17.2406 14.2644 16.6469 15.1463 15.8958 15.8958C15.1447 16.6452 14.2628 17.2391 13.25 17.6775C12.2372 18.1158 11.1539 18.3344 10 18.3333ZM10 16.6666C11.8611 16.6666 13.4375 16.0208 14.7292 14.7291C16.0208 13.4375 16.6667 11.8611 16.6667 9.99996C16.6667 8.13885 16.0208 6.56246 14.7292 5.27079C13.4375 3.97913 11.8611 3.33329 10 3.33329C8.13889 3.33329 6.5625 3.97913 5.27083 5.27079C3.97917 6.56246 3.33333 8.13885 3.33333 9.99996C3.33333 11.8611 3.97917 13.4375 5.27083 14.7291C6.5625 16.0208 8.13889 16.6666 10 16.6666Z"
              fill="white"
            />
          </svg>
          Play
        </bw-button>
        <div id="player-container"></div>
      </div>
    `;
  }
}

customElements.define("bw-ytembed", BwYtEmbed);
