# Soapee

A standalone, browser-based soap (saponification / lye) calculator.

Soapee runs entirely in the browser. There is no backend, database, or login:

- The oils reference data ships as a bundled static file (`client-web/src/data/oils.json`).
- Recipes and your custom additives are saved in your browser's **localStorage**.
- Recipes can be **exported to a JSON file** and **imported from a JSON file**.

## Tech stack

- React 17 + Vite
- Semantic UI React
- Stylus

The app lives in [`client-web/`](./client-web).

## Getting started

```sh
cd client-web
yarn install
yarn start      # dev server
yarn build      # production build to client-web/build
yarn lint
```

Or from the repository root:

```sh
yarn install:client
yarn dev
yarn build
yarn lint
```

## Data & storage

- **Oils** — static data in `client-web/src/data/oils.json`, loaded by `hooks/useOils`.
- **Recipes** — `services/recipesStore` (localStorage key `soapee.recipes`).
- **Additives** — `services/additivesStore` (localStorage key `soapee.additives`).
- **Import / export** — `services/recipeFile`.

Clearing your browser storage will remove all saved recipes and additives.

This project is released under the [AGPLv3 License](https://www.gnu.org/licenses/agpl-3.0.html).
