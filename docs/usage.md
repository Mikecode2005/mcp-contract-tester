# Usage patterns

## Validate in a pull request

Store a tools response under test/fixtures and run the validate command in CI. Keep the fixture small enough that a reviewer can understand every field.

## Generate an artifact

Use the report command when a human needs a browsable explanation. The generated HTML is standalone and can be attached to a CI job.

## Record a trace

Record only synthetic or approved data. JSONL makes each event independently readable and easy to append, but it is not a security boundary.

## Exit codes

Validation returns zero when there are no errors. Warnings are visible but non-blocking. File and JSON parsing errors return a non-zero exit code.
