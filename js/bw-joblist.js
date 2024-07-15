import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-button.js";

class BwJobList extends LitElement {
  static properties = {
    link: { type: String },
    buttonText: { type: String },
    location: { type: String },
    job: { type: String },
    border: { type: Boolean },
  };

  static styles = css`
    :host {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
      display: flex;
      width: 100%;
      font-family: Inter, sans-serif;
    }

    .bw-overline {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 2px;
      text-transform: uppercase;
      display: block;
    }

    .bw-joblist {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 1rem;
      padding: 1.5rem 0;

      & .bw-joblist__text {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
      }

      bw-button {
        --width: 100%;
      }
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
      .bw-joblist {
        flex-direction: row;

        & bw-button {
          --max-width: 256px;
        }
      }
    }

    /* Large devices (lg): 992px and up */
    @media screen and (min-width: 992px) {
      /* Your styles here */
    }

    /* Extra large devices (xl): 1200px and up */
    @media screen and (min-width: 1200px) {
      /* Your styles here */
    }
  `;

  constructor() {
    super();
    this.link = "#";
    this.buttonText = "Click Me";
    this.location = "Newport Beach, CA";
    this.job = "Customer Service Representative";
    this.border = false;
  }

  render() {
    return html`
      <div class="bw-joblist" style=${this.border ? "border-bottom: 1px solid #d9d9d9" : null}>
        <div class="bw-joblist__text">
          <span class="bw-overline">${this.job}</span>
          <span style="color: #757575">${this.location}</span>
        </div>
        <bw-button class="bw-joblist__button" kind="link" variant="default" id="" link=${this.link} styles="">${this.buttonText}</bw-button>
      </div>
    `;
  }
}

customElements.define("bw-joblist", BwJobList);
