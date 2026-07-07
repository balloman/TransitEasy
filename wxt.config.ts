import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

import packageJson from "./package.json";

export default defineConfig({
	modules: ["@wxt-dev/module-solid"],
	manifest: {
		name: packageJson.displayName,
		description: packageJson.description,
		permissions: ["storage"],
		icons: {
			128: "/icons/transit.png",
		},
	},
	srcDir: "src",
	vite: () => ({
		plugins: [tailwindcss()],
	}),
});
