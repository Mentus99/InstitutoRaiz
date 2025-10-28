let overlay, modal, closeBtn, registerLink, modalMedia, modalTitle, modalBadge, modalDescription, modalHighlights;

export function initModal() {
    overlay = document.getElementById('project-modal-overlay');
    modal = document.getElementById('project-modal');
    closeBtn = document.getElementById('modal-close-btn');
    registerLink = document.getElementById('modal-register-link');
    modalMedia = document.getElementById('modal-media');
    modalTitle = document.getElementById('modal-title');
    modalBadge = document.getElementById('modal-badge');
    modalDescription = document.getElementById('modal-description');
    modalHighlights = document.getElementById('modal-highlights');

    if (overlay && closeBtn && registerLink) {
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
        // O listener do registerLink é adicionado dinamicamente em openModal
    }
}

export function openModal(project) {
    if (!overlay || !project || !registerLink) return;

    modalMedia.innerHTML = project.mediaEmbed || '';
    modalTitle.textContent = project.title || '';
    modalBadge.textContent = project.badge || '';
    modalDescription.textContent = project.description || '';
    modalHighlights.innerHTML = ''; // Limpa destaques antigos
    if (project.highlights && Array.isArray(project.highlights)) {
        project.highlights.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item;
            modalHighlights.appendChild(li);
        });
    }

    registerLink.textContent = project.buttonText || 'Saiba Mais';
    registerLink.href = project.buttonLink || '#';

    // Remove listener antigo para evitar duplicação
    registerLink.removeEventListener('click', closeModal);

    if (project.buttonDisabled) {
        registerLink.classList.add('disabled');
        registerLink.removeAttribute('data-link');
        registerLink.setAttribute('aria-disabled', 'true');
    } else {
        registerLink.classList.remove('disabled');
        registerLink.setAttribute('data-link', ''); // Garante que o router pegue
        registerLink.removeAttribute('aria-disabled');
        // Adiciona listener para fechar SÓ se o botão NÃO estiver desabilitado
        registerLink.addEventListener('click', closeModal, { once: true });
    }

    overlay.classList.add('active');
}

function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('active');
    const iframe = modalMedia.querySelector('iframe');
    if (iframe) iframe.src = iframe.src;
}