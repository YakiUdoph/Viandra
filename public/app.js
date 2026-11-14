const limits = { original: 8000, handoff: 6000, total: 24000, min: 2, max: 8 };
const state = { handoffCount: 0, result: null, submittedInput: null, selected: 0 };

const elements = {
  form: document.querySelector("#trace-form"),
  original: document.querySelector("#original"),
  originalCount: document.querySelector("#original-count"),
  handoffList: document.querySelector("#handoff-list"),
  addHandoff: document.querySelector("#add-handoff"),
  loadExample: document.querySelector("#load-example"),
  traceButton: document.querySelector("#trace-button"),
  formError: document.querySelector("#form-error"),
  empty: document.querySelector("#empty-state"),
  loading: document.querySelector("#loading-state"),
  resultError: document.querySelector("#result-error"),
  results: document.querySelector("#results"),
  resultsPanel: document.querySelector("#results-panel"),
  requirementList: document.querySelector("#requirement-list"),
  detail: document.querySelector("#detail-panel"),
  resultCount: document.querySelector("#result-count"),
  correction: document.querySelector("#correction-text"),
  copy: document.querySelector("#copy-correction"),
  export: document.querySelector("#export-report"),
  actionStatus: document.querySelector("#action-status")
};

function setMessage(element, message = "") {
  element.textContent = message;
  element.hidden = !message;
}

function addHandoff(value = "") {
  if (state.handoffCount >= limits.max) return;
  state.handoffCount += 1;
  const number = state.handoffCount;
  const wrapper = document.createElement("div");
  wrapper.className = "handoff";
  wrapper.dataset.number = String(number);

  const group = document.createElement("div");
  group.className = "field-group";
  const heading = document.createElement("div");
  heading.className = "field-heading";
  const label = document.createElement("label");
  label.htmlFor = `handoff-${number}`;
  label.textContent = `Handoff ${elements.handoffList.children.length + 1}`;
  const controls = document.createElement("span");
  controls.textContent = `${value.length.toLocaleString()} / ${limits.handoff.toLocaleString()}`;
  heading.append(label, controls);

  const textarea = document.createElement("textarea");
  textarea.id = `handoff-${number}`;
  textarea.name = "handoff";
  textarea.maxLength = limits.handoff;
  textarea.rows = 5;
  textarea.placeholder = "Paste the next message in the chain…";
  textarea.required = true;
  textarea.value = value;
  textarea.addEventListener("input", () => { controls.textContent = `${textarea.value.length.toLocaleString()} / ${limits.handoff.toLocaleString()}`; });

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "remove-handoff";
  remove.textContent = "Remove";
  remove.setAttribute("aria-label", `Remove handoff ${elements.handoffList.children.length + 1}`);
  remove.addEventListener("click", () => {
    if (elements.handoffList.children.length <= limits.min) {
      setMessage(elements.formError, "Keep at least two handoffs in the trace.");
      return;
    }
    wrapper.remove();
    relabelHandoffs();
  });
  heading.append(remove);
  group.append(heading, textarea);
  wrapper.append(group);
  elements.handoffList.append(wrapper);
  elements.addHandoff.disabled = elements.handoffList.children.length >= limits.max;
}

function relabelHandoffs() {
  [...elements.handoffList.children].forEach((item, index) => {
    const label = item.querySelector("label");
    const remove = item.querySelector("button");
    label.textContent = `Handoff ${index + 1}`;
    remove.setAttribute("aria-label", `Remove handoff ${index + 1}`);
  });
  elements.addHandoff.disabled = elements.handoffList.children.length >= limits.max;
}

function getInput() {
  return {
    original: elements.original.value.trim(),
    handoffs: [...elements.handoffList.querySelectorAll("textarea")].map((field) => field.value.trim())
  };
}

function validate(input) {
  if (!input.original) return "Enter the original instructions.";
  if (input.handoffs.length < limits.min) return "Add at least two handoffs.";
  const empty = input.handoffs.findIndex((text) => !text);
  if (empty >= 0) return `Handoff ${empty + 1} cannot be empty.`;
  const total = input.original.length + input.handoffs.reduce((sum, text) => sum + text.length, 0);
  if (total > limits.total) return `Combined input must be ${limits.total.toLocaleString()} characters or fewer.`;
  return "";
}

function showLoading(isLoading) {
  elements.resultsPanel.setAttribute("aria-busy", String(isLoading));
  elements.traceButton.disabled = isLoading;
  elements.empty.hidden = true;
  elements.loading.hidden = !isLoading;
  if (isLoading) {
    elements.results.hidden = true;
    setMessage(elements.resultError);
  }
}

function evidenceNode(evidence, emptyText) {
  if (!evidence?.quote) {
    const p = document.createElement("p");
    p.className = "unsupported";
    p.textContent = emptyText;
    return p;
  }
  if (!evidence.supported) {
    const p = document.createElement("p");
    p.className = "unsupported";
    p.textContent = "SERV supplied a quotation that could not be matched to the source. It is not shown as verified evidence.";
    return p;
  }
  const quote = document.createElement("blockquote");
  quote.textContent = evidence.quote;
  return quote;
}

