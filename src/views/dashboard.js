import { html } from "../../node_modules/lit-html/lit-html.js"
import { getAll } from "../api/data.js"


export async function dashboardPageView(ctx) {
  ctx.render(dashboardPageTemp(await getAll(),ctx.getUserData()));
}

function dashboardPageTemp(data) {
  return html`
  <section id="dashboard">
  <h2>Collectibles</h2>
  ${data.length > 0 ? html`
  ${data.map((x) => {
    return html`
<ul class="card-wrapper">
    <li class="card">
      <img src="${x.imageUrl}" alt="travis" />
      <p>
        <strong>Brand: </strong><span class="brand">${x.brand}</span>
      </p>
      <p>
        <strong>Model: </strong
        ><span class="model">${x.model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${x.value}</span>$</p>
      <a class="details-btn" href="/details/${x._id}">Details</a>
    </li>
</ul>`
})}`
: html`
  <h2>There are no items added yet.</h2>
  `}
</section>
`}