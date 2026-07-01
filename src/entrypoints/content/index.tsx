import App from "./components/Map/App";

export default defineContentScript({
	matches: ["https://streeteasy.com/*"],

	main: (ctx) => {
		let container: HTMLDivElement | undefined;
		let unmount: (() => void) | undefined;

		const findSectionByText = (text: string) => {
			const sections = document.querySelectorAll("section");
			return Array.from(sections).find((section) => section.textContent?.includes(text));
		};

		const cleanup = () => {
			unmount?.();
			unmount = undefined;

			container?.remove();
			container = undefined;
		};

		const mount = () => {
			if (container?.isConnected) {
				return;
			}

			const section = findSectionByText("About the building");
			if (!section?.parentElement) {
				return;
			}

			container = document.createElement("div");
			container.dataset.transitEasy = "true";

			section.parentElement.insertBefore(container, section);
			unmount = render(App, container);
		};

		const observer = new MutationObserver(() => {
			if (container && !container.isConnected) {
				cleanup();
			}

			mount();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		requestIdleCallback(mount);

		ctx.onInvalidated(() => {
			observer.disconnect();
			cleanup();
		});
	},
});
