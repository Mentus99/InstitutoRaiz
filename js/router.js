import { initForm } from './formHandler.js';
import { initModal, openModal } from './modal.js';

// Informações dos nossos projetos (para o Modal)
const projectData = {
    'oficinas': {
        title: 'Oficinas de Culinária Consciente',
        img: 'https://via.placeholder.com/400x250.png?text=Vegetais+frescos',
        badge: 'Educação',
        description: 'Aqui vai uma descrição longa e detalhada sobre as oficinas. Ensinamos técnicas de aproveitamento integral (cascas, talos, sementes) para criar pratos nutritivos e deliciosos, reduzindo o desperdício doméstico e promovendo a segurança alimentar.'
    },
    'hortas': {
        title: 'Hortas Urbanas Comunitárias',
        img: 'https://via.placeholder.com/400x250.png?text=Horta+Urbana',
        badge: 'Sustentabilidade',
        description: 'Aqui vai a descrição das hortas. Incentivamos o plantio de alimentos em espaços ociosos da cidade, reconectando as pessoas com a origem da comida e garantindo temperos e hortaliças frescas para a comunidade.'
    },
    'formacao': {
        title: 'Formação de Cozinheiros',
        img: 'https://via.placeholder.com/400x250.png?text=Formação+de+Padeiro',
        badge: 'Capacitação',
        description: 'Descrição do projeto de formação. Capacitamos jovens e adultos em situação de vulnerabilidade para o mercado de trabalho da gastronomia, usando como base a culinária social e o combate ao desperdício.'
    }
};

export class Router {
    constructor() {
        this.appRoot = document.getElementById('app-root');
        // Nossa "tabela de tradução" de links para arquivos
        this.routes = {
            '/': 'pages/home.html',
            '/projetos': 'pages/projetos.html',
            '/cadastro': 'pages/cadastro.html'
        };
    }

    // Inicializa o roteador
    init() {
        // Inicializa o Modal (deixa ele pronto para ser aberto)
        initModal(projectData);
        
        // Ouve cliques em links que têm 'data-link'
        document.body.addEventListener('click', e => {
            const link = e.target.closest('a[data-link]');
            if (link) {
                e.preventDefault(); // Impede o recarregamento
                const url = link.getAttribute('href');
                this.navigate(url);
            }
        });

        // Ouve os botões "Voltar/Avançar" do navegador
        window.addEventListener('popstate', () => {
            this.loadContent(window.location.pathname, false);
        });

        // Carrega o conteúdo da página inicial
        this.loadContent(window.location.pathname, true);
    }

    // Navega para uma nova URL
    navigate(url) {
        // Atualiza a URL na barra do navegador
        window.history.pushState(null, null, url);
        // Carrega o conteúdo
        this.loadContent(url, false);
    }

    // Carrega o conteúdo da página
    async loadContent(path, isInitialLoad) {
        // Pega o caminho (ex: "/projetos") e o hash (ex: "#oficinas")
        const [pathOnly, hash] = path.split('#');
        
        const templateFile = this.routes[pathOnly] || this.routes['/'];

        try {
            const response = await fetch(templateFile);
            if (!response.ok) throw new Error('Página não encontrada');
            
            const html = await response.text();
            this.appRoot.innerHTML = html; // Injeta o HTML no <main>

            this.updateActiveLinks(pathOnly);
            
            // --- Lógica Pós-Carregamento ---
            
            // Se carregamos a página de cadastro
            if (pathOnly === '/cadastro') {
                initForm();
            }
            
            // Se carregamos a página de projetos
            if (pathOnly === '/projetos') {
                // Adiciona os "ouvintes" de clique nos cards
                this.initProjectCardClicks();
            }

            // Se o link tinha um hash (ex: #oficinas)
            if (hash) {
                // Abre o modal correspondente
                openModal(projectData[hash]);
            } else if (!isInitialLoad) {
                 window.scrollTo(0, 0); // Rola para o topo
            }

        } catch (error) {
            console.error('Erro ao carregar página:', error);
            this.appRoot.innerHTML = '<h1>Erro 404: Página não encontrada</h1>';
        }
    }
    
    // Adiciona o clique nos cards da página de projetos
    initProjectCardClicks() {
        this.appRoot.querySelectorAll('.card[data-project-id]').forEach(card => {
            // Se o clique não foi no botão "desabilitado"
            if (!card.querySelector('.btn.disabled')) {
                card.addEventListener('click', (e) => {
                    const projectId = card.dataset.projectId;
                    openModal(projectData[projectId]);
                });
            }
        });
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