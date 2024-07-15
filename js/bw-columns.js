import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== Columns ===//
class Columns extends LitElement {
  static properties = {
    columns: { type: Number },
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

    :host {
      --gap: 24px;
    }

    .content-columns {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--gap);
  
      .content-columns__col {
        display: flex;
        flex-direction: column;
      }

    }


    /* Extra small devices (xs): 0px and up */
    @media screen and (max-width: 575.98px) {
      /* Your styles here */
    }

    /* Small devices (sm): 576px and up */
    @media screen and (min-width: 576px) {
      .content-columns {
        grid-template-columns: repeat(2, 1fr);
        
      }
    }

    /* Medium devices (md): 768px and up */
    @media screen and (min-width: 768px) {
    }

    /* Large devices (lg): 992px and up */
    @media screen and (min-width: 992px) {
      .content-columns {
        grid-template-columns: repeat(var(--columns, 4), 1fr);
      }
    }

    /* Extra large devices (xl): 1200px and up */
    @media screen and (min-width: 1200px) {
      /* Your styles here */
    }
  `;

  constructor() {
    super();
    this.columns = 3;
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-columns-${Columns.instanceCounter++}`;
  }

  render() {
    return html`
      <div class="content-columns" style="--columns: ${this.columns};">
        ${Array.from({ length: this.columns }, (_i, i) =>
      html`<div class="content-columns__col"><slot name="col-${i + 1}"></slot></div>`
    )}
      </div>
    `;
  }
}

customElements.define("bw-columns", Columns);