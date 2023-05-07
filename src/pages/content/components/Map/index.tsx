import App from "@src/pages/content/components/Map/app";
import { render } from "solid-js/web";

const root = document.createElement("div");
root.id = "extension-root";
document.body.append(root);

render(App, root);
