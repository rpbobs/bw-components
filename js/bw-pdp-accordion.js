import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== BwPDPAccordion ===//
class BwPDPAccordion extends LitElement {
  static properties = {
    string: { type: String },
    boolean: { type: Boolean },
    array: { type: Array },
    number: { type: Number },
    object: { type: Object },
    function: { type: Function },
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
      /* animation: fadeIn 0.3s ease-in-out; */
      /* display: block; */

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

    ::slotted(bw-pdp-accordion-item:last-of-type) {
      border-bottom: 1px solid transparent;
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
    this.id = `bw-pdp-accordion-${BwPDPAccordion.instanceCounter++}`;
  }

  render() {
    return html` <slot></slot> `;
  }
}

customElements.define("bw-pdp-accordion", BwPDPAccordion);
