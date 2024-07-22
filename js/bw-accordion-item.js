import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwAccordionItem extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    index: { type: Number },
    header: { type: String },
    noPadding: { type: Boolean, reflect: true },
  };

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: block;
      width: 100%;
      font-family: var(--bw-font-family, "Inter", sans-serif);
    }

    button {
      display: flex;
      width: 100%;
      text-align: left;
      padding: 16px;
      background: none;
      border: none;
      outline: none;
      font-size: 16px;
      font-weight: bold;
      text-transform: capitalize;
      cursor: pointer;
      align-items: center;

      &:hover {
        background-color: #f6f6f6;
      }

      &::after {
        content: ""; /* Clearing default content */
        display: inline-block; /* Gives the pseudo-element a box model */
        width: 12px; /* Match the width of your SVG */
        height: 8px; /* Match the height of your SVG */
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ljk5OTk5IDMuODY4NjNMOC40MzQzIDAuNDM0MzExTDkuNTY1NjcgMS41NjU2OEw0Ljk5OTk5IDYuMTMxMzdMMC40MzQzMDMgMS41NjU2OEwxLjU2NTY3IDAuNDM0MzExTDQuOTk5OTkgMy44Njg2M1oiIGZpbGw9ImJsYWNrIi8+PC9zdmc+");
        background-size: cover; /* Ensures the SVG covers the pseudo-element */
        margin-left: auto;
        transition: transform 0.3s ease; /* Smooth transition for rotation */
      }

      &:focus {
        outline: none;
        background-color: #fafafa;
      }
    }

    button[aria-expanded="true"] {
      background-color: #f6f6f6;

      &::after {
        transform: rotate(-180deg);
      }
    }

    .collapse {
      overflow: hidden;
      transition: height 0.3s ease, padding 0.3s ease;
    }

    .xy-padding {
      padding: 16px;
    }

    .y-padding {
      padding: 16px 0;
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.noPadding = false;
    this.header = `accordion item #${BwAccordionItem.titleCounter++}`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
      this.open = newValue !== null;
      this.requestUpdate();
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  firstUpdated() {
    this.updateHeight();
  }

  updated(changedProperties) {
    if (changedProperties.has("open")) {
      this.updateHeight();
    }
  }

  static instanceCounter = 0;
  static titleCounter = 1;
  static sectCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-accordion-item-${BwAccordionItem.instanceCounter++}`;
    this.sect = `bw-sect-${BwAccordionItem.sectCounter++}`;
  }

  updateHeight() {
    const content = this.shadowRoot.querySelector(".collapse");
    if (!content) return;

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      if (this.open) {
        content.style.height = `${content.scrollHeight}px`;
      } else {
        content.style.height = "0";
      }
    });
  }

  toggle() {
    // const accItem = this.shadowRoot.querySelector(".bw-accordion-item");
    // accItem.classList.toggle("open");

    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent("toggle-item", {
        detail: { index: this.index },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const padding = this.noPadding ? "y-padding" : "xy-padding";

    return html`
      <div class="bw-accordion-item" id="${this.id}">
        <button ${this.open ? "" : "collapsed"} type="button" @click=${this.toggle} class="bw-accordion-item__button ${padding}" aria-expanded="${this.open}" aria-controls="${this.sect}">${this.header}</button>
        <div class="collapse" id="${this.sect}">
          <div id=${this.sect} class="${padding}" role="region" aria-labelledby="${this.id}">
            <slot> <strong>This is the ${this.header}'s body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. </slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("bw-accordion-item", BwAccordionItem);
