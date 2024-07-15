import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
// //=== Template ===//
// class Template extends LitElement {
//   static properties = {};

//   static styles = css`
//     :host {
//       -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
//       -moz-box-sizing: border-box; /* Firefox, other Gecko */
//       box-sizing: border-box;
//       display: block;
//     }
//   `;

//   render() {
//     return html` <div>Hello World</div> `;
//   }
// }

// customElements.define("bw-", Template);

//=== YT Embed ===//
class BwYtEmbed extends LitElement {
  static properties = {
    videoID: { type: String },
    image: { type: String },
    ratio: { type: String },
  };

  static get styles() {
    return css`
      :host {
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box;
        display: flex;
      }

      #video {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
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
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: 1px;
        color: #fff;
      }
    `;
  }

  constructor() {
    super();
    this.videoID = "mVjYG9TSN88";
    this.ratio = "16 / 9";
    this.defImg = "https://images.unsplash.com/photo-1693748960930-aa517d67fe00";
    this.imgixOpt = "?&auto=format&q=15&chromasub=444";
  }

  firstUpdated() {
    this.loadYouTubeAPI();
  }

  initializePlayer() {
    if (this.player) {
      // Player already initialized
      return;
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

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-ytembed-${BwYtEmbed.instanceCounter++}`;
  }

  render() {
    const fbRatio = this.ratio || " 16 / 9";
    const src = this.image === "" ? this.defImg : this.image;
    const imgLogic = src + this.imgixOpt;
    return html`
      <div id="video" style="background-image: url(${imgLogic}); aspect-ratio: ${fbRatio};">
        <bw-button kind="button" variant="" link="#" @click="${this.initializePlayer}">Play</bw-button>
        <div id="player-container"></div>
      </div>
    `;
  }
}

customElements.define("bw-ytembed", BwYtEmbed);

//=== Our Promise ===//
class BwProcess extends LitElement {
  static properties = {
    title: { type: String },
    overline: { type: String },
    reverse: { type: Boolean },
  };

  constructor() {
    super();
    this.reverse = true;
    this.title = "Title Goes Here";
    this.overline = "Overline Text";
  }

  static styles = css`
    :host {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: clamp(40px, 3dvw, 64px) 12px;
      background-color: rgba(246, 246, 246, 1);
    }
  `;

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-process-${BwProcess.instanceCounter++}`;
  }

  render() {
    return html`
      <bw-grid style="--max-width: 1920px; --col-width: 280px; margin-bottom: clamp(40px, 3dvw, 64px);"><bw-overline-text overline="${this.overline}" title="${this.title}" reverse="${this.reverse}"></bw-overline-text></bw-grid>
      <bw-grid style="--max-width: 1920px; --col-width: 280px; --grid-gap: var(--resGap); --grid-gap-md: var(--resGap); --grid-gap-sm: var(--resGap); --grid-gap-xs: var(--resGap);">
        <slot></slot>
      </bw-grid>
    `;
  }
}

customElements.define("bw-process", BwProcess);

//=== SVG Blurb ===//
class BwSVGBlurb extends LitElement {
  static properties = {
    icon: { type: String },
    size: { type: String },
    fill: { type: String },
    heading: { type: String },
    level: { type: Number },
    text: { type: String },
    align: { type: String },
  };

  constructor() {
    super();
    this.icon = "transparent";
    this.size = "64px";
    this.fill = "black";
    this.heading = "This is heading";
    this.level = 3;
    this.text = "Sed sit amet bibendum orci. Aenean accumsan, lacus id rhoncus finibus, nisl tortor facilisis dolor.";
    this.align = "left";
  }

  static styles = css`
    :host {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    bw-brand-svg {
      margin-bottom: 24px;
    }
  `;

  render() {
    return html`
      <bw-brand-svg icon="${this.icon}" size="${this.size}" fill="${this.fill}" align="${this.align}"></bw-brand-svg>
      <bw-heading-p level="${this.level}" heading="${this.heading}" text="${this.text}" align="${this.align}"></bw-heading-p>
    `;
  }
}

customElements.define("bw-svg-blurb", BwSVGBlurb);

//=== Brand SVG ===//
class BwBrandSVG extends LitElement {
  static get properties() {
    return {
      icon: { type: String },
      size: { type: String },
      fill: { type: String },
      align: { type: String },
    };
  }

  constructor() {
    super();
    this.icon = "transparent";
    this.size = "64px";
    this.fill = "black";
    this.align = "flex-start";
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box;
        width: 100%;
      }

