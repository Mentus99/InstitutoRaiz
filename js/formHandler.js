export function initForm() {
  const form = document.getElementById("cadastro-form");
  if (!form) return;
  initMasks(form); // Chama a função abaixo
  initValidation(form);
}

function initMasks(form) {
  const inputCPF = form.querySelector("#cpf");
  if (inputCPF) {
    // Usa a nova função que formata a partir dos dígitos
    inputCPF.addEventListener("input", handleCPFInput);
  }

  const inputTelefone = form.querySelector("#telefone");
  if (inputTelefone) {
    // Usa a nova função que formata a partir dos dígitos
    inputTelefone.addEventListener("input", handleTelefoneInput);
  }

  const inputCEP = form.querySelector("#cep");
  if (inputCEP) {
    // Usa a nova função que formata a partir dos dígitos
    inputCEP.addEventListener("input", handleCEPInput);
  }
}

// Função para formatar CPF automaticamente enquanto digita
function handleCPFInput(e) {
  let value = e.target.value.replace(/\D/g, ""); // Pega SÓ os dígitos
  let formattedValue = "";
  const len = value.length;

  // Limita a 11 dígitos internamente
  if (len > 11) {
    value = value.substring(0, 11);
  }

  // Aplica a formatação baseada no comprimento dos dígitos
  if (len > 9) {
    formattedValue = value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
  } else if (len > 6) {
    formattedValue = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (len > 3) {
    formattedValue = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  } else {
    formattedValue = value;
  }

  e.target.value = formattedValue; // Atualiza o valor no campo
}

// Função para formatar Telefone automaticamente enquanto digita
function handleTelefoneInput(e) {
  let value = e.target.value.replace(/\D/g, ""); // Pega SÓ os dígitos
  let formattedValue = "";
  const len = value.length;

  // Limita a 11 dígitos internamente
  if (len > 11) {
    value = value.substring(0, 11);
  }

  // Aplica a formatação (DDD + 8 ou 9 dígitos)
  if (len === 0) {
    formattedValue = "";
  } else if (len <= 2) {
    formattedValue = `(${value}`;
  } else if (len <= 6) {
    formattedValue = `(${value.substring(0, 2)}) ${value.substring(2)}`;
  } else if (len <= 10) {
    // Telefone Fixo (8 dígitos + DDD) ou Celular incompleto
    formattedValue = `(${value.substring(0, 2)}) ${value.substring(
      2,
      6
    )}-${value.substring(6, 10)}`;
  } else {
    // Celular (9 dígitos + DDD)
    formattedValue = `(${value.substring(0, 2)}) ${value.substring(
      2,
      7
    )}-${value.substring(7, 11)}`;
  }

  e.target.value = formattedValue;
}

// Função para formatar CEP automaticamente enquanto digita
function handleCEPInput(e) {
  let value = e.target.value.replace(/\D/g, ""); // Pega SÓ os dígitos
  let formattedValue = "";
  const len = value.length;

  // Limita a 8 dígitos internamente
  if (len > 8) {
    value = value.substring(0, 8);
  }

  // Aplica a formatação
  if (len > 5) {
    formattedValue = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  } else {
    formattedValue = value;
  }

  e.target.value = formattedValue;
}

// --- MÓDULO DE VALIDAÇÃO
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
    // Validação padrão
    if (!field.checkValidity()) {
      isValid = false;
      showError(field, field.validationMessage);
    }
    if (
      field.id === "cpf" &&
      field.value.length > 0 &&
      field.value.length < 14
    ) {
      isValid = false;
      showError(field, "CPF incompleto.");
    }
    if (
      field.id === "telefone" &&
      field.value.length > 0 &&
      field.value.length < 14
    ) {
      // (xx) xxxx-xxxx = 14 chars
      isValid = false;
      showError(field, "Telefone incompleto.");
    }
    if (
      field.id === "cep" &&
      field.value.length > 0 &&
      field.value.length < 9
    ) {
      isValid = false;
      showError(field, "CEP incompleto.");
    }
  });
  return isValid;
}

function showError(field, message) {
  field.classList.add("invalid");
  const errorSpan = field.nextElementSibling;
  if (errorSpan && errorSpan.classList.contains("form-error-message")) {
    errorSpan.textContent = message;
    // Adiciona ARIA para acessibilidade (boa prática)
    field.setAttribute("aria-invalid", "true");
    // Gera um ID para o span de erro se não tiver
    const errorId = errorSpan.id || `error-for-${field.id}`;
    errorSpan.id = errorId;
    field.setAttribute("aria-describedby", errorId);
  }
}

function clearErrors(form) {
  form.querySelectorAll(".invalid").forEach((el) => {
    el.classList.remove("invalid");
    el.removeAttribute("aria-invalid");
    el.removeAttribute("aria-describedby");
  });
  form
    .querySelectorAll(".form-error-message")
    .forEach((span) => (span.textContent = ""));
}
