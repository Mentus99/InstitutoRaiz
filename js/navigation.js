export function initNavigation() {
    const hamburgerBtn = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!hamburgerBtn || !mobileNav) return;

    hamburgerBtn.addEventListener('click', function() {
        const isActive = mobileNav.classList.toggle('active');
        hamburgerBtn.setAttribute('aria-expanded', isActive);
        hamburgerBtn.innerHTML = isActive ? '&times;' : '&#9776;';
    });

    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.mobile-nav a')) {
             mobileNav.classList.remove('active');
             hamburgerBtn.setAttribute('aria-expanded', 'false');
             hamburgerBtn.innerHTML = '&#9776;';
        }
    });
}