      svg {
        display: block;
        width: inherit;
        height: auto;
      }
    `;
  }

  computeSVG(svg) {
    // Generate a unique ID for each SVG to ensure clip paths do not collide
    const uniqueClipPathId = `clip-${Math.random().toString(36).substr(2, 9)}`;

    // Define the clip path once, if possible
    const clipPathDef = html`
      <defs>
        <clipPath id="${uniqueClipPathId}">
          <rect width="100%" height="100%" />
        </clipPath>
      </defs>
    `;

    switch (svg) {
      case "transparent":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0047 6.99527C16.1091 3.40771 12.8649 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 12.8649 3.40771 16.1091 6.99527 17.0047C7.89086 20.5923 11.1351 23.25 15 23.25C19.5563 23.25 23.25 19.5563 23.25 15C23.25 11.1351 20.5923 7.89086 17.0047 6.99527ZM15 22.5C11.6109 22.5 8.74684 20.2521 7.81748 17.1659C8.20366 17.2213 8.59848 17.25 9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 8.59848 17.2213 8.20366 17.1659 7.81748C20.2521 8.74684 22.5 11.6109 22.5 15C22.5 19.1421 19.1421 22.5 15 22.5ZM7.5 15C7.5 15.4694 7.54313 15.9288 7.62564 16.3744C8.07119 16.4569 8.53056 16.5 9 16.5C9.19631 16.5 9.39085 16.4925 9.58336 16.4776L7.52235 14.4166C7.50754 14.6091 7.5 14.8037 7.5 15ZM7.6528 13.4864C7.71128 13.2011 7.78596 12.9216 7.87585 12.649L11.351 16.1241C11.0784 16.214 10.7989 16.2887 10.5136 16.3472L7.6528 13.4864ZM8.53824 11.1903C8.40533 11.4153 8.28382 11.6478 8.17453 11.8871L12.1129 15.8255C12.3522 15.7162 12.5847 15.5947 12.8097 15.4618L8.53824 11.1903ZM8.96066 10.5521C9.11001 10.3497 9.2693 10.155 9.4378 9.96881L14.0312 14.5622C13.845 14.7307 13.6503 14.89 13.4479 15.0393L8.96066 10.5521ZM10.5517 8.96093C10.3492 9.11039 10.1544 9.2698 9.9681 9.43845L14.5616 14.0319C14.7302 13.8456 14.8896 13.6508 15.0391 13.4483L10.5517 8.96093ZM11.19 8.53847L15.4615 12.81C15.5945 12.5851 15.716 12.3526 15.8253 12.1134L11.8866 8.17472C11.6474 8.28403 11.4149 8.40555 11.19 8.53847ZM12.6486 7.87601L16.124 11.3514C16.2139 11.0789 16.2886 10.7994 16.3471 10.5141L13.4859 7.6529C13.2006 7.7114 12.9211 7.7861 12.6486 7.87601ZM14.4161 7.5224L16.4776 9.58394C16.4924 9.39124 16.5 9.1965 16.5 9C16.5 8.53056 16.4569 8.07119 16.3744 7.62564C15.9288 7.54313 15.4694 7.5 15 7.5C14.8035 7.5 14.6088 7.50756 14.4161 7.5224Z"
            fill="${this.fill}"
          />
          ${clipPathDef}
        </svg>`;
      case "shield":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C9.39661 3.9131 5.58192 4.33793 4 4.18621V12.8345C4 18.5393 9.33333 21.9885 12 23C14.6667 21.9885 20 18.5393 20 12.8345V4.18621C18.4181 4.33793 14.6034 3.9131 12 1ZM11.1376 13.2222L14.6667 9.69059L14.1246 9.14813L11.1376 12.1373L9.8754 10.8742L9.33333 11.4167L11.1376 13.2222Z" fill="${this.fill}" />
          ${clipPathDef}
        </svg>`;
      case "shipping":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1L3 5.5V17.5L12 22L21 17.5V5.5L12 1ZM8.4375 8.21875L16.6875 4.09375L15.1875 3.34375L6.9375 7.46875L8.4375 8.21875ZM3.75 17.0365V6.71353L6.75 8.21353V10.75L8.25 11.5V8.96353L11.25 10.4635V20.7865L3.75 17.0365ZM18 17.125L20.25 16V16.75L18 17.875V17.125ZM20.25 14.5L18.75 15.25V16L20.25 15.25V14.5Z" fill="${this.fill}" />
          ${clipPathDef}
        </svg>`;
      case "truck":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3H16.5V4.875H20.625L23.25 7.5V15.75H22.875C22.6679 15.75 22.5 15.9179 22.5 16.125C22.5 16.3321 22.6679 16.5 22.875 16.5H23.25C23.6642 16.5 24 16.8358 24 17.25C24 17.6642 23.6642 18 23.25 18H20.25C20.25 16.3431 18.9069 15 17.25 15C15.5931 15 14.25 16.3431 14.25 18H8.25C8.25 16.3431 6.90685 15 5.25 15C3.59315 15 2.25 16.3431 2.25 18H0V3ZM22.5 7.81066L21.4393 6.75H16.5V11.25H22.5V7.81066Z" fill="${this.fill}" />
          <path d="M19.5 18C19.5 19.2426 18.4926 20.25 17.25 20.25C16.0074 20.25 15 19.2426 15 18C15 16.7574 16.0074 15.75 17.25 15.75C18.4926 15.75 19.5 16.7574 19.5 18Z" fill="${this.fill}" />
          <path d="M5.25 20.25C6.49264 20.25 7.5 19.2426 7.5 18C7.5 16.7574 6.49264 15.75 5.25 15.75C4.00736 15.75 3 16.7574 3 18C3 19.2426 4.00736 20.25 5.25 20.25Z" fill="${this.fill}" />
          ${clipPathDef}
        </svg>`;
      case "money":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path d="M14.0508 1.87659H16.5854C16.8886 1.87777 17.1715 2.02276 17.3417 2.26384C17.5119 2.50491 17.5472 2.81124 17.4362 3.08242L16.5854 5.4H7.41461L6.56378 3.08242C6.45278 2.81124 6.48814 2.5049 6.65832 2.26384C6.82849 2.02277 7.11141 1.87777 7.41463 1.87659H9.94952C10.4732 1.31861 11.2183 1 12.0002 1C12.782 1 13.5271 1.31859 14.0508 1.87659Z" fill="${this.fill}" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.4171 6.86667H16.5829C16.5829 6.86667 23 11.9609 23 17.9058C23 21.3011 20.2481 23 18.4169 23H5.58313C3.75955 23 1 21.3012 1 17.9058C1 11.9609 7.4171 6.86667 7.4171 6.86667ZM12.9158 20.0278V18.6682C14.3206 18.4195 15.1635 17.6061 15.1634 16.3907C15.1634 15.2541 14.4836 14.6313 12.9057 14.3246L11.9599 14.1387C11.0393 13.9482 10.6655 13.6995 10.6655 13.2509C10.6655 12.6978 11.2376 12.3446 12.0302 12.3446C12.8229 12.3446 13.4 12.7279 13.4777 13.302L15.0104 13.3018C14.9704 12.2491 14.1449 11.4659 12.9057 11.2103V9.83914H11.0745V11.2082C9.80511 11.4708 9.00733 12.2703 9.00733 13.3788C9.00733 14.4874 9.70974 15.1776 11.1397 15.4542L12.1608 15.6564C13.1241 15.8561 13.5153 16.1211 13.5153 16.5859C13.5153 17.132 12.9108 17.5154 12.0579 17.5154C11.1322 17.5154 10.4924 17.1366 10.4147 16.5486H8.82675C8.88692 17.6688 9.73474 18.4403 11.0844 18.6727L11.0846 20.0278H12.9158Z" fill="${this.fill}" />
          ${clipPathDef}
        </svg>`;
      case "chat":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path d="M9.75 11.6154H4.5V10.8462H9.75V11.6154Z" fill="${this.fill}" />
          <path d="M10.5 16.2308H4.5V15.4615H10.5V16.2308Z" fill="${this.fill}" />
          <path d="M4.5 13.9231H12V13.1538H4.5V13.9231Z" fill="${this.fill}" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.9467 14.6017C23.6174 13.3778 24 11.9655 24 10.4615C24 5.78836 20.3063 2 15.75 2C13.1557 2 10.841 3.22819 9.32867 5.1486C8.97564 5.10131 8.6156 5.07692 8.25 5.07692C3.69365 5.07692 0 8.86528 0 13.5385C0 15.0424 0.382566 16.4547 1.05333 17.6786L0 22L4.21333 20.9197C5.40662 21.6076 6.78364 22 8.25 22C10.8443 22 13.159 20.7718 14.6713 18.8514C15.0244 18.8987 15.3844 18.9231 15.75 18.9231C17.2164 18.9231 18.5934 18.5307 19.7867 17.8427L24 18.9231L22.9467 14.6017ZM16.4916 13.1538H18V12.3846H16.4239C16.4576 12.6376 16.4803 12.8942 16.4916 13.1538ZM16.0736 10.8462H19.5V10.0769H15.7803C15.8898 10.3271 15.9878 10.5838 16.0736 10.8462ZM14.9063 8.53846H17.25V7.76923H14.2851C14.5064 8.01267 14.7139 8.26952 14.9063 8.53846ZM1.03078 20.9428L1.85328 17.5684L1.70712 17.3017C1.09779 16.1899 0.75 14.907 0.75 13.5385C0.75 9.29012 4.10786 5.84615 8.25 5.84615C12.3921 5.84615 15.75 9.29012 15.75 13.5385C15.75 17.7868 12.3921 21.2308 8.25 21.2308C6.91567 21.2308 5.66483 20.8741 4.58083 20.2491L4.32081 20.0992L1.03078 20.9428Z"
            fill="${this.fill}"
          />
          ${clipPathDef}
        </svg>`;
      case "image":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path d="M9.00299 8.25C9.00299 8.84674 8.76594 9.41903 8.34398 9.84099C7.92203 10.2629 7.34973 10.5 6.75299 10.5C6.15626 10.5 5.58396 10.2629 5.162 9.84099C4.74005 9.41903 4.50299 8.84674 4.50299 8.25C4.50299 7.65326 4.74005 7.08097 5.162 6.65901C5.58396 6.23705 6.15626 6 6.75299 6C7.34973 6 7.92203 6.23705 8.34398 6.65901C8.76594 7.08097 9.00299 7.65326 9.00299 8.25Z" fill="${this.fill}" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.124999 19.6975C0.0441729 19.4803 0 19.2453 0 19V5C0 3.89543 0.895431 3 2 3H22C23.1046 3 24 3.89543 24 5V19C24 20.1046 23.1046 21 22 21H2C1.14076 21 0.40808 20.4582 0.124999 19.6975ZM2 4H22C22.5523 4 23 4.44771 23 5V14.4875L16.8375 11.3295C16.6968 11.259 16.5376 11.2346 16.3822 11.2596C16.2269 11.2847 16.0834 11.3579 15.972 11.469L10.407 17.034L6.417 14.376C6.27294 14.2801 6.10015 14.2369 5.92791 14.2539C5.75568 14.2708 5.5946 14.3468 5.472 14.469L1 18.5806V5C1 4.44772 1.44772 4 2 4Z" fill="${this.fill}" />
          ${clipPathDef}
        </svg>`;
      case "watch":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5 0L15.9187 5.02384C18.3546 6.39512 20 9.00542 20 12C20 14.9946 18.3546 17.6049 15.9187 18.9762L15.5 24H8.5L8.08135 18.9762C5.64535 17.6049 4 14.9946 4 12C4 9.00542 5.64535 6.39512 8.08135 5.02384L8.5 0H15.5ZM15.6076 6C14.554 5.36518 13.3197 5 12 5C10.6803 5 9.44596 5.36518 8.39241 6C6.35958 7.2249 5 9.45368 5 12C5 14.5463 6.35958 16.7751 8.39241 18C9.44595 18.6348 10.6803 19 12 19C13.2081 19 14.3448 18.6939 15.3366 18.1551C15.4282 18.1054 15.5185 18.0537 15.6076 18C17.6404 16.7751 19 14.5463 19 12C19 9.45367 17.6404 7.2249 15.6076 6Z" fill="${this.fill}" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.176 10.1698L12.0076 12.672L8.88538 10.9085L9.37718 10.0378L11.9923 11.5149L15.6613 9.31243L16.176 10.1698Z" fill="${this.fill}" />
          ${clipPathDef}
        </svg>`;
      case "form":
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M22 2H2V22H22V2ZM9 15V13L17 5L19 7L11 15H9ZM5 6.5H11V5.5H5V6.5ZM5 12.5H8V11.5H5V12.5ZM5 9.57692H9V8.5H5V9.57692ZM5 15.5H7V14.5H5V15.5ZM19 18.5H5V17.5H19V18.5Z" fill="${this.fill}" />
          ${clipPathDef}
        </svg>`;
      default:
        return html`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="max-width:${this.size}">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.0047 6.99527C16.1091 3.40771 12.8649 0.75 9 0.75C4.44365 0.75 0.75 4.44365 0.75 9C0.75 12.8649 3.40771 16.1091 6.99527 17.0047C7.89086 20.5923 11.1351 23.25 15 23.25C19.5563 23.25 23.25 19.5563 23.25 15C23.25 11.1351 20.5923 7.89086 17.0047 6.99527ZM15 22.5C11.6109 22.5 8.74684 20.2521 7.81748 17.1659C8.20366 17.2213 8.59848 17.25 9 17.25C13.5563 17.25 17.25 13.5563 17.25 9C17.25 8.59848 17.2213 8.20366 17.1659 7.81748C20.2521 8.74684 22.5 11.6109 22.5 15C22.5 19.1421 19.1421 22.5 15 22.5ZM7.5 15C7.5 15.4694 7.54313 15.9288 7.62564 16.3744C8.07119 16.4569 8.53056 16.5 9 16.5C9.19631 16.5 9.39085 16.4925 9.58336 16.4776L7.52235 14.4166C7.50754 14.6091 7.5 14.8037 7.5 15ZM7.6528 13.4864C7.71128 13.2011 7.78596 12.9216 7.87585 12.649L11.351 16.1241C11.0784 16.214 10.7989 16.2887 10.5136 16.3472L7.6528 13.4864ZM8.53824 11.1903C8.40533 11.4153 8.28382 11.6478 8.17453 11.8871L12.1129 15.8255C12.3522 15.7162 12.5847 15.5947 12.8097 15.4618L8.53824 11.1903ZM8.96066 10.5521C9.11001 10.3497 9.2693 10.155 9.4378 9.96881L14.0312 14.5622C13.845 14.7307 13.6503 14.89 13.4479 15.0393L8.96066 10.5521ZM10.5517 8.96093C10.3492 9.11039 10.1544 9.2698 9.9681 9.43845L14.5616 14.0319C14.7302 13.8456 14.8896 13.6508 15.0391 13.4483L10.5517 8.96093ZM11.19 8.53847L15.4615 12.81C15.5945 12.5851 15.716 12.3526 15.8253 12.1134L11.8866 8.17472C11.6474 8.28403 11.4149 8.40555 11.19 8.53847ZM12.6486 7.87601L16.124 11.3514C16.2139 11.0789 16.2886 10.7994 16.3471 10.5141L13.4859 7.6529C13.2006 7.7114 12.9211 7.7861 12.6486 7.87601ZM14.4161 7.5224L16.4776 9.58394C16.4924 9.39124 16.5 9.1965 16.5 9C16.5 8.53056 16.4569 8.07119 16.3744 7.62564C15.9288 7.54313 15.4694 7.5 15 7.5C14.8035 7.5 14.6088 7.50756 14.4161 7.5224Z"
            fill="${this.fill}"
          />
          ${clipPathDef}
        </svg>`;
    }
  }

  alignIcon(align) {
    return ["center", "flex-start", "flex-end"].includes(align) ? align : "inherit";
  }

  render() {
    this.style.setProperty("justify-content", this.align);
    return this.computeSVG(this.icon);
  }
}

