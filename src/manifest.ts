import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = packageJson.version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: packageJson.displayName ?? packageJson.name,
  version: `${major}.${minor}.${patch}.${label}`,
  description: packageJson.description,
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icons/transit.png",
  },
  icons: {
    "128": "icons/transit.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.tsx"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
      matches: ["*://*/*"],
    },
  ],
  permissions: ["storage"],
}));

export default manifest;
