import { html } from "../../node_modules/lit-html/lit-html.js"
import { createAlbum } from "../api/data.js";


export async function createPageView(ctx) {
  ctx.render(createPageTemp(ctx))
}

function createPageTemp(ctx) {
  return html` 
  <section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form @submit=${(e) => onSubmit(e, ctx)} class="create-form">
      <input
        type="text"
        name="brand"
        id="shoe-brand"
        placeholder="Brand"
      />
      <input
        type="text"
        name="model"
        id="shoe-model"
        placeholder="Model"
      />
      <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
      />
      <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
      />
      <input
        type="text"
        name="value"
        id="shoe-value"
        placeholder="Value"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>
`
}

async function onSubmit(e, ctx) {
  e.preventDefault();
  const {
    brand,
    model,
    imageUrl,
    release,
    designer,
    value
  } = Object.fromEntries(new FormData(e.target));

  try {
    if (!brand || !model || !imageUrl
      || !release || !designer || !value) {
      throw new Error("Fill in all the fields!")
    }
    await createAlbum({
      brand,
      model,
      imageUrl,
      release,
      designer,
      value
    })
    ctx.page.redirect("/dashboard")

  } catch (error) {
    alert(error.message)
  }
}