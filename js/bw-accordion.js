import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-accordion-item.js";

class BwAccordion extends LitElement {
  static properties = {
    noBorder: { type: Boolean, reflect: true },
    autoclose: { type: Boolean },
  };

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
    }

    .accordion {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .no-border {
      border: none;
      border-radius: 0;
    }

    .border {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }

    ::slotted(bw-accordion-item) {
      border-bottom: 1px solid #e0e0e0;
    }

    ::slotted(bw-accordion-item:last-of-type) {
      border-bottom: none;
    }

    ::slotted(bw-accordion-item[open]) {
      background-color: #fff;
    }
  `;

  constructor() {
    super();
    this.openIndex = -1;
    this.noBorder = false;
  }

  handleToggle(index) {
    this.openIndex = this.openIndex === index ? -1 : index;
    this.requestUpdate();
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-accordion-${BwAccordion.instanceCounter++}`;
  }

  render() {
    // const noBorder = this.noBorder ? "border: none; border-radius: 0;" : "border: 1px solid #e0e0e0; border-radius: 4px;";
    const noBorder = this.noBorder ? "no-border" : "border";

    return html`
      <div class="accordion ${noBorder}" id="${this.id}">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }

  handleSlotChange(e) {
    const slot = e.target;
    const assignedNodes = slot.assignedNodes({ flatten: true });

    assignedNodes.forEach((node, index) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BW-ACCORDION-ITEM") {
        node.index = index;
        node.addEventListener("toggle-item", (event) => this.handleToggle(event.detail.index));
        if (this.hasAttribute("autoclose")) {
          node.open = index === this.openIndex;
        }
      }
    });
  }

  updated() {
    if (this.hasAttribute("autoclose")) {
      const items = this.shadowRoot.querySelector("slot").assignedNodes({ flatten: true });
      items.forEach((node, index) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BW-ACCORDION-ITEM") {
          node.open = index === this.openIndex;
        }
      });
    }
  }
}

customElements.define("bw-accordion", BwAccordion);
