import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
// import "https://cdn.jsdelivr.net/npm/instantsearch.js@4";
// import "https://cdn.jsdelivr.net/npm/@meilisearch/instant-meilisearch/dist/instant-meilisearch.umd.min.js";

//=== BwMeilisearch ===//
class BwMeilisearch extends LitElement {
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
      container: inline-size;
      /* animation: fadeIn 0.3s ease-in-out; */
      /* display: block; */
    }

    #hits {
      max-height: 303px;
    }

    #searchbox-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      position: relative;
      top: 0;
      display: flex;
      flex-direction: row;
      gap: 16px;
      align-items: center;
      z-index: 1;
      max-width: 640px;
      margin: 0 auto;

      .svg-icon {
        display: none;
        border: none;
        cursor: pointer;
        background-color: transparent;
        position: absolute;
        right: 16px;
        padding: 0;
      }

      .svg-icon--open {
        display: block;
      }
    }

    .searchbox {
      background-color: white;
    }

    .search-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
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
      user-select: none; /* Prevent text selection */
      -webkit-user-select: none; /* For Safari */
      -ms-user-select: none; /* For Internet Explorer/Edge */

      .catalog-hit-image {
        aspect-ratio: 1;
        max-height: 96px;
        object-fit: contain;
        margin-bottom: 16px;
        user-select: none; /* Prevent text selection */
        -webkit-user-select: none; /* For Safari */
        -ms-user-select: none; /* For Internet Explorer/Edge */
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

    .ais-InfiniteHits {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;

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
        margin: 0;
        gap: 16px;
        list-style: none;
        border-radius: 8px;
        display: grid;
        grid-template-columns: repeat(8, minmax(300px, 1fr));
        width: 100%;

        .ais-InfiniteHits-item {
          border-radius: 8px;
          gap: 16px;
          display: flex;
          flex-direction: column; /* or 'row' depending on your design */
          align-items: stretch;
          padding-top: 16px;
          user-select: none; /* Prevent text selection */
          -webkit-user-select: none; /* For Safari */
          -ms-user-select: none; /* For Internet Explorer/Edge */

          &:hover {
          }
        }
      }
    }

    .hit-indicator {
      margin: 0 auto;
      border-radius: 6px;
      height: 3px;
      width: 10%;
      background-color: transparent;
      transition: all 250ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
    }

    .ais-InfiniteHits-item:hover {
      .hit-indicator {
        background-color: black;
        width: 50%;
      }
    }

    .switch-group {
      display: flex;
      flex-direction: row;
      gap: 8px;
      align-items: center;
    }

    .switch-container {
      display: none;
      flex-direction: row;
      align-items: center;
      gap: 24px;
      margin: 16px auto;
      width: 100%;
      max-width: 800px;
    }

    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .ais-SearchBox-submit {
      border-color: black;
      background: black;
      width: 58px;
      height: 58px;
    }

    .ais-SearchBox-input {
      border: 3px solid black;
      border-radius: 28px;
      padding: 16px;
    }

    .ais-SearchBox-reset {
      right: 28px;
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

    .ais-SearchBox-reset {
      right: 52px;
      width: auto;
      height: auto;
      top: 47%;
    }

    button.ais-InfiniteHits-loadMore {
      display: none;
    }

    /* Modal styles */
    .modal {
      /*   height: 0; */
      max-width: 1280px;
      margin: 0 auto;
      padding: 16px;
      /*   container-type: inline-size; */
      background-color: #fff;
      z-index: 1000;
      width: 100%;
      opacity: 0%;
      /*   transform: scaleY(0.2) translateY(-33vh); */
      overflow: hidden;
      pointer-events: none;
      transition: all 200ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
      transform-origin: left top;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -120%);
      border-radius: 16px;
      background: #fff;
      box-shadow: 0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
      opacity: 0;
      scale: 0;

      .modal-content {
        overflow-x: scroll;
        overflow-y: hidden;
        transition: all 200ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
        /*     height: 0; */
      }
    }

    .modal--open {
      margin-bottom: 40px;
      opacity: 100%;
      pointer-events: all;
      height: 350px;
      opacity: 100%;
      scale: 1;

      .modal-content {
        /*     height: 100%; */
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

    /* === Scrollbar === */
    /* width */
    .modal-content::-webkit-scrollbar {
      height: 8px;
    }

    /* Track */
    .modal-content::-webkit-scrollbar-track {
      background: #fafafa;
      margin: 4px;
    }

    /* Handle */
    .modal-content::-webkit-scrollbar-thumb {
      background: #e0e0e0;
      border-radius: 8px;
      padding: 4px 0;
    }

    /* Handle on hover */
    .modal-content::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    @container (width < 480px) {
      .modal {
        /*     transform: translate(-50%, -108%); */
      }

      .modal-content {
        /*     overflow-y: scroll;
    max-height: 640px; */
      }

      #hits {
        /*     overflow-y: scroll; */
        /*     max-height: 640px; */
      }
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
    this.string = "Hello world!";
    this.boolean = false;
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
    this.id = `bw-meilisearch-${BwMeilisearch.instanceCounter++}`;
  }

  firstUpdated() {
    this.initializeSearch();
  }

  initializeSearch() {
    const searchClient = instantMeiliSearch("https://meili.bobswatches.com", "9d923e450682ab14c3dd7c5aeb2bfa4f7e775fcc844a646dcdbb88fc9d83f169", {
      meiliSearchParams: {
        attributesToHighlight: ["sku", "brand", "model", "model_number"],
        highlightPreTag: "<b>",
        highlightPostTag: "</b>",
        attributesToSearchOn: ["*"],
      },
    });

    const search = instantsearch({
      indexName: "catalog",
      searchClient,
    });

    function formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(price);
    }

    search.addWidgets([
      searchBox({
        container: this.shadowRoot.querySelector("#searchbox"),
        placeholder: "Search for ref #, model, brand, etc",
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
      configure({
        hitsPerPage: 8,
        filters: 'availability = "in stock" AND NOT brand = "klarnapartialpay"',
      }),
      infiniteHits({
        container: this.shadowRoot.querySelector("#hits"),
        escapeHTML: false,
        templates: {
          item: function (hit) {
            const highlightSKU = hit._highlightResult?.sku?.value ?? hit.sku;
            const highlightBrand = hit._highlightResult?.brand?.value ?? hit.brand;
            const highlightModel = hit._highlightResult?.model?.value ?? hit.model;
            const highlightModelNum = hit._highlightResult?.model_number?.value ?? hit.model_number;

            return `
              <a class="catalog-hit-container" href='${hit.url}' target="_blank">
                <img src='${hit.thumbnail_url}' class="catalog-hit-image"/>
                <div class="catalog-hit-container__details">
                  <span class="catalog-hit-brand">${hit.brand}</span>
                  <span class="catalog-hit-name">${hit.model}</span>
                  <span class="catalog-hit-tri-line">${highlightModelNum}</span>
                  <span class="catalog-hit-tri-line">${hit.tri_line_2}</span>
                  <span class="catalog-hit-tri-line">${hit.tri_line_3}</span>
                  <span class="catalog-hit-cat-num">${highlightSKU}</span>
                  <span class="catalog-hit-price">${formatPrice(hit.price)}</span>
                </div>
              </a>
              <div class="hit-indicator"></div>
            `;
          },
        },
      }),
    ]);

    search.start();

    // Event listeners setup
    this.setupEventListeners(search);
  }

  setupEventListeners(search) {
    const modal = this.shadowRoot.querySelector("#search-modal");
    const closeButton = this.shadowRoot.querySelector("button.svg-icon");
    const resetButton = this.shadowRoot.querySelector("button.resetButton");
    const searchInput = this.shadowRoot.querySelector("input.ais-SearchBox-input");

    if (searchInput) {
      searchInput.addEventListener("click", () => {
        modal.classList.add("modal--open");
        closeButton.classList.add("svg-icon--open");
      });
    }

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        modal.classList.remove("modal--open");
        closeButton.classList.remove("svg-icon--open");
        if (resetButton) {
          resetButton.click();
        }
        if (searchInput) {
          searchInput.blur();
        }
      });
    }

    this.shadowRoot.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (searchInput) {
          const query = searchInput.value;
          window.location.href = `/shop?query=${encodeURIComponent(query)}`;
        }
      }
    });

    this.shadowRoot.querySelector("#stockToggle").addEventListener("change", () => {
      this.updateFilters(search);
    });
    this.shadowRoot.querySelector("#boxToggle").addEventListener("change", () => {
      this.updateFilters(search);
    });
  }

  updateFilters(search) {
    const includeOutOfStock = this.shadowRoot.querySelector("#stockToggle").checked;
    const onlyBandP = this.shadowRoot.querySelector("#boxToggle").checked;

    let filterParts = [];

    if (!includeOutOfStock) {
      filterParts.push('availability = "in stock"');
    }

    if (onlyBandP) {
      filterParts.push('box_and_papers = "Box and Papers"');
    }

    const filter = filterParts.join(" AND ");

    search.helper.setQueryParameter("filters", filter).search();
  }

  render() {
    return html`
      <div id="search-modal" class="modal">
        <div class="modal-content">
          <div class="switch-container">
            <div class="switch-group">
              <label class="switch">
                <input type="checkbox" id="stockToggle" name="stockToggle" />
                <span class="slider round"></span>
              </label>
              Include Out of Stock
            </div>
            <div class="switch-group">
              <label class="switch">
                <input type="checkbox" id="boxToggle" name="boxToggle" />
                <span class="slider round"></span>
              </label>
              Box and Papers Only
            </div>
          </div>
          <div id="hits"></div>
        </div>
      </div>
      <div id="searchbox-wrapper">
        <div id="searchbox"></div>
        <button class="svg-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.4 16.308L12 12.708L15.6 16.308L16.308 15.6L12.708 12L16.308 8.4L15.6 7.692L12 11.292L8.4 7.692L7.692 8.4L11.292 12L7.692 15.6L8.4 16.308ZM12.003 21C10.759 21 9.589 20.764 8.493 20.292C7.39767 19.8193 6.44467 19.178 5.634 18.368C4.82333 17.558 4.18167 16.606 3.709 15.512C3.23633 14.418 3 13.2483 3 12.003C3 10.7577 3.23633 9.58767 3.709 8.493C4.181 7.39767 4.82133 6.44467 5.63 5.634C6.43867 4.82333 7.391 4.18167 8.487 3.709C9.583 3.23633 10.753 3 11.997 3C13.241 3 14.411 3.23633 15.507 3.709C16.6023 4.181 17.5553 4.82167 18.366 5.631C19.1767 6.44033 19.8183 7.39267 20.291 8.488C20.7637 9.58333 21 10.753 21 11.997C21 13.241 20.764 14.411 20.292 15.507C19.82 16.603 19.1787 17.556 18.368 18.366C17.5573 19.176 16.6053 19.8177 15.512 20.291C14.4187 20.7643 13.249 21.0007 12.003 21Z" fill="#000000" />
          </svg>
        </button>
      </div>
    `;
  }
}

customElements.define("bw-meilisearch", BwMeilisearch);
