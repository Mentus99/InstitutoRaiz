import { initNavigation } from './navigation.js';
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa o menu
    initNavigation();
    
    // 2. Inicializa o Roteador
    const router = new Router();
    router.init();
});