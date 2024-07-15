import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwBreadcrumbItem extends LitElement {
  static properties = {
    label: { type: String },
    url: { type: String },
    currentUrl: { type: String },
  };

  static styles = css`
    :host {
      display: inline;
    }

    a,
    span {
      text-decoration: none;
      color: rgba(0, 0, 0, 0.66);
      line-height: 1;
    }

    a[aria-current="page"],
    span[aria-current="page"] {
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      text-decoration: underline;
    }
  `;

  constructor() {
    super();
    this.label = "";
    this.url = "";
    this.currentUrl = window.location.href;
  }

  getAriaCurrent(url) {
    const currentUrl = new URL(this.currentUrl, window.location.origin);
    const targetUrl = new URL(url, window.location.origin);
    return currentUrl.href === targetUrl.href ? "page" : undefined;
  }

  render() {
    return html` ${!this.url || this.getAriaCurrent(this.url) ? html`<span aria-current="${this.getAriaCurrent(this.url)}">${this.label}</span>` : html`<a href="${this.url}">${this.label}</a>`} `;
  }
}

customElements.define("bw-breadcrumb-item", BwBreadcrumbItem);
