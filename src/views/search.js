import { html } from "../../node_modules/lit-html/lit-html.js"
import { search } from "../api/data.js";

export const seaechPageView = (ctx) => ctx.render(seaechPageTemp(ctx));

function seaechPageTemp(ctx, push, data) {
    const user = ctx.getUserData();
    return html` 
  <section id="search">
  <h2>Search by Brand</h2>

  <form @submit=${(e) => onSubmit(e, ctx)} class="search-wrapper cf">
    <input
      id="#search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required
    />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>

${push ? html `
<div id="search-container">
${data?.length > 0 ? html`
<ul class="card-wrapper">
${data.map((x) => {
return html `
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
${user? html `<a class="details-btn" href="/details/${x._id}">Details</a>` : ""}
</li>
`
    })}
</ul>
`
            : html`
<h2>There are no results found.</h2>
`}
  </div>
` : ""}
</section>
`}

function onSubmit(e, ctx) {
    e.preventDefault();
    const query = new FormData(e.target).get("search").trim();

    try {
        if (!query) {
            throw new Error("Fill in all the fields")
        }
        search(query)
            .then((data) => {
                console.log(data);
                ctx.render(seaechPageTemp(ctx,true, data));
            })
    } catch (error) {
        alert(error.message)
    }




}