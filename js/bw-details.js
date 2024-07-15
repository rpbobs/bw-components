import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwDetails extends LitElement {
  static properties = {
    summary: { type: String },
    open: { type: Boolean, reflect: true },
    group: { type: String }, // New group property
  };

  static styles = css`
    :host {
      width: 100%;
      display: flex;
    }

    details {
      width: 100%;
      border-bottom: 1px solid #e0e0e0;
      overflow: hidden;

      summary {
        padding: 16px;
        cursor: pointer;
        outline: none;
        display: flex;
        align-items: center;
        user-select: none;

        &::before {
          content: ""; /* Clearing default content */
          display: inline-block; /* Gives the pseudo-element a box model */
          width: 10px; /* Match the width of your SVG */
          height: 7px; /* Match the height of your SVG */
          background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ljk5OTk5IDMuODY4NjNMOC40MzQzIDAuNDM0MzExTDkuNTY1NjcgMS41NjU2OEw0Ljk5OTk5IDYuMTMxMzdMMC40MzQzMDMgMS41NjU2OEwxLjU2NTY3IDAuNDM0MzExTDQuOTk5OTkgMy44Njg2M1oiIGZpbGw9ImJsYWNrIi8+PC9zdmc+");
          background-size: cover; /* Ensures the SVG covers the pseudo-element */
          margin-right: 12px;
          transition: transform 0.3s ease; /* Smooth transition for rotation */
        }

        &::marker,
        &::-webkit-details-marker {
          display: none;
        }
      }

      &[open] {
        summary {
          padding-bottom: 0;
          background-color: #fafafa;

          &::before {
            transform: rotate(-180deg);
          }
        }
      }

      .content {
        padding: 16px;
        transition: transform 0.3s ease;
      }
    }
  `;

  constructor() {
    super();
    this.summary = "Details";
    this.open = false;
    this.group = "";
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-details-${BwDetails.instanceCounter++}`;
  }

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();

    const currentlyOpen = this.open;
    const sameGroupDetails = this.group ? document.querySelectorAll(`bw-details[group="${this.group}"]`) : [this];
    sameGroupDetails.forEach((detail) => {
      if (detail !== this) {
        detail.open = false;
      }
    });

    this.open = !currentlyOpen;
    this.animateContent(this.open);
  }

  animateContent(open) {
    const contentDiv = this.shadowRoot.querySelector(".content");
    if (contentDiv) {
      const animation = contentDiv.animate(
        [
          { maxHeight: "0px", overflow: "hidden" },
          { maxHeight: "100vh", overflow: "hidden" }, // Adjust max height based on content
        ],
        {
          duration: 1000,
          easing: "ease",
          fill: "forwards", // Maintain the final state after the animation
          direction: open ? "normal" : "reverse",
        }
      );

      animation.onfinish = () => {
        // Update the attribute when the animation completes
        const detailsElement = this.shadowRoot.querySelector("details");
        if (detailsElement) {
          if (this.open) {
            detailsElement.setAttribute("open", "");
          } else {
            detailsElement.removeAttribute("open");
          }
        }
      };
    }
  }

  render() {
    return html`
      <details ?open="${this.open}">
        <summary @click="${this.handleClick}">${this.summary}</summary>
        <div class="content"><slot></slot></div>
      </details>
    `;
  }
}

customElements.define("bw-details", BwDetails);
