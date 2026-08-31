# Decision 0004: start with contract shape

Status: accepted

The first release checks the shape of the input schema rather than implementing a complete JSON Schema validator. This keeps findings deterministic and the dependency surface small.

Schema compatibility and richer keyword checks belong in a later milestone with dedicated fixtures and clear compatibility rules.
