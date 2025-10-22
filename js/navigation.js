// Exporta a função para o app.js
export function initNavigation() {
    
    // Pega os botões do HTML
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburgerBtn && mobileNav) {
        
        // Lógica do clique no botão hambúrguer
        hamburgerBtn.addEventListener('click', () => {
            // Adiciona ou remove a classe 'active'
            const isActive = mobileNav.classList.toggle('active');
            
            // Atualiza o ARIA (para acessibilidade)
            hamburgerBtn.setAttribute('aria-expanded', isActive);
            
            // Troca o ícone (hambúrguer ou 'X')
            if (isActive) {
                hamburgerBtn.innerHTML = '&times;'; 
            } else {
                hamburgerBtn.innerHTML = '&#9776;'; 
            }
        });
    }

    // Fecha o menu mobile se eu clicar em um link dentro dele
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.mobile-nav a')) {
             mobileNav.classList.remove('active');
             hamburgerBtn.setAttribute('aria-expanded', 'false');
             hamburgerBtn.innerHTML = '&#9776;';
        }
    });
}