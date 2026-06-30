# Soapee — Standalone Soap Calculator

A standalone, browser-based soap (saponification / lye) calculator. Runs entirely
in the browser — there is no backend, database, account, or login:

- The oils reference data ships as a bundled static file (`client-web/src/data/oils.json`).
- Recipes and your custom additives are saved in your browser's **localStorage**.
- Recipes can be **exported to a JSON file** and **imported from a JSON file**.
- Can be built into an offline, [double-clickable bundle](#offline--double-clickable-build) you can run with no server at all.

## Relationship to the original Soapee

This is an independent fork of the original [Soapee](https://github.com/nazar/soapee.open)
project — the soap-making community site at soapee.com, which was **decommissioned in
April 2024 and is no longer maintained**.

The original was a full community platform (forums, posts, feeds, profiles, comments,
votes, user accounts, a PostgreSQL database, and a GraphQL API). This fork keeps **only
the lye calculator** and rebuilds it as a self-contained, offline-first tool: all server,
database, and account features have been removed, and your data lives in your own browser
rather than on a shared server. It exists so the calculator can keep running long after
the original site is gone — privately, locally, with nothing to host or maintain.

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

## Offline / double-clickable build

```sh
yarn build:standalone     # from root, or `yarn build:standalone` inside client-web
```

This produces a `client-web/build/` folder whose `index.html` you can open by
**double-clicking it** (no web server needed) — the app's JS/CSS are inlined and
routing is hash-based so it runs from the `file://` protocol. Keep the folder
intact: `index.html` needs the sibling `tinymce/` and `assets/` folders beside
it. To share it, zip the whole `build/` folder.

The regular `yarn build` produces a conventional multi-file build that is
smaller and better suited to hosting on a static web server.

## Data & storage

- **Oils** — static data in `client-web/src/data/oils.json`, loaded by `hooks/useOils`.
- **Recipes** — `services/recipesStore` (localStorage key `soapee.recipes`).
- **Additives** — `services/additivesStore` (localStorage key `soapee.additives`).
- **Import / export** — `services/recipeFile`.

Clearing your browser storage will remove all saved recipes and additives.

This project is released under the [AGPLv3 License](https://www.gnu.org/licenses/agpl-3.0.html).