customElements.define("bw-brand-svg", BwBrandSVG);

//=== Grid2 ===//
class Grid2 extends LitElement {
  static get properties() {
    return {
      tag: { type: String },
      width: { type: String },
      gap: { type: String },
    };
  }

  constructor() {
    super();
    this.tag = "div"; // Default element
  }

  static get styles() {
    return css`
      div,
      header,
      nav,
      main,
      section,
      footer {
        --gap: 64px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(calc(var(--col-width) - var(--gap)), 1fr));
        gap: var(--gap);
        width: 100%;
        max-width: var(--max-width, 100%);
        margin: auto;
      }

      @media screen and (max-width: 1199px) {
        div,
        header,
        nav,
        main,
        section,
        footer {
          --gap: 32px;
        }
      }

      @media screen and (max-width: 767px) {
        div,
        header,
        nav,
        main,
        section,
        footer {
          --gap: 24px;
        }
      }

      @media screen and (max-width: 479px) {
        div,
        header,
        nav,
        main,
        section,
        footer {
          --gap: 16px;
        }
      }
    `;
  }

  render() {
    switch (this.tag) {
      case "div":
        return html`<div><slot></slot></div>`;
      case "header":
        return html`<header><slot></slot></header>`;
      case "nav":
        return html`<nav><slot></slot></nav>`;
      case "main":
        return html`<main><slot></slot></main>`;
      case "section":
        return html`<section><slot></slot></section>`;
      case "footer":
        return html`<footer><slot></slot></footer>`;
      default:
        return html`<div><slot></slot></div>`; // Default case
    }
  }
}

