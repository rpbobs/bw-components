import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-image.js";

//=== BwRelatedArticle ===//
class BwRelatedArticle extends LitElement {
  static properties = {
    title: { type: String },
    text: { type: String },
    image: { type: String },
    link: { type: String },
    category: { type: String },
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
      display: flex;
      height: 100%;
      width: 100%;
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

    .bw-related-article {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: start;
      width: 100%;
      background-color: white;
      text-decoration: none;
      color: black;

      .bw-related-article__image-container {
        position: relative;
        width: 100%;

        .bw-related-article__image {
          width: 100%;
        }

        .bw-related-article__category {
          position: absolute;
          top: 16px;
          left: 16px;
          background-color: rgba(0, 0, 0, 0.75);
          font-weight: 600;
          color: white;
          font-size: 12px;
          line-height: 1.5;
          text-align: left;
          padding: 8px 12px;
          border-radius: 16px;
          z-index: 1;
        }
      }

      .bw-related-article__details {
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        align-items: center;
        padding: 24px 0;
        gap: 1rem;

        .bw-related-article__title {
          /* display: flex; */
          height: 100%;
          width: 100%;
          font-family: "utopia std", serif;
          font-weight: 400;
          font-size: 24px;
          line-height: 28px;
        }

        .bw-related-article__text {
          width: 100%;
          display: flex;
          flex: 1;
          font-size: 1rem;
          line-height: 1.5;
        }
      }
    }
  `;

  constructor() {
    super();
    this.title = "The Evolution of the Rolex Coronet: A Symbol of Timeless Luxury";
    this.image = "/rolex-blog/wp-content/uploads/2024/06/rolex-coronet.jpg";
    this.text = "The Rolex coronet, the crown-shaped logo representing the luxury watch brand, has not only been a symbol of qual";
    this.link = "https://www.bobswatches.com/rolex-blog/editorial/evolution-rolex-coronet.html";
    this.category = "Editorial";
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-related-article-${BwRelatedArticle.instanceCounter++}`;
  }

  render() {
    return html`
      <a class="bw-related-article" href="${this.link}" target="_blank">
        <div class="bw-related-article__image-container">
          <span class="bw-related-article__category">${this.category}</span>
          <bw-image src="${this.image}" lazy-loading="lazy" priority="low" alt="${this.title} Image" ratio="16/9" class="bw-related-article__image"></bw-image>
        </div>
        <div class="bw-related-article__details">
          <span class="bw-related-article__title">${this.title}</span>
          <span class="bw-related-article__text">${this.text.substring(0, 150)}...</span>
        </div>
      </a>
    `;
  }
}

customElements.define("bw-related-article", BwRelatedArticle);
