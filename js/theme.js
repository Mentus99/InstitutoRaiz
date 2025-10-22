const themes = ['light', 'dark', 'high-contrast'];
let currentThemeIndex = 0;

export function initTheme() {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) return;

    // Verifica se o usuário já tem um tema salvo
    const savedTheme = localStorage.getItem('theme');
    
    let initialTheme = 'light'; // Padrão
    if (savedTheme) {
        initialTheme = savedTheme;
    } 
    
    setTheme(initialTheme);

    // Lógica do clique no botão
    toggleButton.addEventListener('click', () => {
        // Avança para o próximo tema (em loop)
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const nextTheme = themes[currentThemeIndex];
        setTheme(nextTheme);
    });
}

// Função que aplica o tema
function setTheme(themeName) {
    // 1. Seta o atributo 'data-theme' no <body>
    document.body.setAttribute('data-theme', themeName);
    
    // 2. Salva a preferência no computador do usuário
    localStorage.setItem('theme', themeName);
    
    // 3. Atualiza o índice
    currentThemeIndex = themes.indexOf(themeName);
}