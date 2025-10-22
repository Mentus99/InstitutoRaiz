

import { initNavigation } from './navigation.js';
import { Router } from './router.js';
import { initTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o menu
    initNavigation();
    
    // Inicializa o botão de trocar tema
    initTheme(); 
    
    // Inicializa o roteador (sistema da SPA)
    const router = new Router();
    router.init();
});