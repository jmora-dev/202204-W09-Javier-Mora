import { Details } from "./pages/Details";
import { Home } from "./pages/Home";
import "./style.css";
import { getUrlParams } from "./utils/getUrlParams";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  const urlParams = getUrlParams();
  if (urlParams.has("search")) {
    new Details("#app", urlParams.get("search") as string);
  } else {
    new Home("#app");
  }
}
