const TOOL_NAME = /^[A-Za-z0-9._-]+$/;

export function loadToolsDocument(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object" && Array.isArray(value.tools)) return value.tools;
  return null;
}

export function validateContract(value) {
  const findings = [];
  const tools = loadToolsDocument(value);
  if (!tools) {
    findings.push({ severity: "error", code: "tools.invalid", message: "Expected an array of tools or an object with a tools array." });
    return result(findings, 0);
  }
  const seen = new Set();
  tools.forEach((tool, index) => {
    const label = `Tool ${index + 1}`;
    if (!tool || typeof tool !== "object" || Array.isArray(tool)) {
      findings.push({ severity: "error", code: "tool.invalid", path: `[${index}]`, message: `${label} must be an object.` });
      return;
    }
    if (typeof tool.name !== "string" || !tool.name.trim()) {
      findings.push({ severity: "error", code: "tool.name.required", path: `[${index}].name`, message: `${label} needs a non-empty name.` });
    } else {
      if (!TOOL_NAME.test(tool.name)) findings.push({ severity: "error", code: "tool.name.format", path: `[${index}].name`, message: `Tool name "${tool.name}" contains unsupported characters.` });
      if (seen.has(tool.name)) findings.push({ severity: "error", code: "tool.name.duplicate", path: `[${index}].name`, message: `Tool name "${tool.name}" is duplicated.` });
      seen.add(tool.name);
    }
    if (typeof tool.description !== "string" || !tool.description.trim()) findings.push({ severity: "error", code: "tool.description.required", path: `[${index}].description`, message: `${label} needs a human-readable description.` });
    else if (tool.description.trim().length < 12) findings.push({ severity: "warning", code: "tool.description.short", path: `[${index}].description`, message: `${label} description is very short; explain the action and its purpose.` });
    const schema = tool.inputSchema;
    if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
      findings.push({ severity: "error", code: "schema.required", path: `[${index}].inputSchema`, message: `${label} needs an inputSchema object.` });
      return;
    }
    if (schema.type !== "object") findings.push({ severity: "error", code: "schema.type", path: `[${index}].inputSchema.type`, message: `${label} inputSchema.type must be "object".` });
    if (schema.properties !== undefined && (!schema.properties || typeof schema.properties !== "object" || Array.isArray(schema.properties))) findings.push({ severity: "error", code: "schema.properties", path: `[${index}].inputSchema.properties`, message: `${label} properties must be an object when provided.` });
    if (schema.required !== undefined && (!Array.isArray(schema.required) || schema.required.some((item) => typeof item !== "string"))) findings.push({ severity: "error", code: "schema.required-array", path: `[${index}].inputSchema.required`, message: `${label} required must be an array of strings.` });
    if (Array.isArray(schema.required)) {
      if (!schema.properties || typeof schema.properties !== "object" || Array.isArray(schema.properties)) {
        if (schema.required.length > 0) findings.push({ severity: "error", code: "schema.required-property", path: `[${index}].inputSchema.properties`, message: `${label} declares required properties but does not define a properties object.` });
      } else {
        for (const required of schema.required) if (!(required in schema.properties)) findings.push({ severity: "error", code: "schema.required-property", path: `[${index}].inputSchema.required`, message: `${label} requires "${required}", but it is missing from properties.` });
      }
    }
  });
  if (tools.length === 0) findings.push({ severity: "warning", code: "tools.empty", message: "The contract contains no tools." });
  return result(findings, tools.length);
}

function result(findings, toolCount) {
  const errors = findings.filter((finding) => finding.severity === "error").length;
  const warnings = findings.filter((finding) => finding.severity === "warning").length;
  return { ok: errors === 0, toolCount, errors, warnings, findings };
}
