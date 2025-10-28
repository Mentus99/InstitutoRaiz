export function initForm() {
  const form = document.getElementById("cadastro-form");
  if (!form) return;
  initMasks(form);
  initValidation(form);
}
// --- MÁSCARAS ---
function initMasks(form) {}
function formatCPF(e) {
  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
  v = v
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  e.target.value = v;
}
function formatTelefone(e) {
  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
  v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  e.target.value = v;
}
function formatCEP(e) {
  let v = e.target.value.replace(/\D/g, "").slice(0, 8);
  v = v.replace(/(\d{5})(\d)/, "$1-$2");
  e.target.value = v;
}
// --- VALIDAÇÃO ---
function initValidation(form) {
  form.addEventListener("submit", (e) => {
    clearErrors(form);
    const isValid = validateFields(form);
    if (!isValid) {
      e.preventDefault();
      alert("Por favor, corrija os campos destacados.");
    } else {
      alert("Cadastro enviado com sucesso!");
      e.preventDefault();
      form.reset();
    }
  });
}
function validateFields(form) {
  let isValid = true;
  form.querySelectorAll("[required]").forEach((field) => {
    if (!field.checkValidity()) {
      isValid = false;
      showError(field, field.validationMessage);
    }
  });
  return isValid;
}
function showError(field, message) {
  field.classList.add("invalid");
  const errorSpan = field.nextElementSibling;
  if (errorSpan && errorSpan.classList.contains("form-error-message")) {
    errorSpan.textContent = message;
  }
}
function clearErrors(form) {
  form
    .querySelectorAll(".invalid")
    .forEach((el) => el.classList.remove("invalid"));
  form
    .querySelectorAll(".form-error-message")
    .forEach((span) => (span.textContent = ""));
}
