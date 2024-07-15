import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class bwButton extends LitElement {
  static get styles() {
    return css`
      
      * {
        -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
        -moz-box-sizing: border-box; /* Firefox, other Gecko */
        box-sizing: border-box;
        border: none;
      }

      :host{
        width: var(--width, auto);
        max-width: var(--max-width, 100%);
        border: none;
        display: flex;
      }
      
      .bw-btn,
      .bw-btn-outline,
      .bw-btn-white,
      .bw-btn-50blk,
      .bw-btn-brand {
        width: var(--width, auto);
        max-width: var(--max-width, 100%);
        display: flex;
        font-family: Inter, proxima_nova_semibold, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: 600;
        flex-direction: row;
        align-items: center;
        padding: 16px 32px;
        background: black;
        color: white;
        border-radius: 360px;
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
      .bw-btn-white {
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

      .bw-btn-50blk {
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
      id: { type: String, attribute: "id" },
      label: { type: String },
      link: { type: String },
      kind: { type: String },
      variant: { type: String },
      styles: { type: String },
    };
  }

  constructor() {
    super();
    // Setting default values
    this.id = this.id || "defaultId";
    this.label = this.label || "Default Label";
    this.link = this.link || "#";
    this.kind = this.kind || "button";
    this.variant = this.variant || "default";
    this.styles = this.style || "";
  }

  computeClass(type) {
    switch (type) {
      case "outline":
        return "bw-btn-outline";
      case "white":
        return "bw-btn-white";
      case "brand":
        return "bw-btn-brand";
      case "50blk":
        return "bw-btn-50blk";
      default:
        return "bw-btn";
    }
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-button-${bwButton.instanceCounter++}`;
  }

  render() {
    if (this.kind === "link") {
      return html`<a href=${this.link} class=${this.computeClass(this.variant)} id="${this.id}" style="${this.styles}"><slot></a>`;
    } else {
      return html`<button class=${this.computeClass(this.variant)} id="${this.id}" style="${this.styles}"><slot></button>`;
    }
  }
}

customElements.define("bw-button", bwButton);
