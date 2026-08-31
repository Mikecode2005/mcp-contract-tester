# Decision 0003: errors fail, warnings pass

Status: accepted

A contract error means a required structural guarantee is missing and returns exit code 1. A warning is a quality suggestion that should be visible in review but should not block adoption of the first version.

A future strict mode may promote selected warnings without changing the default behavior.
