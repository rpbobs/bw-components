import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwLabelText extends LitElement {
  static properties = {
    label: { type: String },
    text: { type: String },
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
    }

    :host {
      animation: fadeIn 0.3s ease-in-out;
      display: block;
    }

    .bw-labeltext__label {
      font-weight: 600;
      line-height: 24px;
      display: block;
    }
    
    .bw-labeltext__text {
      color: #757575;
      display: block;
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
    this.label = "Location";
    this.text = "Newport Beach, CA";
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-labeltext-${BwLabelText.instanceCounter++}`;
  }

  render() {
    return html`
      <div class="bw-labeltext">
        <span class="bw-labeltext__label">${this.label}</span>
        <span class="bw-labeltext__text">${this.text}</span>
      </div>
    `;
  }
}

customElements.define("bw-labeltext", BwLabelText);
