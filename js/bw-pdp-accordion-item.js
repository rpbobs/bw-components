import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwPDPAccordionItem extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    index: { type: Number },
    header: { type: String },
    noPadding: { type: Boolean, reflect: true },
    review: { type: Boolean },
  };

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      container: bw-pdp-accordion-item / inline-size;
      display: block;
      width: 100%;
      font-family: var(--bw-font-family, "Inter", sans-serif);
      border-bottom: 1px solid #d9d9d9;
      --bw-font-head: "utopia std";
      color: rgba(0, 0, 0, 0.72);
    }

    button {
      display: flex;
      width: 100%;
      text-align: left;
      padding: 16px;
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      align-items: center;
      gap: 16px;

      h2 {
        flex: 1;
        font-size: 24px;
        color: black;
        line-height: 1;
        font-weight: 400;
        font-family: var(--bw-font-head), serif;
        margin: 0;
      }

      &:hover {
        /* background-color: #f6f6f6; */
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
        /* background-color: #fafafa; */
      }
    }

    /* .btn-review {
      gap: 16px;
    } */

    button[aria-expanded="true"] {
      /* background-color: #f6f6f6; */

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
      padding: 24px 0;
    }

    .bw-pdp-accordion-item__stars {
      display: flex;
      flex-direction: row;
      gap: 12px;
      place-items: center;
    }

    @container (width <= 575.98px) {
      .bw-pdp-accordion-item__stars {
        gap: 4px;
      }
    }

    /* Extra small devices (xs): 0px and up */
    @media screen and (max-width: 575.98px) {
      /* .bw-pdp-accordion-item__stars {
        gap: 4px;
      } */
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
      button h2 {
        font-size: 36px;
      }

      .y-padding {
        padding: 32px 0;
      }
    }

    /* Extra large devices (xl): 1200px and up */
    @media screen and (min-width: 1200px) {
      /* Your styles here */
    }
  `;

  constructor() {
    super();
    this.open = false;
    this.noPadding = false;
    this.header = `accordion item #${BwPDPAccordionItem.titleCounter++}`;
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
    this.id = `bw-pdp-accordion-item-${BwPDPAccordionItem.instanceCounter++}`;
    this.sect = `bw-sect-${BwPDPAccordionItem.sectCounter++}`;
  }

  updateHeight() {
    setTimeout(() => {
      const content = this.shadowRoot.querySelector(".collapse");
      if (this.open) {
        content.style.height = `${content.scrollHeight}px`;
      } else {
        content.style.height = "0";
      }
    }, 100);
  }

  toggle() {
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
      <div class="${this.open ? "bw-pdp-accordion-item--open" : "bw-pdp-accordion-item"}" id="${this.id}">
        <button type="button" @click=${this.toggle} class="bw-pdp-accordion-item__button ${padding} ${this.review ? "btn-review" : null}" aria-expanded="${this.open}" aria-controls="${this.sect}">
          <h2>${this.header}</h2>
          ${this.review
            ? html`<div class="bw-pdp-accordion-item__stars">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.52447 1.46353C9.67415 1.00287 10.3259 1.00287 10.4755 1.46353L12.1329 6.56434C12.1998 6.77035 12.3918 6.90983 12.6084 6.90983H17.9717C18.4561 6.90983 18.6575 7.52964 18.2656 7.81434L13.9266 10.9668C13.7514 11.0941 13.678 11.3198 13.745 11.5258L15.4023 16.6266C15.552 17.0873 15.0248 17.4704 14.6329 17.1857L10.2939 14.0332C10.1186 13.9059 9.88135 13.9059 9.70611 14.0332L5.3671 17.1857C4.97524 17.4704 4.448 17.0873 4.59768 16.6266L6.25503 11.5258C6.32197 11.3198 6.24864 11.0941 6.07339 10.9668L1.73438 7.81434C1.34253 7.52964 1.54392 6.90983 2.02828 6.90983H7.39159C7.6082 6.90983 7.80018 6.77035 7.86712 6.56434L9.52447 1.46353Z" fill="black" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.52447 1.46353C9.67415 1.00287 10.3259 1.00287 10.4755 1.46353L12.1329 6.56434C12.1998 6.77035 12.3918 6.90983 12.6084 6.90983H17.9717C18.4561 6.90983 18.6575 7.52964 18.2656 7.81434L13.9266 10.9668C13.7514 11.0941 13.678 11.3198 13.745 11.5258L15.4023 16.6266C15.552 17.0873 15.0248 17.4704 14.6329 17.1857L10.2939 14.0332C10.1186 13.9059 9.88135 13.9059 9.70611 14.0332L5.3671 17.1857C4.97524 17.4704 4.448 17.0873 4.59768 16.6266L6.25503 11.5258C6.32197 11.3198 6.24864 11.0941 6.07339 10.9668L1.73438 7.81434C1.34253 7.52964 1.54392 6.90983 2.02828 6.90983H7.39159C7.6082 6.90983 7.80018 6.77035 7.86712 6.56434L9.52447 1.46353Z" fill="black" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.52447 1.46353C9.67415 1.00287 10.3259 1.00287 10.4755 1.46353L12.1329 6.56434C12.1998 6.77035 12.3918 6.90983 12.6084 6.90983H17.9717C18.4561 6.90983 18.6575 7.52964 18.2656 7.81434L13.9266 10.9668C13.7514 11.0941 13.678 11.3198 13.745 11.5258L15.4023 16.6266C15.552 17.0873 15.0248 17.4704 14.6329 17.1857L10.2939 14.0332C10.1186 13.9059 9.88135 13.9059 9.70611 14.0332L5.3671 17.1857C4.97524 17.4704 4.448 17.0873 4.59768 16.6266L6.25503 11.5258C6.32197 11.3198 6.24864 11.0941 6.07339 10.9668L1.73438 7.81434C1.34253 7.52964 1.54392 6.90983 2.02828 6.90983H7.39159C7.6082 6.90983 7.80018 6.77035 7.86712 6.56434L9.52447 1.46353Z" fill="black" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.52447 1.46353C9.67415 1.00287 10.3259 1.00287 10.4755 1.46353L12.1329 6.56434C12.1998 6.77035 12.3918 6.90983 12.6084 6.90983H17.9717C18.4561 6.90983 18.6575 7.52964 18.2656 7.81434L13.9266 10.9668C13.7514 11.0941 13.678 11.3198 13.745 11.5258L15.4023 16.6266C15.552 17.0873 15.0248 17.4704 14.6329 17.1857L10.2939 14.0332C10.1186 13.9059 9.88135 13.9059 9.70611 14.0332L5.3671 17.1857C4.97524 17.4704 4.448 17.0873 4.59768 16.6266L6.25503 11.5258C6.32197 11.3198 6.24864 11.0941 6.07339 10.9668L1.73438 7.81434C1.34253 7.52964 1.54392 6.90983 2.02828 6.90983H7.39159C7.6082 6.90983 7.80018 6.77035 7.86712 6.56434L9.52447 1.46353Z" fill="black" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.52447 1.46353C9.67415 1.00287 10.3259 1.00287 10.4755 1.46353L12.1329 6.56434C12.1998 6.77035 12.3918 6.90983 12.6084 6.90983H17.9717C18.4561 6.90983 18.6575 7.52964 18.2656 7.81434L13.9266 10.9668C13.7514 11.0941 13.678 11.3198 13.745 11.5258L15.4023 16.6266C15.552 17.0873 15.0248 17.4704 14.6329 17.1857L10.2939 14.0332C10.1186 13.9059 9.88135 13.9059 9.70611 14.0332L5.3671 17.1857C4.97524 17.4704 4.448 17.0873 4.59768 16.6266L6.25503 11.5258C6.32197 11.3198 6.24864 11.0941 6.07339 10.9668L1.73438 7.81434C1.34253 7.52964 1.54392 6.90983 2.02828 6.90983H7.39159C7.6082 6.90983 7.80018 6.77035 7.86712 6.56434L9.52447 1.46353Z" fill="black" />
                </svg>
              </div>`
            : null}
        </button>
        <div class="collapse" id="${this.sect}">
          <div id=${this.sect} class="${padding}" role="region" aria-labelledby="${this.id}" style="${padding ? "padding-top: 0;" : null}">
            <slot> <strong>This is the ${this.header}'s body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow. </slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("bw-pdp-accordion-item", BwPDPAccordionItem);
