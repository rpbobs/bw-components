import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-joblist.js";

//=== BwJobLists ===//
class BwJobLists extends LitElement {
  static properties = {
    sectionTitle: { type: String, attribute: "section-title" },
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

    .bw-joblist-title {
      padding-bottom: 16px;
      border-bottom: 1px solid black;
      font-size: 24px;
      font-weight: 500;
      line-height: 28px;
      text-transform: capitalize;
      width: 100%;
      margin-bottom: 40px;
    }

    ::slotted(bw-joblist) {
      border-bottom: 1px solid #d9d9d9;
    }

    ::slotted(bw-joblist:last-of-type) {
      border-bottom: none;
    }

    :host {
      animation: fadeIn 0.3s ease-in-out;
      display: flex;
      flex-direction: column;

      /* Extra small devices (xs): 0px and up */
      @media screen and (max-width: 575.98px) {
        /* Your styles here */
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
    }
  `;

  constructor() {
    super();
    this.string = "Hello world!";
    this.boolean = true;
    this.array = ["one", "two", "three"];
    this.number = 123;
    this.object = { one: "one", two: "two", three: "three" };
    this.function = () => {
      console.log("Hello world!");
    };
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-joblists-${BwJobLists.instanceCounter++}`;
  }

  render() {
    return html`
      <span class="bw-joblist-title"> ${this.sectionTitle} </span>
      <div class="job-lists">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("bw-joblists", BwJobLists);
