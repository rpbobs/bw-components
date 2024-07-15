import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
// import('./bw-button.js');

//=== BwModal ===//
class BwModal extends LitElement {
  static properties = {
    modalTitle: { type: String, attribute: "modal-title" },
    modalName: { type: String, attribute: "modal-name" },
    popoverinteraction: { type: String },
    hideButtons: { type: Boolean, attribute: "hide-buttons" },
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

    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
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
      border: none;
      padding: 0;
      border-radius: 8px;
    }

    :host::backdrop {
      background: rgba(0, 0, 0, 0.75);
    }

    :host:popover-open {
      animation: fadeOut 0.3s ease-in-out;
    }

    button {
      cursor: pointer;
    }

    .bwModal {
      margin: auto;
      width: 100%;
      max-width: 640px;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      background: var(--Neutral-Lightest, #fff);
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
      transition: all 150ms ease-in-out;
      border: none;
      padding: 24px 0;
      gap: 16px;

      /* &:popover-open {
        opacity: 100%;
      }

      &::backdrop {
        background: rgba(0, 0, 0, 0.75);
      } */
    }

    .bwModal__titleClose {
      width: 100%;
      display: flex;
      gap: 16px;
      align-items: center;
      justify-content: center;
      padding: 0 8px 0 24px;

      span {
        font-family: Lora;
        width: 100%;
        font-size: 24px;
        line-height: 28px;
        text-transform: capitalize;
      }

      .closeButton {
        display: flex;
        background-color: transparent;
        border: none;
        padding: 16px;
        line-height: 1;
      }
    }

    .bwModal__content {
      padding: 0 24px;
      height: 100%;
    }

    .titleExplainer {
      font-size: 14px;
      line-height: 20px;
      display: flex;
      flex-direction: column;

      span {
        font-size: 17px;
        font-weight: 500;
        line-height: 24px; /* 141.176% */
        text-transform: capitalize;
      }
    }

    .bwModal__buttonContainer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 24px 24px 0 24px;
      gap: 8px;

      button,
      ::slotted(button) {
        border-radius: var(--radius-full, 360px) !important;
        background: var(--Fill-fill-primary, #000);
        padding: 16px 32px;
        border: none;
        color: white;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        min-width: 112px;
      }
    }

    /* Extra small devices (xs): 0px and up */
    @media screen and (max-width: 575.98px) {
      .bwModal {
        width: 100%;
        height: 100vh;
        max-width: none;
        border-radius: unset;
      }
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
  `;

  constructor() {
    super();
    this.modalTitle = "Hello world!";
    this.modalName = "myModal";
    this.hideButtons = false;
    // this.array = ["one", "two", "three"];
    // this.number = 123;
    // this.object = { one: "one", two: "two", three: "three" };
    // this.function = () => {
    //   console.log("Hello world!");
    // };
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    // this.id = `bw-modal-${BwModal.instanceCounter++}`;
    this.id = this.modalName;
    this.loadComponents();
  }

  async loadComponents() {
    if (!this.hideButtons) {
      await import('./bw-button.js');
    }
  }

  render() {
    const hideStyles = "display: none; visilibility: hidden;";

    return html`
      <div class="bwModal">
        <div class="bwModal__titleClose">
          <span>${this.modalTitle}</span>
          <button class="closeButton" popovertarget="${this.modalName}" @click="${this.hidePopover}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9994 13.4123L7.41176 18L6 16.5882L10.5877 12.0006L6 7.4129L7.41176 6.00113L11.9994 10.5888L16.5882 6L18 7.41176L13.4112 12.0006L18 16.5894L16.5882 18.0011L11.9994 13.4123Z" fill="black" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="bwModal__content">
          <slot>
        </div>

        <!-- Button Container -->
        <div class="bwModal__buttonContainer" style="${this.hideButtons ? hideStyles : ""}">
          <slot name="button-container"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define("bw-modal", BwModal);
