// Importa o inicializador do formulário
import { initForm } from './formHandler.js';

export class Router {
    constructor() {
        // Onde o conteúdo vai ser carregado
        this.appRoot = document.getElementById('app-root');
        
        // Minhas rotas (caminho da URL -> arquivo HTML)
        this.routes = {
            '/': 'pages/home.html',
            '/projetos': 'pages/projetos.html',
            '/cadastro': 'pages/cadastro.html'
        };

        this.navLinks = document.querySelectorAll('a[data-link]');
    }

    // Inicializa o roteador
    init() {
        // Ouve cliques em links que têm 'data-link'
        document.body.addEventListener('click', e => {
            const link = e.target.closest('a[data-link]');
            if (link) {
                e.preventDefault(); // Previne o recarregamento da página
                const url = link.getAttribute('href');
                this.navigate(url);
            }
        });

        // Ouve os botões de "Voltar" e "Avançar" do navegador
        window.addEventListener('popstate', () => {
            this.loadContent(window.location.pathname);
        });

        // Carrega o conteúdo da página atual (quando entra no site)
        this.loadContent(window.location.pathname);
    }

    // Navega para uma nova URL
    navigate(url) {
        // Atualiza a URL na barra do navegador
        window.history.pushState(null, null, url);
        // Carrega o conteúdo
        this.loadContent(url);
    }

    // Carrega o conteúdo do template HTML
    async loadContent(path) {
        const pathOnly = path.split('#')[0];
        
        // Acha o arquivo HTML correspondente
        const templateFile = this.routes[pathOnly] || this.routes['/']; // Se não achar, vai pra home

        try {
            // Busca o arquivo HTML
            const response = await fetch(templateFile);
            if (!response.ok) throw new Error('Página não encontrada');
            
            const html = await response.text();
            
            // Injeta o HTML dentro do <main>
            this.appRoot.innerHTML = html;

            this.updateActiveLinks(pathOnly);

            // IMPORTANTE: Se a página carregada for a de cadastro...
            if (pathOnly === '/cadastro') {
                // ...eu preciso inicializar o JavaScript do formulário!
                initForm();
            }
            
            // Rola para a âncora (ex: /projetos#hortas)
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                 window.scrollTo(0, 0); // Rola para o topo
            }

        } catch (error) {
            console.error('Erro ao carregar página:', error);
            this.appRoot.innerHTML = '<h1>Erro 404: Página não encontrada</h1>';
        }
    }

    // Atualiza qual link está 'ativo' no menu
    updateActiveLinks(path) {
        document.querySelectorAll('nav a').forEach(a => {
            if (a.getAttribute('href') === path) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }
}