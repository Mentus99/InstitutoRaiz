export function initNavigation() {
    
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburgerBtn && mobileNav) {
        
        hamburgerBtn.addEventListener('click', function() {
            const isActive = mobileNav.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isActive);
            
            if (isActive) {
                hamburgerBtn.innerHTML = '&times;';
            } else {
                hamburgerBtn.innerHTML = '&#9776;';
            }
        });
    }
    
    // Fecha o menu se eu clicar em um link
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.mobile-nav a')) {
             mobileNav.classList.remove('active');
             hamburgerBtn.setAttribute('aria-expanded', 'false');
             hamburgerBtn.innerHTML = '&#9776;';
        }
    });
}