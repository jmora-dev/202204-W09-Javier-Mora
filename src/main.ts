import { Details } from "./pages/Details";
import { Home } from "./pages/Home";
import "./style.css";
import { getUrlParams } from "./utils/getUrlParams";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  const path = document.location.pathname;
  const urlParams = getUrlParams();
  if (path === "/" || path.match(/\/index(.html)?$/)) {
    new Home("#app");
  } else if (path.match(/\/details(.html)?$/)) {
    console.log(urlParams);
    new Details(
      "#app",
      urlParams.has("search") ? (urlParams.get("search") as string) : ""
    );
  }
}