function renderDetail(requirement) {
  elements.detail.replaceChildren();
  const title = document.createElement("h3");
  title.textContent = requirement.title;
  const importance = document.createElement("p");
  importance.textContent = requirement.importance;

  const original = document.createElement("div");
  original.className = "evidence-block";
  const originalLabel = document.createElement("div");
  originalLabel.className = "evidence-label";
  const labelText = document.createElement("span");
  labelText.textContent = "Original evidence";
  const support = document.createElement("span");
  support.textContent = requirement.originalEvidence.supported ? "Exact source match" : "Unsupported";
  originalLabel.append(labelText, support);
  original.append(originalLabel, evidenceNode(requirement.originalEvidence, "No supported original quotation was returned."));

  const traceList = document.createElement("div");
  traceList.className = "trace-list";
  requirement.handoffs.forEach((trace) => {
    const item = document.createElement("div");
    item.className = `trace-item status-${trace.classification}`;
    const dot = document.createElement("span");
    dot.className = "trace-dot";
    dot.setAttribute("aria-hidden", "true");
    const body = document.createElement("div");
    body.className = "trace-body";
    const top = document.createElement("div");
    top.className = "trace-topline";
    const handoffLabel = document.createElement("strong");
    handoffLabel.textContent = trace.label;
    const status = document.createElement("span");
    status.className = "status";
    status.textContent = trace.classification;
    const explanation = document.createElement("p");
    explanation.textContent = trace.explanation;
    top.append(handoffLabel, status);
    body.append(top, explanation);
    if (trace.evidence?.quote && trace.evidence.supported) {
      const quote = document.createElement("q");
      quote.textContent = trace.evidence.quote;
      body.append(quote);
    } else if (trace.evidence?.quote && !trace.evidence.supported) {
      body.append(evidenceNode(trace.evidence, ""));
    }
    item.append(dot, body);
    traceList.append(item);
  });
  elements.detail.append(title, importance, original, traceList);
}

function selectRequirement(index) {
  state.selected = index;
  [...elements.requirementList.children].forEach((button, itemIndex) => button.setAttribute("aria-pressed", String(itemIndex === index)));
  renderDetail(state.result.analysis.requirements[index]);
}

function renderResults(result) {
  state.result = result;
  state.selected = 0;
  elements.requirementList.replaceChildren();
  result.analysis.requirements.forEach((requirement, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "requirement-button";
    button.setAttribute("aria-pressed", String(index === 0));
    const number = document.createElement("span");
    number.className = "requirement-index";
    number.textContent = String(index + 1).padStart(2, "0");
    const title = document.createElement("span");
    title.className = "requirement-title";
    title.textContent = requirement.title;
    const problem = document.createElement("span");
    problem.className = `problem-label${requirement.firstProblematicHandoff ? "" : " clear"}`;
    problem.textContent = requirement.firstProblematicHandoff ? `First issue: ${requirement.firstProblematicHandoff.label}` : "No material issue found";
    button.append(number, title, problem);
    button.addEventListener("click", () => selectRequirement(index));
    elements.requirementList.append(button);
  });
  elements.resultCount.textContent = `${result.analysis.requirements.length} requirement${result.analysis.requirements.length === 1 ? "" : "s"}`;
  elements.resultCount.hidden = false;
  elements.correction.value = result.analysis.proposedCorrection;
  elements.results.hidden = false;
  renderDetail(result.analysis.requirements[0]);
}

async function submit(event) {
  event.preventDefault();
  setMessage(elements.formError);
  setMessage(elements.actionStatus);
  const input = getInput();
  const issue = validate(input);
  if (issue) {
    setMessage(elements.formError, issue);
    return;
  }
  state.submittedInput = input;
  showLoading(true);
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) throw new Error(body?.error?.message || "The analysis could not be completed. No result was created.");
    renderResults(body);
  } catch (error) {
    state.result = null;
    elements.resultCount.hidden = true;
    setMessage(elements.resultError, error.message || "The analysis could not be completed. No result was created.");
  } finally {
    showLoading(false);
  }
}

async function copyCorrection() {
  const text = elements.correction.value;
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    elements.correction.select();
    document.execCommand("copy");
  }
  setMessage(elements.actionStatus, "Correction copied.");
}

function exportReport() {
  if (!state.result || !state.submittedInput) return;
  const report = {
    product: "Viandra",
    tagline: "Know what changed before work moves forward.",
    generatedAt: new Date().toISOString(),
    notice: "Classifications are SERV model interpretations for human review. Evidence support only confirms exact source quotation.",
    source: {
      original: state.submittedInput.original,
      handoffs: state.submittedInput.handoffs.map((text, index) => ({ id: `handoff-${index + 1}`, label: `Handoff ${index + 1}`, text }))
    },
    analysis: { ...state.result.analysis, proposedCorrection: elements.correction.value }
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `viandra-investigation-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  setMessage(elements.actionStatus, "Investigation exported.");
}

function loadExample() {
  elements.original.value = "Do not dispatch until payment is confirmed.";
  elements.original.dispatchEvent(new Event("input"));
  elements.handoffList.replaceChildren();
  state.handoffCount = 0;
  addHandoff("Wait for payment confirmation before dispatch.");
  addHandoff("Package ready. Dispatch immediately.");
  setMessage(elements.formError);
}

elements.original.addEventListener("input", () => { elements.originalCount.textContent = `${elements.original.value.length.toLocaleString()} / ${limits.original.toLocaleString()}`; });
elements.addHandoff.addEventListener("click", () => addHandoff());
elements.loadExample.addEventListener("click", loadExample);
elements.form.addEventListener("submit", submit);
elements.copy.addEventListener("click", copyCorrection);
elements.export.addEventListener("click", exportReport);
addHandoff();
addHandoff();
