import { html } from "../../node_modules/lit-html/lit-html.js"
import { edit, getInfo } from "../api/data.js";


export function editPageView(ctx) {
  getInfo(ctx.params.id)
    .then((data) => {
      ctx.render(editPageTemp(ctx, data))
    })
}

function editPageTemp(ctx, data) {
  return html` 
  <section id="edit">
  <div class="form">
    <h2>Edit item</h2>
    <form @submit=${(e) => onSubmit(e, ctx)} class="edit-form">
      <input
        type="text"
        name="brand"
        id="shoe-brand"
        placeholder="Brand"
        value="${data.brand}
      />
      <input
        type="text"
        name="model"
        id="shoe-model"
        placeholder="Model"
        value="${data.model}
      />
      <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
        value="${data.imageUrl}
      />
      <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
        value="${data.release}
      />
      <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
        value="${data.designer}
      />
      <input
        type="text"
        name="value"
        id="shoe-value"
        placeholder="Value"
        value="${data.value}
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>
`
}

async function onSubmit(e, ctx) {
  e.preventDefault();

  const { brand, model, imageUrl,
    release, designer, value } = Object.fromEntries(new FormData(e.target));

  try {
    if (!brand || !model || !imageUrl ||
      !release || !designer || !value) {
      throw new Error("Fill in all the fields!")
    }
    await edit(ctx.params.id, {
      brand, model, imageUrl,
      release, designer, value
    })
    ctx.page.redirect("/dashboard")

  } catch (error) {
    alert(error.message)
  }
}