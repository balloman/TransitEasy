# TransitEasy
This repository contains a chrome extension that lets you see the transit times for streeteasy properties

## Development
1. Install dependencies:
   `pnpm install`
2. Start the watch build:
   `pnpm dev`
3. In Chrome, open `chrome://extensions`, enable Developer mode, and click Load unpacked.
4. Select the `dist` folder in this repository.

The extension will rebuild automatically while `pnpm dev` is running. Use `pnpm build` for a one-off production build.

## Demo
1. Select an address to use for work.
![Popup for the extension](https://i.imgur.com/VqvDvkU.png)
2. Scroll down on StreetEasy
![iframe that shows how it works](https://i.imgur.com/C0Ns7yf.png)

# Stack
- SolidJS
- Vite
- HopeUI
- Google MapsEmbed API
