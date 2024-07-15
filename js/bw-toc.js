import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== BwToc ===//
class BwToc extends LitElement {
  static properties = {
    headers: { type: Array },
    title: { type: String },
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
      animation: fadeIn 0.3s ease-in-out;
    }

    .content-toc-wrapper {
      width: 100%;
      height: 100%;

      .content-toc {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        background: #fff;
        z-index: 100;
        top: 150px;
        height: auto;
        position: sticky;
        width: 100%;
        /* Elevation/3 */
        padding: 8px 0;
        box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.3);

        .content-toc-title {
          font-size: var(--h5);
          font-weight: 600;
          padding: 16px;
        }

        .content-toc__jumplink {
          text-wrap: pretty;
          padding: 10px 16px;
          text-decoration: none;
          font-weight: 400;
          /* border-bottom: 1px solid #e0e0e0; */
          color: rgba(0, 0, 0, 0.7);
          line-height: 24px;

          &:hover {
            background-color: rgba(0, 0, 0, 0.04);
            color: black;
          }

          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }

    @media (max-width: 959px) {
      .content-toc-wrapper {
        .content-toc {
          box-shadow: none;
          border: 1px solid #e0e0e0;
        }
      }
    }
  `;

  constructor() {
    super();
    this.title = "Table of Contents";
    this.headers = [];
    this.observer = null;
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-toc-${BwToc.instanceCounter++}`;
    this.updateHeaders();
  }

  updateHeaders() {
    // console.log('Updating headers...');
    const headers = document.querySelectorAll(".main-content h2");
    // console.log(`Found ${headers.length} headers`);
    this.headers = Array.from(headers).map((header, index) => {
      const id = `heading-${index}`;
      header.id = id;
      // console.log(`Processing header: ${header.textContent}`);
      return { id, text: header.textContent };
    });
    this.requestUpdate(); // This is crucial to update the view with the new headers
  }

  render() {
    return html`
      <div class="content-toc-wrapper">
        <nav class="content-toc">
          <span class="content-toc-title">${this.title}</span>
          ${this.headers.map((header) => html` <a href="#${header.id}" class="content-toc__jumplink">${header.text}</a> `)}
        </nav>
      </div>
    `;
  }
}

customElements.define("bw-toc", BwToc);
