import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

//=== BwMultiSearch ===//
class BwMultiSearch extends LitElement {
  static properties = {
    search: { type: String },
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
      container: inline-size;
      /* animation: fadeIn 0.3s ease-in-out; */
      /* display: block; */
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
      display: none;
    }

    #searchbox-wrapper {
      background-color: white;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      z-index: 1;
      max-width: 220px;
      border: 1px solid black;
      border-radius: 24px;
      padding: 0 4px;

      .svg-icon {
        display: flex;
        margin: auto;
        opacity: 0;
        padding: 0;
        border: none;
        cursor: pointer;
        background-color: transparent;
        position: relative;
        right: 0;
        pointer-events: none;
        transition: opacity 200ms ease;
      }

      .svg-icon--open {
        opacity: 100%;
        pointer-events: all;
      }
    }

    .searchbox {
      background-color: white;
    }

    .hit-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      text-decoration: none;
      align-items: center;
      text-align: center;
      color: black;
      padding: 0;

      .hit-image {
        aspect-ratio: 16/9;
        max-height: 320px;
        width: 100%;
        object-fit: cover;
      }

      .hit-container__details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: 16px;
        border-radius: 0 0 8px 8px;
        border-left: 1px solid #e0e0e0;
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        transition: all 200ms cubic-bezier(0.45, 0.05, 0.55, 0.95);

        .hit-excerpt {
          font-size: 14px;
          font-weight: 400;
          margin-top: 16px;
          color: rgba(0, 0, 0, 0.5);

          p {
            margin: 0;
          }
        }
      }

      .hit-container__details-2lines {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .hit-brand {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.5);
        }

        .hit-name {
          font-size: 18px;
          font-weight: 600;
          flex: 1;
          line-height: 1;
        }

        .hit-cat-num,
        .hit-tri-line {
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);

          b {
            color: rgba(0, 0, 0, 1);
          }
        }
      }
    }

    .catalog-hit-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: 4px;
      text-decoration: none;
      align-items: center;
      text-align: center;
      color: black;
      padding: 16px 0;

      .catalog-hit-image {
        aspect-ratio: 1;
        max-height: 200px;
        object-fit: contain;
        margin-bottom: 16px;
      }

      .catalog-hit-container__details {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .catalog-hit-brand {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.5);
        }

        .catalog-hit-name {
          font-size: 18px;
          font-weight: 600;
          flex: 1;
          line-height: 1;
        }

        .catalog-hit-cat-num,
        .catalog-hit-tri-line {
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.5);
          line-height: 1;

          b {
            color: rgba(0, 0, 0, 1);
          }
        }

        .catalog-hit-price {
          font-size: 16px;
          font-weight: 500;
          margin-top: 8px;
        }
      }
    }

    .ais-Hits {
      .ais-Hits-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      }
    }

    .ais-SearchBox-form {
      width: 75%;
    }

    .ais-Hits-list,
    .ais-Hits--empty {
      background-color: white;
      background-image: none;
    }

    .ais-Hits .ais-Hits-list .ais-Hits-item {
      box-shadow: none;
      border-bottom: 1px solid #e0e0e0;

      &:last-of-type {
        border-bottom: none;
      }
    }

    .ais-InfiniteHits {
      display: flex;
      flex-direction: column;

      button {
        max-width: 340px;
        margin: 24px auto;
        padding: 16px;
        color: white;
        background: black;
        border-radius: 8px;
        border: none;

        &:hover {
          cursor: pointer;
        }
      }

      .ais-InfiniteHits-list {
        padding: 0;
        gap: 16px;
        list-style: none;
        border-radius: 8px;
        background-color: white;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(296px, 1fr));

        .ais-InfiniteHits-item {
          border-radius: 8px;
          display: flex;
          flex-direction: column; /* or 'row' depending on your design */
          align-items: stretch;
          transition: all 200ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
          overflow: hidden;

          &:hover {
            box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
            transform: translateY(-8px);

            .hit-container__details {
              border-color: white;
            }
          }
        }
      }
    }

    .ais-Hits-list,
    .ais-Hits--empty {
      background-color: white;
      background-image: none;
    }

    .ais-Hits .ais-Hits-list .ais-Hits-item {
      box-shadow: none;
      border-bottom: 1px solid #e0e0e0;

      &:last-of-type {
        border-bottom: none;
      }
    }

    .ais-SearchBox-submit {
      border-color: black;
      background: black;
      width: 58px;
      height: 58px;
    }

    .ais-SearchBox-input {
      border: none;
      outline: none;
      border-radius: 24px;
      font-size: 14px;
      line-height: 1;
      overflow: scroll;

      &:focus {
        color: black;
        border: none;
      }

      &:focus-visible {
        border: none;
        appearance: none;
      }
    }

    .ais-SearchBox-reset {
      /*   right: 32px; */
      width: auto;
      height: auto;
      top: 47%;

      .resetText {
        text-align: right;
        font-size: 14px;
      }

      .ais-SearchBox-resetIcon {
        left: 0;
      }
    }

    .ais-Pagination-list {
      display: flex;
      flex-direction: row;
      list-style-type: none;
      gap: 12px;

      a {
        color: black;
        text-decoration: none;
        font-size: 20px;
        font-weight: medium;
      }
    }

    /* Initial search box styles */
    .initial-searchbox {
      margin: 16px;
      display: flex;
    }

    /* Modal styles */
    .modal {
      background-color: #fff;
      z-index: 1000;
      width: 100%;
      opacity: 0%;
      /*   transform: scaleY(0.2) translateY(-33vh); */
      overflow: hidden;
      pointer-events: none;
      transition: all 200ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
      transform-origin: top;

      .modal-content {
        /*     display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px; */
        max-width: 1582px;
        margin: auto;
        height: 0;
        overflow: hidden;
        visibility: visible;
        transition: all 200ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
      }
    }

    .modal--open {
      opacity: 100%;
      /*   transform: scaleY(1) translateY(0); */
      pointer-events: all;

      .modal-content {
        padding: 16px;
        height: 100%;
        overflow: hidden;
        visibility: visible;
      }
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    .topBar {
      width: 100%;
      align-items: center;
      justify-content: center;
      margin: auto;
      display: flex;
      flex-direction: row;
      gap: 16px;
      background-color: black;
      padding: 12px 8px;

      .topBar__content {
        width: 100%;
        max-width: 1552px;
        align-items: center;
        justify-content: center;
        margin: auto;
        display: flex;
        flex-direction: row;
        gap: 16px;

        #authenticatedTimepieces {
          font-size: 14px;
          width: 100%;
          display: flex;
          gap: 8px;
          color: white;
          align-items: center;
          justify-content: right;

          .ico-arrow path {
            stroke: white;
          }
        }

        a {
          font-size: 14px;
          width: 100%;
          text-decoration: none;
          color: white;
        }
      }
    }

    .bottomBar {
      width: 100%;
      padding: 16px 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

      .bottomBar__container {
        width: 100%;
        max-width: 1552px;
        align-items: center;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin: auto;

        .bobsLogo svg {
          max-height: 28px;
        }
      }
    }

    .bottomBar__container__left-content {
      display: inline-flex;
      gap: 12px;
      align-items: center;
      width: 100%;

      button {
        background-color: transparent;
        padding: 0;
        border: none;
        display: inline-flex;
        align-items: center;
        gap: 8px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    .bobsLogo {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .bottomBar__container__right-content {
      display: flex;
      flex-direction: row;
      gap: 12px;
      align-items: center;
      justify-content: right;
    }

    .icon {
      display: flex;
    }

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

    @container (min-width: 576px) {
      /* Your styles here */
    }

    @container (min-width: 1024px) {
      /* Your styles here */
    }
  `;

  constructor() {
    super();
    this.search = null;
  }

  firstUpdated() {
    this.initializeSearch();

    const modal = this.shadowRoot.getElementById("search-modal");
    const closeButton = this.shadowRoot.querySelector("button.svg-icon");
    const resetButton = this.shadowRoot.querySelector("button.resetButton");
    const searchInput = this.shadowRoot.querySelector("input.ais-SearchBox-input");

    searchInput.addEventListener("click", () => {
      modal.classList.add("modal--open");
      closeButton.classList.add("svg-icon--open");
    });

    closeButton.addEventListener("click", () => {
      modal.classList.remove("modal--open");
      closeButton.classList.remove("svg-icon--open");
      this.shadowRoot.querySelector(".ais-SearchBox-reset.resetButton").setAttribute("hidden", "");
      resetButton.click();
      searchInput.blur();
    });
  }

  initializeSearch() {
    const customSearchClient = {
      search: (requests) => {
        const multiSearchRequests = {
          queries: requests.map((request) => ({
            indexUid: request.indexName,
            q: request.params.query,
            limit: request.params.hitsPerPage,
            offset: request.params.page * request.params.hitsPerPage,
            filter: request.params.filters,
          })),
        };

        return fetch("https://meili.bobswatches.com/multi-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer a59e1ad7d68967720a50f6185c72e4d89265fa04befaf56d38bff949b0bfd6fd",
          },
          body: JSON.stringify(multiSearchRequests),
        })
          .then((response) => response.json())
          .then((data) => {
            return {
              results: data.results.map((result, index) => ({
                index: requests[index].indexName,
                hits: result.hits,
                nbHits: result.estimatedTotalHits,
                page: requests[index].params.page,
                nbPages: Math.ceil(result.estimatedTotalHits / requests[index].params.hitsPerPage),
                hitsPerPage: requests[index].params.hitsPerPage,
                query: requests[index].params.query,
              })),
            };
          });
      },
    };

    this.search = instantsearch({
      indexName: "posts",
      searchClient: customSearchClient,
    });

    this.search.addWidgets([
      instantsearch.widgets.searchBox({
        container: this.shadowRoot.querySelector("#searchbox"),
        placeholder: "Search",
        showSubmit: false,
        cssClasses: {
          reset: "resetButton",
        },
        templates: {
          reset({ cssClasses }, { html }) {
            return html`<span class="resetText">reset</span>`;
          },
        },
      }),
      instantsearch.widgets.configure({
        hitsPerPage: 5,
      }),
      instantsearch.widgets.infiniteHits({
        container: this.shadowRoot.querySelector("#posts-hits"),
        escapeHTML: false,
        templates: {
          item: function (hit) {
            return `
          <a class="hit-container" href='${hit.link}' target="_blank">
            <img src='${hit.image.replace("www.bobswatches.com", "img.bobswatches.com/_/s:0:200:1/q:40/sh:0.5/dpr:2/plain/")}' class="hit-image"/>
            <div class="hit-container__details">
              <div class="hit-container__details-2lines">
                <span class="hit-brand">${hit.date}</span>
                <span class="hit-name">${hit.title}</span>
              </div>
              <div class="hit-excerpt">${hit.excerpt.substring(0, 115) + "..."}</div>
            </div>
          </a>
        `;
          },
        },
      }),
      instantsearch.widgets.index({ indexName: "catalog" }).addWidgets([
        instantsearch.widgets.configure({
          hitsPerPage: 5,
          filters: 'availability = "in stock" AND NOT brand = "klarnapartialpay"',
        }),
        instantsearch.widgets.infiniteHits({
          container: this.shadowRoot.querySelector("#catalog-hits"),
          escapeHTML: false,
          templates: {
            item: (hit) => {
              const highlightSKU = hit._highlightResult?.sku?.value ?? hit.sku;
              const highlightBrand = hit._highlightResult?.brand?.value ?? hit.brand;
              const highlightModel = hit._highlightResult?.model?.value ?? hit.model;
              const highlightModelNum = hit._highlightResult?.model_number?.value ?? hit.model_number;

              return `
            <a class="catalog-hit-container" href='${hit.url}' target="_blank">
              <img src='${hit.image_url.replace("www.bobswatches.com", "img.bobswatches.com/_/exar:1/s:300:300:1/bg:ffffff/q:50/dpr:2/sh:0.5/plain/")}' class="catalog-hit-image"/>
              <div class="catalog-hit-container__details">
                <span class="catalog-hit-brand">${hit.brand}</span>
                <span class="catalog-hit-name">${hit.model}</span>
                <span class="catalog-hit-tri-line">${highlightModelNum}</span>
                <span class="catalog-hit-tri-line">${hit.tri_line_2}</span>
                <span class="catalog-hit-tri-line">${hit.tri_line_3}</span>
                <span class="catalog-hit-cat-num">${highlightSKU}</span>
                <span class="catalog-hit-price">${this.formatPrice(hit.price)}</span>
              </div>
            </a>
          `;
            },
          },
        }),
      ]),
    ]);

    this.search.start();
  }

  formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  }

  render() {
    return html`
      <div id="searchbox-wrapper">
        <div class="icon" style="margin-left:2px;">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9112 11.6449C9.89806 12.4927 8.59284 13.0031 7.16842 13.0031C3.94575 13.0031 1.33325 10.3907 1.33325 7.16822C1.33325 3.9457 3.94575 1.33333 7.16842 1.33333C10.3911 1.33333 13.0036 3.9457 13.0036 7.16822C13.0036 8.5929 12.493 9.89832 11.6447 10.9115L14.6666 13.9332L13.9331 14.6667L10.9112 11.6449ZM11.9662 7.16822C11.9662 9.81785 9.81817 11.9658 7.16842 11.9658C4.51867 11.9658 2.37062 9.81785 2.37062 7.16822C2.37062 4.51859 4.51867 2.37064 7.16842 2.37064C9.81817 2.37064 11.9662 4.51859 11.9662 7.16822Z" fill="black" />
          </svg>
        </div>
        <div id="searchbox"></div>
        <button class="svg-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.4 16.308L12 12.708L15.6 16.308L16.308 15.6L12.708 12L16.308 8.4L15.6 7.692L12 11.292L8.4 7.692L7.692 8.4L11.292 12L7.692 15.6L8.4 16.308ZM12.003 21C10.759 21 9.589 20.764 8.493 20.292C7.39767 19.8193 6.44467 19.178 5.634 18.368C4.82333 17.558 4.18167 16.606 3.709 15.512C3.23633 14.418 3 13.2483 3 12.003C3 10.7577 3.23633 9.58767 3.709 8.493C4.181 7.39767 4.82133 6.44467 5.63 5.634C6.43867 4.82333 7.391 4.18167 8.487 3.709C9.583 3.23633 10.753 3 11.997 3C13.241 3 14.411 3.23633 15.507 3.709C16.6023 4.181 17.5553 4.82167 18.366 5.631C19.1767 6.44033 19.8183 7.39267 20.291 8.488C20.7637 9.58333 21 10.753 21 11.997C21 13.241 20.764 14.411 20.292 15.507C19.82 16.603 19.1787 17.556 18.368 18.366C17.5573 19.176 16.6053 19.8177 15.512 20.291C14.4187 20.7643 13.249 21.0007 12.003 21Z" fill="#000000" />
          </svg>
        </button>
      </div>

      <div id="search-modal" class="modal">
        <div class="modal-content">
          <div>
            <h2>Watches</h2>
            <div id="catalog-hits"></div>
          </div>
          <div>
            <h2>Blog Posts</h2>
            <div id="posts-hits"></div>
          </div>
        </div>
      </div>
      <div id="hits-per-page"></div>
    `;
  }
}

customElements.define("bw-multisearch", BwMultiSearch);
