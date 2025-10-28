/* Arquivo: js/masks.js
  Objetivo: Aplicar máscaras de formulário (Requisito da Atividade 1)
*/

// Ouve o evento de 'DOMContentLoaded' para garantir que o HTML foi carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Encontra os campos pelos IDs que demos no HTML
    const inputCPF = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    const inputCEP = document.getElementById('cep');

    // Adiciona os "ouvintes" de evento para cada campo
    if (inputCPF) {
        inputCPF.addEventListener('input', formatCPF);
    }
    if (inputTelefone) {
        inputTelefone.addEventListener('input', formatTelefone);
    }
    if (inputCEP) {
        inputCEP.addEventListener('input', formatCEP);
    }
});

// --- Funções de formatação ---

// Formata o CPF: 000.000.000-00
function formatCPF(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (value.length > 11) {
        value = value.substring(0, 11);
    }
    
    if (value.length > 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
        value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    e.target.value = value;
}

// Formata o Telefone: (00) 90000-0000
function formatTelefone(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length > 10) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    } else if (value.length > 0) {
        value = value.replace(/(\d{1,2})/, '($1');
    }
    e.target.value = value;
}

// Formata o CEP: 00000-000
function formatCEP(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) {
        value = value.substring(0, 8);
    }

    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    e.target.value = value;
}