customElements.define("bw-grid2", Grid2);

//=== Grid ===//
class Grid extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      :host {
        --resGap: clamp(40px, 3dvw, 64px);
        --gap: var(--grid-gap, 64px);
        --gap-md: var(--grid-gap-md, 32px);
        --gap-sm: var(--grid-gap-sm, 24px);
        --gap-xs: var(--grid-gap-xs, 16px);
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(calc(var(--col-width) - var(--gap)), 1fr));
        gap: var(--gap);
        width: 100%;
        max-width: var(--max-width, 100%);
        margin: auto;
      }

      @media screen and (max-width: 1199px) {
        :host {
          gap: var(--gap-md);
        }
      }

      @media screen and (max-width: 767px) {
        :host {
          gap: var(--gap-sm);
        }
      }

      @media screen and (max-width: 479px) {
        :host {
          gap: var(--gap-xs);
        }
      }
    `;
  }

  render() {
    return html`<slot></slot>`; // Use slot for child elements
  }
}

customElements.define("bw-grid", Grid);

//=== Heading Blurb ===//
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

//=== Lists ===//
class BwList extends LitElement {
  static properties = {};

  static styles = css`
    :host {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    ::slotted(li),
    ::slotted(div) {
      margin: 10px 0;
      padding: 5px;
      border: 1px solid black;
      border-radius: 5px;
    }
  `;

  constructor() {
    super();
    this.lists = 0;
  }

  render() {
    return html`
      <ul>
        <slot>
      </ul>
    `;
  }
}

customElements.define("bw-list", BwList);

//=== Section ===//
// FW, XL, L, M, S sizes with adjustable margins and paddings

//=== Images ===//
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
        animation: fadeIn 0.3s ease-in-out;
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
  };

  constructor() {
    super();
    this.defImg = "https://images.unsplash.com/photo-1693748960930-aa517d67fe00";
    this.imgixOpt = "?&auto=format&q=15&chromasub=444";
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-image-${BwImage.instanceCounter++}`;
  }

  render() {
    const src = this.imgSrc === "" ? this.defImg : this.imgSrc;
    const imgLogic = src + this.imgixOpt;
    return html`
      <picture class="bw-picture">
        <source media="(max-width: 479px)" srcset="${imgLogic}&w=480&dpr=2 2x, ${imgLogic}&w=480&dpr=3 3x" />
        <source media="(min-width: 480px) and (max-width: 1199px)" srcset="${imgLogic}&w=840&dpr=2 2x, ${imgLogic}&w=840&dpr=3 3x" />
        <source media="(min-width: 1200px)" srcset="${imgLogic}&w=1280&dpr=2 2x, ${imgLogic}&w=1280&dpr=3 3x" />
        <img class="bw-image" src="${src}" loading="${this.lazyLoading || "eager"}" fetchpriority="${this.imgPriority || "low"}" alt="${this.altTag}" style="aspect-ratio: ${this.imgRatio};" />
      </picture>
    `;
  }
}
customElements.define("bw-image", BwImage);

