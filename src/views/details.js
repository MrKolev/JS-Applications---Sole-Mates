import { html } from "../../node_modules/lit-html/lit-html.js"
import { deleteOne, getInfo} from "../api/data.js"


export async function detailsPageView(ctx) {
  const user = ctx.getUserData();
  const data = await getInfo(ctx.params.id);
  const isCreator = user?._id == data._ownerId;  
  ctx.render(detailsPageTemp(data, isCreator, ctx));
}

function detailsPageTemp(data, isCreator, ctx) {
  return html` 
  <section id="details">
  <div id="details-wrapper">
    <p id="details-title">Shoe Details</p>
    <div id="img-wrapper">
      <img src="${data.imageUrl}" alt="example1" />
    </div>
    <div id="info-wrapper">
      <p>Brand: <span id="details-brand">${data.brand}</span></p>
      <p>
        Model: <span id="details-model">${data.model}</span>
      </p>
      <p>Release date: <span id="details-release">${data.release}</span></p>
      <p>Designer: <span id="details-designer">${data.designer}</span></p>
      <p>Value: <span id="details-value">${data.value}</span></p>
    </div>

    ${isCreator ? html`
    <div id="action-buttons">
     <a href="/edit/${data._id}" id="edit-btn">Edit</a>
     <a @click=${() => {
        if (confirm("Are you sure you want to delete it?")) {
          deleteOne(data._id);
          ctx.page.redirect("/dashboard");
        }
      }} href="javascript:void(0)" id="delete-btn">Delete</a>
    </div>` : ""}   
  </div>
</section>          
`
}