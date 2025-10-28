const themes = ["light", "dark", "high-contrast"];
let currentThemeIndex = 0;

export function initTheme() {
  const toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton) return;

  // Aplica o tema salvo ou padrão
  const savedTheme = localStorage.getItem("theme");
  let initialTheme = savedTheme || "light"; // Se não houver salvo, usa 'light'
  setTheme(initialTheme);

  // Lógica do clique
  toggleButton.addEventListener("click", () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const nextTheme = themes[currentThemeIndex];
    setTheme(nextTheme);
  });
}

// Função que aplica o tema
function setTheme(themeName) {
  document.body.setAttribute("data-theme", themeName);
  localStorage.setItem("theme", themeName);
  currentThemeIndex = themes.indexOf(themeName); // Atualiza o índice
}
