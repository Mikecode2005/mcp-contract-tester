# GitHub Actions integration

The repository ships a small CI workflow that runs the Node test suite and syntax checks. A future action can add contract validation annotations, but the current workflow intentionally stays install-light and does not require a generated lockfile.

For a consumer repository, keep a synthetic contract fixture in version control and run the CLI against it. Upload HTML reports only when the contract is safe for the repository's visibility.
