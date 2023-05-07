import { render } from "solid-js/web";
import App from "./components/Map/app";

const newText = document.createElement("div");
newText.className = "full";
const content = document.getElementById("content");
const m = content?.getElementsByTagName("main")?.[0];
const detailsPage = m?.getElementsByClassName("DetailsPage")?.[0];
const closer = detailsPage?.getElementsByClassName("closer")?.[0];
detailsPage?.insertBefore(newText, closer);
if (!closer) {
  console.log("closer not found");
}

render(App, newText);
