import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

class BwProcess extends LitElement {
  static properties = {
    title: { type: String },
    overline: { type: String },
    reverse: { type: Boolean },
  };

  constructor() {
    super();
    this.reverse = true;
    this.title = "Title Goes Here";
    this.overline = "Overline Text";
  }

  static styles = css`
    :host {
      -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
      -moz-box-sizing: border-box; /* Firefox, other Gecko */
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: clamp(40px, 3dvw, 64px) 12px;
      background-color: rgba(246, 246, 246, 1);
    }
  `;

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-process-${BwProcess.instanceCounter++}`;
  }

  render() {
    return html`
      <bw-grid style="--max-width: 1528px; --col-width: 280px; margin-bottom: clamp(40px, 3dvw, 64px);"><bw-overline-text overline="${this.overline}" title="${this.title}" reverse="${this.reverse}"></bw-overline-text></bw-grid>
      <bw-grid style="--max-width: 1528px; --col-width: 280px; --grid-gap: var(--resGap); --grid-gap-md: var(--resGap); --grid-gap-sm: var(--resGap); --grid-gap-xs: var(--resGap);">
        <slot></slot>
      </bw-grid>
    `;
  }
}

customElements.define("bw-process", BwProcess);
