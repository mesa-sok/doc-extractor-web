# doc-extractor-web

A Next.js application acting as a frontend for a document conversion pipeline (PDF → Markdown).

## Prerequisites

- [Bun](https://bun.sh/) (v1 or later)

## Getting Started

Install dependencies:

```bash
bun install
```

Run the development server:

```bash
bun run dev
```

Build for production:

```bash
bun run build
```

Start the production server:

```bash
bun run start
```

## Docker

Build and run with Docker:

```bash
docker build -t doc-extractor-web .
docker run -p 3000:3000 doc-extractor-web
```
