# Contributing

Thank you for your interest in contributing to autodarts!

## Local development

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm (bundled with Node.js)
- Python 3 (optional, for the local dev server)

### Install dependencies

```bash
npm ci
```

### Build the site

```bash
npm run build
```

Compiled JS files are written to the `js/` directory.

### Run the dev server

```bash
npm run dev
```

This builds the site and then serves it at <http://localhost:8765>.

### Watch for changes

```bash
npm run watch
```

## Running the CI build locally

To reproduce the exact check that runs in GitHub Actions, use:

```bash
npm run ci:build
```

This performs a clean install (`npm ci`) followed by `npm run build`, matching the CI workflow step for step.

## Pull requests

- Open a PR against the `main` branch.
- The CI workflow (`.github/workflows/ci.yml`) will run automatically and must pass before merging.
- To verify your changes will pass CI before pushing, run `npm run ci:build` locally.
