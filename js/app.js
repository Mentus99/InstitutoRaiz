import { initNavigation } from './navigation.js';
import { Router } from './router.js';
// import { initTheme } from './theme.js'; // Descomentar na Atividade 4

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    // initTheme(); // Descomentar na Atividade 4
    const router = new Router();
    router.init();
});