//=== Overline Title ===//
class BwOverlineText extends LitElement {
  static get styles() {
    return css`
      :host,
      .bw-overline-container {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
      }

      *,
      .bw-overline-container {
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box;
      }

      .bw-overline-container {
        font-weight: 500;
        margin: 0;
      }

      .bw-overline-container__overline {
        font-family: var(--bw-font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        text-transform: uppercase;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 2px;
      }

      .bw-overline-container__title {
        display: block;
        font-family: var(--bw-font-head), serif;
        margin: 0;
        font-size: 48px;
        line-height: 56px;
        font-style: normal;
      }

      @media screen and (max-width: 1199px) {
        .bw-overline-container__title {
          font-size: 40px;
          line-height: 48px;
        }
      }

      @media screen and (max-width: 767px) {
        .bw-overline-container__title {
          font-size: 32px;
          line-height: 40px;
        }
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      overline: { type: String },
      uid: { type: String },
      reverse: { type: Boolean },
    };
  }

  static instanceCounter = 0;

  constructor() {
    super();
    // Setting default values
    this.overline = this.overline || "Overline";
    this.title = this.title || "Title Text";
  }

  connectedCallback() {
    super.connectedCallback();
    this.uid = `bw-overline-text-${BwOverlineText.instanceCounter++}`;
  }

  render() {
    const isReverse = this.reverse === true;
    return html`
      <h2 class="bw-overline-container" id="${this.uid}">
        <span class="${isReverse ? "bw-overline-container__title" : "bw-overline-container__overline"}" style="margin-bottom: 4px;">${isReverse ? this.title : this.overline}</span>
        <span class="${isReverse ? "bw-overline-container__overline" : "bw-overline-container__title"}">${isReverse ? this.overline : this.title}</span>
      </h2>
    `;
  }
}

customElements.define("bw-overline-text", BwOverlineText);

// === Button === //
class BwButton extends LitElement {
  static get styles() {
    return css`
      :host,
      * {
        display: flex;
        /* align-self: flex-start; */
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box;
        border: none;
      }

      .bw-btn,
      .bw-btn-outline,
      .bw-btn-white,
      .bw-btn-opaque,
      .bw-btn-brand {
        max-width: 100%;
        display: flex;
        font-family: var(--bw-font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: 500;
        flex-direction: row;
        align-items: center;
        padding: 16px 32px;
        background: black;
        color: white;
        border-radius: 32px;
        font-size: 14px;
        line-height: 24px;
        transition: all 0.2s ease-in-out;
        text-decoration: none;
        text-align: center;
        justify-content: center;

        &:hover {
          color: rgba(177, 243, 71, 1);
          cursor: pointer;

          &:after {
            content: url(data:image/svg+xml;charset=UTF-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0nI0IxRjM0NycgY2xhc3M9J2JpIGJpLWNoZXZyb24tcmlnaHQnIHZpZXdCb3g9JzAgMCAxNiAxNic+PHBhdGggZmlsbC1ydWxlPSdldmVub2RkJyBkPSdNNC42NDYgMS42NDZhLjUuNSAwIDAgMSAuNzA4IDBsNiA2YS41LjUgMCAwIDEgMCAuNzA4bC02IDZhLjUuNSAwIDAgMS0uNzA4LS43MDhMMTAuMjkzIDggNC42NDYgMi4zNTRhLjUuNSAwIDAgMSAwLS43MDh6Jy8+PC9zdmc+);
            margin-left: 8px;
            opacity: 1;
          }
        }

        &:before {
          content: "";
        }

        &:after {
          content: "";
          transition: all 0.2s ease-in-out;
          opacity: 0;
        }
      }

      .bw-btn-outline,
      .bw-btn-white,
      .bw-btn-opaque {
        background-color: white;
        color: black;
        border: 1px solid black;
        padding: 15px 32px;

        &:hover {
          color: black;
          background-color: rgba(177, 243, 71, 1);

          &:after {
            content: url(data:image/svg+xml;charset=UTF-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0nIzAwMDAwJyBjbGFzcz0nYmkgYmktY2hldnJvbi1yaWdodCcgdmlld0JveD0nMCAwIDE2IDE2Jz48cGF0aCBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGQ9J000LjY0NiAxLjY0NmEuNS41IDAgMCAxIC43MDggMGw2IDZhLjUuNSAwIDAgMSAwIC43MDhsLTYgNmEuNS41IDAgMCAxLS43MDgtLjcwOEwxMC4yOTMgOCA0LjY0NiAyLjM1NGEuNS41IDAgMCAxIDAtLjcwOHonLz48L3N2Zz4=);
          }
        }
      }

      .bw-btn-white {
        border: none;
        padding: 16px 32px;

        &:hover {
          &:after {
            content: url(data:image/svg+xml;charset=UTF-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0nIzAwMDAwJyBjbGFzcz0nYmkgYmktY2hldnJvbi1yaWdodCcgdmlld0JveD0nMCAwIDE2IDE2Jz48cGF0aCBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGQ9J000LjY0NiAxLjY0NmEuNS41IDAgMCAxIC43MDggMGw2IDZhLjUuNSAwIDAgMSAwIC43MDhsLTYgNmEuNS41IDAgMCAxLS43MDgtLjcwOEwxMC4yOTMgOCA0LjY0NiAyLjM1NGEuNS41IDAgMCAxIDAtLjcwOHonLz48L3N2Zz4=);
          }
        }
      }

      .bw-btn-brand {
        color: black;
        background-color: rgba(177, 243, 71, 1);
        border: none;
        padding: 16px 32px;

        &:hover {
          color: black;

          &:after {
            content: url(data:image/svg+xml;charset=UTF-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0nIzAwMDAwJyBjbGFzcz0nYmkgYmktY2hldnJvbi1yaWdodCcgdmlld0JveD0nMCAwIDE2IDE2Jz48cGF0aCBmaWxsLXJ1bGU9J2V2ZW5vZGQnIGQ9J000LjY0NiAxLjY0NmEuNS41IDAgMCAxIC43MDggMGw2IDZhLjUuNSAwIDAgMSAwIC43MDhsLTYgNmEuNS41IDAgMCAxLS43MDgtLjcwOEwxMC4yOTMgOCA0LjY0NiAyLjM1NGEuNS41IDAgMCAxIDAtLjcwOHonLz48L3N2Zz4=);
          }
        }
      }

      .bw-btn-opaque {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border-color: white;

        &:hover {
          background-color: rgba(0, 0, 0, 0.5);
          color: rgba(177, 243, 71, 1);

          &:after {
            content: url(data:image/svg+xml;charset=UTF-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0nI0IxRjM0NycgY2xhc3M9J2JpIGJpLWNoZXZyb24tcmlnaHQnIHZpZXdCb3g9JzAgMCAxNiAxNic+PHBhdGggZmlsbC1ydWxlPSdldmVub2RkJyBkPSdNNC42NDYgMS42NDZhLjUuNSAwIDAgMSAuNzA4IDBsNiA2YS41LjUgMCAwIDEgMCAuNzA4bC02IDZhLjUuNSAwIDAgMS0uNzA4LS43MDhMMTAuMjkzIDggNC42NDYgMi4zNTRhLjUuNSAwIDAgMSAwLS43MDh6Jy8+PC9zdmc+);
          }
        }
      }
    `;
  }

  static get properties() {
    return {
      label: { type: String },
      link: { type: String },
      kind: { type: String },
      variant: { type: String },
      onClick: {},
    };
  }

  static instanceCounter = 0;

  constructor() {
    super();
    // Setting default values
    this.label = this.label || "Default Label";
    this.link = this.link || "#";
    this.kind = this.kind || "button";
    this.variant = this.variant || "default";
    // this.addEventListener('click', (e) => console.log(e.type, e.target.localName));
  }

  computeClass(type) {
    switch (type) {
      case "outline":
        return "bw-btn-outline";
      case "white":
        return "bw-btn-white";
      case "brand":
        return "bw-btn-brand";
      case "opaque":
        return "bw-btn-opaque";
      default:
        return "bw-btn";
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-button-${BwButton.instanceCounter++}`;
  }

  render() {
    if (this.kind === "link") {
      return html`<a href=${this.link} class=${this.computeClass(this.variant)} id="${this.id}"><slot></a>`;
    } else {
      return html`<button class=${this.computeClass(this.variant)} @click="${this.onClick}"><slot></button>`;
    }
  }
}

customElements.define("bw-button", BwButton);

// === FW Banner === //
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

