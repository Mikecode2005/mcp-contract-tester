# Security policy

## Scope

This project is a local development tool. It does not send contract files or recorded traces to a hosted service.

## Reporting a vulnerability

Please do not open a public issue for a security-sensitive report. Email the maintainer through the contact listed on the GitHub profile with a description, reproduction steps, and impact. Remove secrets and personal data from traces before sharing them.

## Important limitations

The current MVP validates the shape of a JSON contract. It does not prove that a server implements the behavior described by a schema, and it does not sandbox replayed tool calls. Treat recorded results as untrusted input.
