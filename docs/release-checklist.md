# Release checklist

- Update the version and changelog.
- Run npm test.
- Run npm run check.
- Test one passing and one failing fixture manually.
- Review generated HTML for escaped user content.
- Check README examples against the current CLI.
- Confirm no credentials or private traces are included.
- Tag the release only after the changelog describes limitations.
