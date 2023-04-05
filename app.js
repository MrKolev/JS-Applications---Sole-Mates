import { html, render } from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs";
import { logout } from "./src/api/data.js";
import { delUserData, getUserData, setUserData } from "./src/api/utils.js";
import { createPageView } from "./src/views/create.js";
import { dashboardPageView } from "./src/views/dashboard.js";
import { detailsPageView } from "./src/views/details.js";
import { editPageView } from "./src/views/edit.js";
import { homePageView } from "./src/views/home.js";
import { loginPageView } from "./src/views/login.js";
import { registerPageView } from "./src/views/register.js";
import { seaechPageView } from "./src/views/search.js";

const context = document.querySelector("main");
const navBar = document.querySelector("header");

page(middleware)
page("/", homePageView);
page("/dashboard", dashboardPageView);
page("/register", registerPageView);
page("/login", loginPageView);
page("/create", createPageView);
page("/details/:id", detailsPageView);
page("/edit/:id", editPageView);
page("/search", seaechPageView);
page("/logout", () => {
    logout();
    delUserData();
    page.redirect("/");
});

page.start();

updateNavBar()

export function updateNavBar() {
    const user = getUserData();
    const navTemp = html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt=""/></a>
<nav>
  <div>
    <a href="/dashboard">Dashboard</a>
    <a href="/search">Search</a>
  </div>
${user ? html`
<div class="user">
<a href="/create">Add Pair</a>
<a href="/logout">Logout</a>
</div>
`: html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>
</nav>
`}`
    render(navTemp, navBar)
}

function middleware(ctx, next) {
    ctx.render = (cont) => render(cont, context);
    ctx.page = page;
    ctx.updateNavBar = updateNavBar;
    ctx.setUserData = setUserData;
    ctx.getUserData = getUserData;
    next();
}
