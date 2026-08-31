const action = document.querySelector("#demo-action");
const status = document.querySelector("#demo-status");
action?.addEventListener("click", () => { if (status) status.textContent = "PASS · 2 tools · 0 errors · 1 warning — the CLI is ready to run locally."; if (action) action.textContent = "Validation complete ✓"; });
