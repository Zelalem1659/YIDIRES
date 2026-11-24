# YIDRES (ይድረስ)

**You order. We deliver.** YIDRES is an Ethiopia-focused delivery platform for food, groceries and packages.

## Current increment

This repository contains a responsive customer landing page in English and Amharic, with landmark-based address entry and illustrative service categories. The examples are not live listings. Sign-in, ordering, merchant and driver onboarding, administration, GPS tracking and payments are **not implemented yet**. The address form does not transmit or store an address. The Express service currently exposes only a health endpoint.

## Getting started

Requires Node.js 24 and npm.

```sh
npm install
npm run dev       # frontend, normally http://localhost:5173
npm run server    # API health endpoint at http://localhost:3001/api/health
npm run lint
npm run build
```

The homepage uses local CSS illustrations and system fonts, with a bundled Ethiopic font for devices that lack one. It makes no third-party image or font requests.

## Architecture and roadmap

The initial architecture is a React + TypeScript + Vite customer web app, Tailwind CSS for styling, and a Node.js/Express API. PostgreSQL is the planned system of record. Separate customer, driver, merchant and administrator interfaces should consume the same versioned API, with authorization enforced on the server for every operation. The frontend and API are currently independent; no database connection is configured.

```text
src/              Customer web app and styles
server/           Express API foundation
public/           Static assets
```

### PostgreSQL design

The following is a proposed logical model, not an applied migration:

| Entity | Key fields and relationships |
| --- | --- |
| users | id, normalized E.164 phone (+251 supported), name, language, created_at; phone unique |
| user_roles | user_id, role (customer, driver, merchant, admin); unique pair |
| addresses | id, customer_id → users, label, area, landmark, optional latitude/longitude |
| merchants | id, owner_id → users, name, category, status |
| products | id, merchant_id → merchants, name, price in birr minor units, availability |
| orders | id, customer_id → users, merchant_id → merchants (nullable for packages), delivery address snapshot, total in minor units, status, timestamps |
| order_items | id, order_id → orders, product_id → products, quantity, unit price snapshot |
| deliveries | id, order_id → orders, driver_id → users, status, pickup and drop-off details |
| delivery_locations | delivery_id → deliveries, latitude, longitude, recorded_at; retention-limited |
| payments | id, order_id → orders, provider (Telebirr, Chapa, cash), amount in minor units, status, provider reference |

Use foreign keys, check constraints, transactional order and payment state transitions, and indexes on relationship keys and operational status/time queries. Keep immutable price and address snapshots on orders. Use integer minor units for Ethiopian birr (100 santim per birr), never floating-point currency. Database migrations and connection management must be added before persistence is enabled.

### Incremental delivery

1. Establish the foundation and customer homepage (this increment).
2. Add verified +251 phone authentication, role-based access, address management, merchant catalogs and customer ordering.
3. Add merchant order management, driver dispatch and consent-based GPS tracking with appropriate retention controls.
4. Integrate Telebirr, Chapa and cash-on-delivery using provider documentation, authenticated webhooks, idempotency and reconciliation; never treat a client callback as proof of payment.
5. Add administrative operations, audit logs, observability, accessibility and end-to-end testing.

Before deploying real workflows, add server-side input validation, rate limiting, secure session management, least-privilege database access, TLS, privacy controls and a security review. Do not store credentials or payment secrets in the repository.
