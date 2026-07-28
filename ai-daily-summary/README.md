# AI Daily Summary

Public archive for the APRL AI News Brief.

## Public URL

- https://gisbi-kim.github.io/ai-daily-summary/

## Data model

The site is a static GitHub Pages application. `data/digests.json` is the append-only, queryable database.

Each digest contains:

- `id`: stable `YYYY-MM-DD-HHMM` identifier
- `published_at`: ISO 8601 timestamp in KST
- `slack_ts`: Slack message timestamp
- `channel_id`: source channel
- `raw_text`: exact text sent to Slack

The browser parses `raw_text` into item cards at runtime, so the archived Slack text remains the single source of truth. The **원문 보기** button exposes the exact stored message.

## Update contract

For every scheduled briefing:

1. Read Slack channel `#aprl-chat-ai-tips` and this JSON database.
2. Reconcile missing Slack briefings into the database.
3. Compose one `digest_text`.
4. Store the exact same `digest_text` in `data/digests.json`.
5. Send that exact `digest_text` to Slack.
6. Never create a second record with the same `id` or `slack_ts`.

## Design

This interface is intentionally independent from `arxiv-daily-summary`: a dark signal-console layout, full-text search, source filtering, topic tags, rendered cards, and an exact raw-text view.
