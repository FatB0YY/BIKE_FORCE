**English** | [Русский](./README.ru.md)

# Bike Force

A full-stack e-commerce store for bicycles and gear, built as a multi-service application: a TypeScript API over PostgreSQL, a server-side rendered storefront, a separate React admin panel, and an nginx reverse proxy tying them together under Docker Compose.

## Architecture

| Service | Role |
| --- | --- |
| `server` | REST API on Node.js, Express and TypeScript, backed by PostgreSQL |
| `ssr_v2` | Server-side rendered storefront — the main shop page is rendered on the server |
| `client_v2` | Admin panel on React, RTK Query and TypeScript |
| `nginx` | Reverse proxy routing traffic to the services |
| `docs` | Class and activity diagrams, plus API documentation |

The whole stack comes up through `docker-compose.yml`.

## Engineering decisions

**Database normalised to third normal form.** The schema was designed deliberately rather than grown ad hoc: tables are decomposed to 3NF, which removes update anomalies and keeps referential integrity enforceable in the database itself.

**Server-side rendering for the storefront.** The customer-facing shop page is rendered on the server so that content is present in the initial HTML — meaningful for a store, where search engine indexing and first-paint time affect the product directly. The admin panel, which has neither requirement, stays a client-side React app.

**Separate admin client.** Splitting the admin panel from the storefront keeps two very different sets of concerns apart: the storefront is optimised for anonymous visitors and page weight, the panel for authenticated CRUD work.

**Exhaustive error handling.** Failure paths are handled explicitly across the API rather than left to a generic catch-all, so clients receive consistent, meaningful responses.

**Test coverage across usage scenarios.** The project includes a test suite covering the main flows.

## Stack

**Client** — React, TypeScript, Redux Toolkit Query

**Server** — Node.js, Express, TypeScript, PostgreSQL

**Infrastructure** — Docker, Docker Compose, nginx

**Tooling** — Prettier

## Running locally

Requires Docker and Docker Compose.

    git clone https://github.com/FatB0YY/BIKE_FORCE.git
    cd BIKE_FORCE

Create the environment files with your database credentials, `API_URL` and `JWT_SECRET`, then bring the stack up:

    docker compose up --build

## Documentation

Class diagrams, activity diagrams and the API reference are in [`docs`](./docs). Code style conventions for the project are in [`docs/code-style.md`](./docs/code-style.md).

## Note

The user-facing interface and the documentation are in Russian.

## Author

Rodion Ramazanov — [GitHub](https://github.com/FatB0YY) · [Telegram](https://t.me/iamrodionn)
