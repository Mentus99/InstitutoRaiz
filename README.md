# Projeto Instituto Raiz (Plataforma ONG).

**Site ao Vivo:** [**https://institutoraiz.netlify.app**](https://institutoraiz.netlify.app)

Este projeto é uma plataforma web para o "Instituto Raiz", uma ONG fictícia de gastronomia social, desenvolvido como parte de um trabalho acadêmico de Front-End em 4 experiências práticas.

O site é uma **Single Page Application (SPA)** dinâmica, responsiva, **acessível (WCAG 2.1 AA)** e otimizada, construída inteiramente com HTML, CSS e JavaScript puros (Vanilla JS).

## Features (Funcionalidades)

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

## Processo de Desenvolvimento (Git/GitHub)

O projeto foi desenvolvido seguindo as 4 experiências práticas da disciplina, de forma incremental:
1.  **EP I:** Estrutura HTML semântica e formulários base com máscaras JS.
2.  **EP II:** Estilização com CSS (design system, responsividade, componentes visuais) e lógica inicial do menu mobile.
3.  **EP III:** Refatoração para Single Page Application (SPA), interatividade com JavaScript (modal) e validação de formulário.
4.  **EP IV:** Refinamento com acessibilidade (WCAG), otimização e documentação final.

O desenvolvimento foi realizado principalmente na branch `main`, utilizando **commits semânticos** para marcar a conclusão de cada etapa funcional, conforme solicitado na Atividade IV.

## Sobre Este Projeto

Este é um projeto acadêmico desenvolvido para a disciplina de Front-End, **sem fins lucrativos**. Todo o código e design foram criados por mim, **Gabriel Mendes**.

Sinta-se à vontade para explorar o código, usá-lo como referência ou entrar em contato caso tenha alguma dúvida ou sugestão sobre o projeto.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gabriel%20Mendes-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/gabriel-mendes2499/)

## Licença

Este projeto está licenciado sob a [**Licence MIT**](https://github.com/Mentus99/InstitutoRaiz/blob/main/LICENSE).
