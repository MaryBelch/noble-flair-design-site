# `src/data/course.json` — Dead Code

## Status: Unused

The file `src/data/course.json` contains the course module structure (module titles + lesson names) **in Ukrainian only**. It is **not imported anywhere** in the application and has been superseded by the translation-based approach.

## Current Data Source

Course module data lives in the translation files:

| File | Keys |
|---|---|
| `src/data/translations/uk.json` | `course.modules[0..8]` |
| `src/data/translations/ru.json` | `course.modules[0..8]` |
| `src/data/translations/en.json` | `course.modules[0..8]` |

Each locale defines its own `course.modules` array with `{ title, lessons[] }` objects. The component reads them via `tp('course.modules')`.

See `src/components/Course/Course.jsx:66`:

```js
const modules = tp('course.modules') || [];
```

## Why Keep `course.json`?

- It serves as **reference documentation** — the canonical course outline at a glance without reading three JSON files.
- Useful when adding new modules/lessons: update `course.json` first, then propagate to all three translation files.

## If You Ever Want It Gone

1. Delete `src/data/course.json`.
2. No imports or references to remove — it's fully isolated.
3. Nothing breaks.
