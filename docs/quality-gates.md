# Quality gates

Before merging a change, run the test suite and syntax checks. New validation rules need a positive case, a negative case, and a message that points to a useful path. CLI changes need a command-level test or a documented reason why a test is not practical.

Do not add a dependency for a helper that can be expressed clearly with Node built-ins. Do not commit real traces or secrets.
