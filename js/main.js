document.addEventListener('DOMContentLoaded', function() {
    
    // Pega os botões do HTML
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    // Verifica se os elementos existem
    if (hamburgerBtn && mobileNav) {
        
        // Adiciona um evento de clique ao botão
        hamburgerBtn.addEventListener('click', function() {
            // Alterna (adiciona/remove) a classe 'active' no menu
            mobileNav.classList.toggle('active');
            
            // Pega o estado atual (se está ativo ou não)
            const isActive = mobileNav.classList.contains('active');
            
            // Atualiza o ARIA (para acessibilidade)
            hamburgerBtn.setAttribute('aria-expanded', isActive);
            
            // Troca o ícone (hambúrguer ou 'X')
            if (isActive) {
                hamburgerBtn.innerHTML = '&times;'; // Ícone de Fechar
            } else {
                hamburgerBtn.innerHTML = '&#9776;'; // Ícone de Hambúrguer
            }
        });
    }

});