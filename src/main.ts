import { Home } from "./pages/Home";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
  const path = document.location.pathname;
  if (path === "/" || path.match(/\/index(.html)?$/)) {
    new Home("#app");
  }
}
