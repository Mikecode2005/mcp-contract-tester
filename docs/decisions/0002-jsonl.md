# Decision 0002: JSONL traces

Status: accepted

One event per line keeps recording append-friendly, diffable, streamable, and recoverable when the final line is interrupted. The reader reports malformed lines instead of discarding valid events around them.

The format is intentionally small and versioning will be added before compatibility is promised.
