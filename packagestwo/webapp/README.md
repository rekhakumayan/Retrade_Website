## Next Redux Modular Boilerplate

This project is a Next.js (App Router) starter with a **module-first Redux architecture**.

### Folder purpose guide

- `public/`: Static files served directly (icons, images, fonts).
- `src/app/`: App Router routes, layout, global CSS, and provider wiring.
- `src/redux/`: Redux store wiring only (no feature business logic).
- `src/modules/`: Feature-first folders where each feature keeps slice + thunks + feature UI.
- `src/sharedComponents/`: Reusable UI components shared by many modules.
- `src/lib/`: Third-party integrations and cross-cutting helpers (analytics/logging/etc.).
- `src/utils/`: Small pure utility functions (validation, formatting, calculations).
- `src/styles/`: Shared CSS tokens, reset, and common utility classes.
- `src/assets/`: Imported assets that go through bundling pipeline.

### Folder structure

```txt
src/
  app/
    layout.js
    page.js
    providers.js
    globals.css
    (routes)/
      signin/page.js
      products/page.js
  redux/
    store.js
    rootReducer.js
  modules/
    auth/
      auth.module.js
      auth.selectors.js
      components/
      pages/
    user/
      user.module.js
    products/
      products.module.js
      components/
      pages/
  sharedComponents/
  lib/
  utils/
  styles/
  assets/
```

### Redux usage style

- Keep feature state, actions, reducers, thunks in `*.module.js`.
- Keep global wiring only in `src/redux/store.js` and `src/redux/rootReducer.js`.
- Use `src/app/providers.js` to wrap App Router with Redux Provider.

### Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
