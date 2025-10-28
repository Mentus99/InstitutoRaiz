export function initForm() {
    const form = document.getElementById('cadastro-form');
    if (!form) return; 

    // 1. Liga as máscaras
    initMasks(form);

    // 2. Liga a validação
    initValidation(form);
}

function initMasks(form) {
    const inputCPF = form.querySelector('#cpf');
    if (inputCPF) inputCPF.addEventListener('input', formatCPF);

    const inputTelefone = form.querySelector('#telefone');
    if (inputTelefone) inputTelefone.addEventListener('input', formatTelefone);

    const inputCEP = form.querySelector('#cep');
    if (inputCEP) inputCEP.addEventListener('input', formatCEP);
}
// (As 3 funções de máscara: formatCPF, formatTelefone, formatCEP)
function formatCPF(e) { 
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 11) value = value.substring(0, 11);
    if (value.length > 9) value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    else if (value.length > 6) value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    else if (value.length > 3) value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    e.target.value = value;
}
function formatTelefone(e) { 
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (value.length > 6) value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    else if (value.length > 2) value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    else if (value.length > 0) value = value.replace(/(\d{1,2})/, '($1');
    e.target.value = value;
}
function formatCEP(e) { 
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.substring(0, 8);
    if (value.length > 5) value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    e.target.value = value;
}

// --- MÓDULO DE VALIDAÇÃO --- //
function initValidation(form) {
    // Ouve o 'submit' (envio) do formulário
    form.addEventListener('submit', (e) => {
        // Limpa erros antigos antes de validar
        clearErrors(form);

        // Valida todos os campos
        const isFormValid = validateFields(form);

        // Se o formulário NÃO for válido
        if (!isFormValid) {
            e.preventDefault(); // Impede o envio!
            alert('Por favor, corrija os campos destacados em vermelho.');
        } else {
            // Se for válido, deixa o navegador enviar (ou pode adicionar o localStorage aqui)
            alert('Cadastro enviado com sucesso!');
            // (Para não dar o erro "Cannot POST", vamos impedir o envio por enquanto)
            e.preventDefault();
            form.reset();
        }
    });
}

// Função que valida campo por campo
function validateFields(form) {
    let isValid = true;
    const fields = form.querySelectorAll('[required]');

    fields.forEach(field => {
        // Usa a validação nativa (required, pattern, type=email)
        if (!field.checkValidity()) {
            isValid = false;
            // Mostra o aviso de erro
            showError(field, field.validationMessage);
        }
    });
    
    // (Pode adicionar validações customizadas aqui, ex: CPF válido)
    
    return isValid;
}

// Mostra o aviso de erro (preenche o <span>)
function showError(field, message) {
    field.classList.add('invalid'); // Adiciona a classe (borda vermelha)
    
    // Encontra o <span> de erro correspondente
    const errorSpan = field.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('form-error-message')) {
        errorSpan.textContent = message; // Adiciona a mensagem
    }
}

// Limpa os erros antigos
function clearErrors(form) {
    form.querySelectorAll('.invalid').forEach(el => {
        el.classList.remove('invalid');
    });

    form.querySelectorAll('.form-error-message').forEach(span => {
        span.textContent = ''; // Limpa o texto
    });
}