    bw-image,
    bw-ytembed {
      display: flex;
      width: 50%;
      align-self: stretch;
    }

    .bw-fw-banner-content {
      width: 50%;
      padding: 40px;
      max-width: 744px;

      & bw-overline-text {
        margin-bottom: 40px;
      }

      & .bw-fw-banner-overline {
        font-family: var(--bw-font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        text-transform: uppercase;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 2px;
        margin-bottom: 4px;
      }

      & .bw-fw-banner-title {
        display: block;
        font-family: var(--bw-font-head), serif;
        font-weight: 500;
        margin: 0;
        font-size: 48px;
        line-height: 56px;
        font-style: normal;
        margin-bottom: 24px;
      }

      & bw-button {
        margin-top: 56px;
      }
    }

    .bw-fw-banner-paragraph {
      font-family: var(--bw-font-body), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      margin: 0;
      line-height: 24px;
    }

    @media screen and (max-width: 1199px) {
    }

    @media screen and (max-width: 767px) {
      .bw-fw-banner-container,
      .img-left,
      .img-right {
        flex-direction: column;

        & bw-image,
        bw-ytembed {
          min-height: 320px;
          width: 100%;
        }

        & .bw-fw-banner-content {
          width: 100%;
          padding: 24px;
        }
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
  };

  static instanceCounter = 0;

  constructor() {
    super();
    this.titleId = `bw-fw-banner-title-${BwFwBanner.instanceCounter++}`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-fw-banner-${BwFwBanner.instanceCounter++}`;
  }

  render() {
    return html`
      <section class="bw-fw-banner-container ${this.layout || "img-left"}" role="banner" aria-labelledby="${this.titleId}">
        ${this.variant === "video" ? html`<bw-ytembed ratio="16/8" videoID="${this.videoID}" image="${this.imgSrc}"></bw-ytembed>` : html`<bw-image src="${this.imgSrc}" lazy-loading="${this.lazyLoading}" priority="${this.imgPriority}" alt="${this.title} Banner Image" ratio="16/8"></bw-image>`}
        <div class="bw-fw-banner-content">
          <bw-overline-text overline="${this.overline}" title="${this.title}" uid="${this.titleId}"></bw-overline-text>
          <p class="bw-fw-banner-paragraph"><slot name="content"></slot></p>
          <div style="margin-top: 56px;"><slot name="cta"></slot></div>
        </div>
      </section>
    `;
  }
}

customElements.define("bw-fw-banner", BwFwBanner);

//=== Tabs ===//
class BwTabs extends LitElement {
  static properties = {
    activeTab: { type: Number },
    tabNames: { type: Array },
  };

  static styles = css`
    .tabs-buttons {
      display: flex;
      margin-bottom: 10px;
    }
    .tab-button {
      cursor: pointer;
      padding: 5px 10px;
      margin-right: 5px;
      border: 1px solid #ccc;
      border-radius: 5px 5px 0 0;
      background-color: #f0f0f0;
    }
    .tab-button.active {
      background-color: white;
      border-bottom: 1px solid white;
    }
    .tabs-content {
      border: 1px solid #ccc;
      padding: 10px;
      border-radius: 0 0 5px 5px;
    }
    .tab-content {
      display: none;
    }
    .tab-content.active {
      display: block;
    }
  `;

  constructor() {
    super();
    this.activeTab = 0;
    this.tabNames = ["Home", "Profile", "Settings", "Contact"]; // You can set default tab names here if you wish
  }

  render() {
    return html`
      <div class="tabs-buttons" role="tablist">${this.tabNames.map((tabName, index) => html` <button id="tab${index}" class="tab-button ${this.activeTab === index ? "active" : ""}" role="tab" aria-selected="${this.activeTab === index ? "true" : "false"}" tabindex="${this.activeTab === index ? "0" : "-1"}" @click="${() => (this.activeTab = index)}" @keydown="${this._handleKeydown}">${tabName || `Tab ${index + 1}`}</button> `)}</div>
      <div class="tabs-content">${this.tabNames.map((_, index) => html` <div class="tab-content ${this.activeTab === index ? "active" : ""}" role="tabpanel" aria-labelledby="tab${index}">Content for Tab ${index + 1}</div> `)}</div>
    `;
  }

  _handleKeydown(e) {
    if (e.key === "ArrowRight") {
      this.activeTab = (this.activeTab + 1) % this.tabNames.length;
    } else if (e.key === "ArrowLeft") {
      this.activeTab = (this.activeTab - 1 + this.tabNames.length) % this.tabNames.length;
    }
  }
}

customElements.define("bw-tabs", BwTabs);
