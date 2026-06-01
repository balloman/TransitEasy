import { render } from "solid-js/web";
import App from "./components/Map/app";

function findSectionByText(text: string) {
  const sections = document.querySelectorAll('section');
  return Array.from(sections).find(section =>
    section.textContent.includes(text)
  );
}

console.log("LOADING TRANSITEASY EXTENSION")
const newText = document.createElement("div");
newText.className = "full";
const relevantSection = findSectionByText("About the building");
relevantSection.parentElement?.insertBefore(newText, relevantSection);
if (!relevantSection) {
  console.log("about this building not found");
}

render(App, newText);
