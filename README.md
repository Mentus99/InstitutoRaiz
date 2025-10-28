# Projeto Instituto Raiz (Plataforma ONG)

Este projeto é uma plataforma web para o "Instituto Raiz", uma ONG fictícia de gastronomia social, desenvolvido como parte de um trabalho acadêmico de Front-End em 4 experiências práticas.

O site é uma **Single Page Application (SPA)** dinâmica, responsiva, **acessível (WCAG 2.1 AA)** e otimizada, construída inteiramente com HTML, CSS e JavaScript puros (Vanilla JS).

## Features 

* **Identidade Visual "Instituto Raiz":** Foco em gastronomia, sustentabilidade e comunidade.
* **UI Moderna:** Design sólido e limpo, com fontes (Poppins, Lato), sombras elegantes e animações suaves nos cards.
* **Single Page Application (SPA):** Navegação dinâmica sem recarregamento (Vanilla JS + History API).
* **Design Responsivo:** Layout Mobile-First adaptável a todas as telas (desktops, tablets, smartphones).
* **Acessibilidade (WCAG 2.1 AA):**
    * Suporte completo a navegação por teclado.
    * Semântica de HTML5 e ARIA para leitores de tela.
    * Validação de formulário acessível.
    * **Múltiplos Temas:** Seletor para Modo Claro (padrão), Modo Escuro e Alto Contraste, com preferência salva no `localStorage`.
* **Componente Modal Interativo:** Popup com detalhes dos projetos (imagens/vídeos, descrição detalhada, destaques), ativado pelos cards ou submenu, com scroll interno e indicador visual.
* **Validação de Formulário:** Verificação de campos no lado do cliente (campos obrigatórios, formato de email, patterns de CPF/CEP) com feedback visual claro e acessível (mensagens de erro).
* **Máscaras de Input:** Formatação automática em tempo real para CPF, CEP e Telefone no formulário.
* **Otimização:** CSS minificado (`style.min.css`) e imagens comprimidas para carregamento mais rápido.
* **"Banco de Dados Fake":** O formulário de cadastro salva os dados no `localStorage` do navegador para simular persistência.

## Stack de Tecnologias

* **HTML5:** Estrutura semântica (`<header>`, `<main>`, `<article>`, `<nav>`, `<fieldset>`, etc.).
* **CSS3:** Estilização avançada com Flexbox, Grid Layout (para estrutura principal), Variáveis CSS (para temas e design system), Media Queries (para responsividade), pseudo-elementos (`::after` para indicador de scroll).
* **JavaScript (ES6+):** Manipulação do DOM, modularização (ESM `import`/`export`), roteamento (SPA com History API), lógica de UI (Modal, Validação, Temas), `localStorage`.
