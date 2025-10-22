// Função principal que inicializa tudo no formulário
export function initForm() {
    const form = document.getElementById('cadastro-form');
    if (!form) return; // Sai se o formulário não estiver na página

    // 1. Inicializa as máscaras (CPF, CEP, etc)
    initMasks(form);

    // 2. Inicializa a validação de erros
    initValidation(form);
}

// --- MÓDULO DE MÁSCARAS ---
function initMasks(form) {
    // Máscara de CPF
    const inputCPF = form.querySelector('#cpf');
    if (inputCPF) inputCPF.addEventListener('input', formatCPF);

    // Máscara de Telefone
    const inputTelefone = form.querySelector('#telefone');
    if (inputTelefone) inputTelefone.addEventListener('input', formatTelefone);

    // Máscara de CEP
    const inputCEP = form.querySelector('#cep');
    if (inputCEP) inputCEP.addEventListener('input', formatCEP);
}

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

// --- MÓDULO DE VALIDAÇÃO ---
function initValidation(form) {
    // Ouve o 'submit' (envio) do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o envio padrão

        clearErrors(form); // Limpa erros antigos

        // Valida todos os campos
        const isFormValid = validateFields(form);

        if (isFormValid) {
            alert('Formulário enviado com sucesso!');
            // form.submit(); // Aqui enviaria de verdade
        } else {
            alert('Por favor, corrija os campos destacados em vermelho.');
        }
    });
}

function validateFields(form) {
    let isValid = true;
    // Pega todos os campos que têm 'required'
    const fields = form.querySelectorAll('[required]');

    fields.forEach(field => {
        // Usa a validação nativa do navegador (ex: tipo 'email', 'required')
        if (!field.checkValidity()) {
            isValid = false;
            // Mostra o erro na tela
            showError(field);
        }
    });

    return isValid;
}

// Mostra o aviso de erro
function showError(field) {
    field.classList.add('invalid'); // Adiciona a classe (borda vermelha)
    
    // Pega a mensagem de erro (ex: "Preencha este campo")
    let message = field.validationMessage;
    
    const errorId = field.id + '-error';

    // Cria o <span> da mensagem de erro
    const errorSpan = document.createElement('span');
    errorSpan.className = 'form-error-message';
    errorSpan.id = errorId;
    errorSpan.textContent = message;
    errorSpan.setAttribute('aria-live', 'polite'); // Acessibilidade

    // Conecta o erro ao input (acessibilidade)
    field.setAttribute('aria-describedby', errorId);
    field.setAttribute('aria-invalid', 'true');

    if(field.type === 'radio') {
        field.closest('.form-group-radio').classList.add('invalid');
    } else {
         field.parentNode.appendChild(errorSpan); // Adiciona a msg na página
    }
}

// Limpa os erros antigos
function clearErrors(form) {
    form.querySelectorAll('.invalid').forEach(el => {
        el.classList.remove('invalid');
    });
    
    form.querySelectorAll('[aria-invalid="true"]').forEach(field => {
        field.setAttribute('aria-invalid', 'false');
        field.removeAttribute('aria-describedby');
    });

    form.querySelectorAll('.form-error-message').forEach(span => {
        span.remove();
    });
}