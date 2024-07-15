import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./bw-labeltext.js";
import "./bw-button.js";
import "./bw-image.js";

//=== Job Full===//
class BwJobFull extends LitElement {
  static properties = {
    name: { type: String },
    department: { type: String },
    location: { type: String },
    industry: { type: String },
    market: { type: String },
    channel: { type: String },
    report: { type: String },
    benefits: { type: String },
    link: { type: String },
    bannerImg: { type: String },
    jobDescription: { type: Array },
  };

  static styles = css`
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

    strong {
      font-weight: 600;
    }

    :host {
      width: var(--page-width);
      animation: fadeIn 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      line-height: 28px;
      color: var(--color-black);
      -webkit-font-smoothing: antialiased;
      max-width: 100%;
      gap: 1.5rem;
      margin: 0 auto;
    }

    .job-banner {
      display: flex;
      flex-direction: column;
      overflow: hidden;

      em {
        font-family: Inter, sans-serif;
        padding: 8px;
        background-color: black;
        color: white;
        width: 100%;
      }
    }

    .job-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      font-family: Inter, sans-serif;

      h1 {
        font-family: utopia std;
        font-weight: 500;
        font-size: 32px;
        line-height: 40px;
        margin: 0px;
      }
    }

    .job-container__left {
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      gap: 24px;

      & .u-list,
      & ::slotted(ul) {
        padding-left: 18px !important;
        margin-top: 0px;
        margin-bottom: 1rem;
      }
    }

    .job-detail-list-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 24px;

      .job-container-heading {
      }
    }

    .job-detail-list--inline {
      display: flex;
      flex-direction: column;
      gap: 24px;

      & .job-detail-list-container {
        padding: 0;
      }
    }

    .job-container__right {
      display: none;
      visibility: hidden;
    }

    bw-button {
      --width: 100%;
    }

    /* Extra small devices (xs): 0px and up */
    @media screen and (max-width: 575.98px) {
    }

    /* Small devices (sm): 576px and up */
    @media screen and (min-width: 576px) {
      .job-container h1 {
        font-size: 40px;
        line-height: 48px;
      }
    }

    /* Medium devices (md): 768px and up */
    @media screen and (min-width: 768px) {
    }

    /* Large devices (lg): 992px and up */
    @media screen and (min-width: 992px) {
      :host {
        padding: 3rem 0;
      }

      .job-banner {
        box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
      }

      .job-container h1 {
        font-size: 48px;
        line-height: 56px;
      }

      .job-container {
        display: grid;
        grid-template-columns: 1fr clamp(120px, 33%, 480px);
      }

      .job-container__left {
        padding: 40px;
      }

      .job-container__left,
      .job-container__right__content {
        background-color: white;
        height: auto;
        box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
      }

      .job-container__right {
        display: block;
        visibility: visible;
      }

      .job-detail-list--inline {
        display: none;
        visibility: hidden;
      }
    }

    /* Extra large devices (xl): 1200px and up */
    @media screen and (min-width: 1200px) {
      /* Your styles here */
    }
  `;

  constructor() {
    super();
    this.name = "Job Title";
    this.department = "Marketing";
    this.location = "Newport Beach, CA";
    this.industry = "Luxury Fashion Apparel & Accessories";
    this.market = "Global";
    this.channel = "Online Retail eCommerce";
    this.report = "to CMO";
    this.benefits = "Health + Dental + Vision + Life Insurance";
    this.link = "https://bobswatches.com";
    this.bannerImg = "/images/careers/job-banner.jpg";
    this.jobDescription = [];
  }

  static instanceCounter = 0;

  connectedCallback() {
    super.connectedCallback();
    this.id = `bw-job-full-${BwJobFull.instanceCounter++}`;
  }

  render() {
    return html`
      <div class="d-flex flex-column job-banner">
        <bw-image src="${this.bannerImg}" lazy-loading="eager" priority="high" alt="Product team brainstorming" ratio="21/7"></bw-image>
        <em style="padding: 8px; background-color: black; color: white;">“One of the coolest eCommerce companies on the planet.” - Forbes</em>
      </div>
      <div class="job-container">
        <div class="job-container__left">
          <div class="job-container-heading">
            <h1>${this.name}</h1>
            <span style="color: #757575;">${this.department} | ${this.location}</span>
          </div>
          <div class="job-detail-list--inline">
            <bw-button kind="link" variant="default" link="${this.link}">Apply For This Job</bw-button>
            <div class="job-detail-list-container">
              <bw-labeltext label="Location" text="${this.location}"></bw-labeltext>
              <bw-labeltext label="Industry" text="${this.industry}"></bw-labeltext>
              <bw-labeltext label="Market" text="${this.market}"></bw-labeltext>
              <bw-labeltext label="Channel" text="${this.channel}"></bw-labeltext>
              <bw-labeltext label="Report" text="${this.report}"></bw-labeltext>
              <bw-labeltext label="Benefits" text="${this.benefits}"></bw-labeltext>
            </div>
          </div>
          <slot name="summary">
            <p>As the ${this.name}, Culpa nostrud est ex fugiat commodo do qui enim eu ut culpa. Non ad exercitation culpa sint laboris proident consectetur minim excepteur exercitation sit sit. Duis eu ullamco in velit labore amet id eiusmod. Proident velit nulla ullamco amet voluptate. Consectetur voluptate labore aliquip est laboris ad et incididunt cupidatat. Amet nisi ea nulla est minim. Reprehenderit adipisicing laborum reprehenderit proident sit. Irure ullamco eu non dolore eiusmod cupidatat magna quis mollit labore. Sint mollit in nostrud est id velit ipsum excepteur. Sit aliqua laboris ad fugiat dolore. Mollit eu reprehenderit fugiat proident dolore.</p>
          </slot>
          <div>
            <strong>Job Description</strong>
            <ul class="u-list">
              ${this.jobDescription.map((item) => html`<li>${item.text}</li>`)}
            </ul>
          </div>
          <div>
            <strong>Qualifications</strong>
            <slot name="job-qualifications">
              <ul class="u-list">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
                <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
              </ul>
            </slot>
          </div>
          <div>
            <strong>What We Offer</strong>
            <slot name="job-benefits">
              <ul class="u-list">
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
                <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
                <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
              </ul>
            </slot>
          </div>
          <slot name="extras"> </slot>
        </div>
        <div class="job-container__right">
          <div class="job-container__right__content">
            <div style="padding: 24px; border-bottom: 1px solid #d9d9d9;">
              <bw-button kind="link" variant="default" link="${this.link}">Apply For This Job</bw-button>
            </div>
            <div class="job-detail-list-container">
              <bw-labeltext label="Location" text="${this.location}"></bw-labeltext>
              <bw-labeltext label="Industry" text="${this.industry}"></bw-labeltext>
              <bw-labeltext label="Market" text="${this.market}"></bw-labeltext>
              <bw-labeltext label="Channel" text="${this.channel}"></bw-labeltext>
              <bw-labeltext label="Report" text="${this.report}"></bw-labeltext>
              <bw-labeltext label="Benefits" text="${this.benefits}"></bw-labeltext>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("bw-job-full", BwJobFull);
