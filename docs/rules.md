# Validation rules

Current rules are deliberately conservative:

- tools.invalid: the input must be a tools array or an object containing one.
- tool.name.required: every tool needs a non-empty name.
- tool.name.format: names use letters, numbers, dots, underscores, or hyphens.
- tool.name.duplicate: names must be unique within one contract.
- tool.description.required: descriptions are required for client discoverability.
- tool.description.short: descriptions shorter than twelve characters warn.
- schema.required: every tool needs an inputSchema object.
- schema.type: input schemas must describe an object.
- schema.required-array: required must be an array of strings.
- schema.required-property: required names must exist in properties.

Rules report errors for contract blockers and warnings for quality suggestions. A warning does not change the process exit code.
