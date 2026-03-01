# @barfinex/utils

**Shared utilities and helpers** for the [Barfinex](https://barfinex.com) ecosystem — date/math, HTTP client, Redis client, promises, and Provider-related helpers used across services.

Use this library wherever you need consistent formatting, retries, or low-level client logic without duplicating code in Provider, Detector, connectors, or plugins.

---

## What it does

- **Date & math** — `date` and `math` namespaces for timestamps and calculations.
- **HTTP** — `client` helpers for requests and common patterns.
- **Async** — `promise` utilities (e.g. retries, timeouts).
- **Provider** — `providerUtils` for Barfinex Provider-specific logic.
- **Type-safe** — works with `@barfinex/types` and NestJS where needed.

---

## Installation

```sh
npm install @barfinex/utils
```

or

```sh
yarn add @barfinex/utils
```

---

## What's included

Namespaced exports:

| Namespace | Purpose |
|-----------|--------|
| `date` | Date/time and timestamp helpers. |
| `math` | Math and rounding helpers. |
| `client` | HTTP client and request helpers. |
| `promise` | Promise utilities (retry, etc.). |
| `providerUtils` | Provider-related helpers. |

---

## Documentation

- **Barfinex overview** — [First Steps](https://barfinex.com/docs/first-steps), [Architecture](https://barfinex.com/docs/architecture), [Glossary](https://barfinex.com/docs/glossary).
- **Deployment** — [Installation provider](https://barfinex.com/docs/installation-provider), [Installation detector](https://barfinex.com/docs/installation-detector).
- **APIs & troubleshooting** — [Provider API reference](https://barfinex.com/docs/provider-api), [Building with the API](https://barfinex.com/docs/frontend-api), [Typical problems and solutions](https://barfinex.com/docs/troubleshooting).

---

## Contributing

New helpers and refactors welcome. Open an issue or PR. Community: [Telegram](https://t.me/barfinex) · [GitHub](https://github.com/barfinex).

---

## License

Licensed under the [Apache License 2.0](LICENSE) with additional terms. Attribution to **Barfin Network Limited** and a link to [https://barfinex.com](https://barfinex.com) are required. See [LICENSE](LICENSE) and the [Barfinex site](https://barfinex.com) for details.
