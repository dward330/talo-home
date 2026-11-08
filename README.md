# Talo Home: Custom, without the wait

A static React site that simulates **Talo Home**, our New Ventures concept (UNC Kenan-Flagler, Module 4: Model and Management Sprint): made-to-order sofas for first-home millennials, delivered in three weeks.

**Team:** Morgan Honeycutt · Arica Brown · Ngawang Sherpa · Derrick Ward

> Class concept only. Prices and dates are illustrative, and no orders or payments are taken.

## What's on the site

- **Configurator:** pick the Nelson's size and fabric. The sofa illustration recolors, and the total and 3-week delivery date update.
- **Hosting-date checker:** for our "hosts-in-waiting" beachhead. Enter when guests arrive to see the last day to order.
- **Unit-economics simulator:** contribution per order, breakeven and monthly profit by tariff rate (25% / 30% / 35%), sofa size and order volume.
- **Coming next:** the Grow-up range.

All assumptions live in [`src/data.js`](src/data.js). Change a number there and the whole site updates.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`.
