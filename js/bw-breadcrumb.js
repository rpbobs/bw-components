import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== Bwbreadcrumb ===//
class Bwbreadcrumb extends LitElement {
  static properties = {
    home: { type: String },
    level1: { type: String },
    level2: { type: String },
    level3: { type: String },
    l1url: { type: String },
    l2url: { type: String },
    l3url: { type: String },
    currentUrl: { type: String },
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
      container: inline-size;
      animation: fadeIn 0.3s ease-in-out;
      margin: 1rem auto;
      /* display: block; */
    }

    ol {
      display: flex;
      align-items: center;
      padding-left: 0;
      gap: 8px;
      color: rgba(0, 0, 0, 0.66);
      margin: 0;

      li {
        list-style: none;
        display: inline-block;
      }
    }

    a {
      text-decoration: none;
      line-height: 1;
      color: rgba(0, 0, 0, 0.66);

      &[aria-current="page"] {
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        text-decoration: underline;
      }
    }

    .bw-breadcrumb__back-button {
      display: flex;
      background-color: transparent;
      border: none;
      padding: 8px;
      cursor: pointer;

      svg {
        width: 24px;
        height: 24px;
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

    @container (min-width: 576px) {
      /* Your styles here */
    }

    @container (min-width: 1024px) {
      /* Your styles here */
    }
  `;

  constructor() {
    super();
    this.home = "Home";
    this.level1 = "Rolex";
    this.level2 = "Datejust";
    this.level3 = "116334";
    this.l1url = "#";
    this.l2url = "#";
    this.l3url = "#";
    this.currentUrl = window.location.href;
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-breadcrumb-${Bwbreadcrumb.instanceCounter++}`;
  }

  goBack() {
    window.history.back();
  }

  getAriaCurrent(url) {
    // Ensure full URL match or relative path match if applicable
    const currentUrl = new URL(this.currentUrl, window.location.origin);
    const targetUrl = new URL(url, window.location.origin);
    return currentUrl.href === targetUrl.href ? "page" : null;
  }

  renderBreadcrumbItem(label, url) {
    if (this.getAriaCurrent(url)) {
      return html`<span aria-current="page">${label}</span>`;
    } else {
      return html`<a href="${url}">${label}</a>`;
    }
  }

  render() {
    return html`
      <nav aria-label="breadcrumb" class="bw-breadcrumb">
        <ol>
          <li>
            <button @click="${this.goBack}" class="bw-breadcrumb__back-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="-0.5" y="0.5" width="23" height="23" rx="11.5" transform="matrix(-1 0 0 1 23 0)" fill="white"></rect>
                <path d="M14 8L10 12L14 16" stroke="black" stroke-width="1.6"></path>
                <rect x="-0.5" y="0.5" width="23" height="23" rx="11.5" transform="matrix(-1 0 0 1 23 0)" stroke="black"></rect>
              </svg>
            </button>
          </li>
          <li>
            <a href="${this.l1url}" aria-current="${this.getAriaCurrent(this.l1url)}">${this.level1}</a>
          </li>
          <span>/</span>
          <li>
            <a href="${this.l2url}" aria-current="${this.getAriaCurrent(this.l2url)}">${this.level2}</a>
          </li>
          <span>/</span>
          <li>
            <a href="${this.l3url}" aria-current="${this.getAriaCurrent(this.l3url)}">${this.level3}</a>
          </li>
        </ol>
      </nav>
    `;
  }
}

customElements.define("bw-breadcrumb", Bwbreadcrumb);
