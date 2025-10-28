let overlay = null;
let modal = null;
let closeBtn = null;

// 1. Pega os elementos do HTML e prepara o botão de fechar
export function initModal() {
    overlay = document.getElementById('project-modal-overlay');
    modal = document.getElementById('project-modal');
    closeBtn = document.getElementById('modal-close-btn');

    if (overlay && closeBtn) {
        // Fecha o modal se clicar no 'X'
        closeBtn.addEventListener('click', closeModal);
        // Fecha o modal se clicar fora dele (no overlay)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
    }
}

// 2. Função para ABRIR o modal e preencher com dados
export function openModal(project) {
    if (!overlay || !project) return;

    // Preenche os campos do modal com os dados do projeto
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-img').src = project.img;
    document.getElementById('modal-img').alt = project.title;
    document.getElementById('modal-badge').textContent = project.badge;
    document.getElementById('modal-description').textContent = project.description;
    
    // Mostra o modal
    overlay.classList.add('active');
}

// 3. Função para FECHAR o modal
function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('active');
}