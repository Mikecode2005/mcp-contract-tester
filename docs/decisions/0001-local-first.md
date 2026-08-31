# Decision 0001: local-first execution

Status: accepted

Contracts and traces remain on the developer machine because they may contain private tool names, prompts, identifiers, or result data. A hosted dashboard would create a new trust boundary before the project has a reason to need one.

The tradeoff is that sharing results requires an explicit generated artifact. That is preferable to silently uploading sensitive debugging data.
