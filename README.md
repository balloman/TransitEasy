# TransitEasy

TransitEasy is a Chrome extension that shows transit directions for StreetEasy listings.

## Features

- Save a work address in extension storage
- Inject a Google Maps transit iframe into StreetEasy listing pages
- Rebuild automatically during development with WXT

## Development

1. Install dependencies:
   `pnpm install`
2. Create your local environment file:
   `cp .env.example .env`
3. Set `WXT_GOOGLE_MAPS_API_KEY` in `.env` to a Google Maps Embed API key.
4. Start the watch build:
   `pnpm dev`
5. In Chrome, open `chrome://extensions`, enable Developer mode, and click Load unpacked.
6. Select the `.output` folder in this repository.

The extension will rebuild automatically while `pnpm dev` is running. Use `pnpm build` for a one-off production build.

Available scripts:

- `pnpm dev` - start the WXT dev server
- `pnpm build` - create a production build
- `pnpm zip` - package the extension
- `pnpm lint` - run oxlint
- `pnpm lint:fix` - fix lint issues
- `pnpm format` - format the code
- `pnpm format:check` - check formatting

## Demo

1. Select an address to use for work.
   ![Popup for the extension](https://i.imgur.com/VqvDvkU.png)
2. Scroll down on StreetEasy
   ![iframe that shows how it works](https://i.imgur.com/C0Ns7yf.png)

## Stack

- SolidJS
- WXT
- Tailwind CSS
- daisyUI
- Google Maps Embed API
