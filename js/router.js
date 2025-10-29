import { initForm } from "./formHandler.js";
import { initModal, openModal } from "./modal.js";

const projectData = {
  oficinas: {
    id: "oficinas",
    title: "Oficinas de Culinária Consciente",
    badges: ["Educação", "Comunidade"],
    mediaEmbed:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ryk4MfwMA0k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    description:
      "A cada 15 dias, nossas oficinas transformam a relação das pessoas com a comida! Dividimos os participantes em dois grupos focados (controle de diabetes e perda de peso) e ensinamos receitas saudáveis, acessíveis e deliciosas. Exploramos os benefícios e malefícios dos ingredientes no corpo e, o mais importante, mostramos como aproveitar ao máximo o que você já tem em casa, como aveia, cascas e talos. Cozinhar de forma consciente nunca foi tão fácil!",
    highlights: [
      "<strong>Frequência:</strong> Oficinas quinzenais.",
      "<strong>Foco:</strong> Grupos para controle de diabetes e perda de peso.",
      "<strong>Aprendizado:</strong> Impacto dos ingredientes, receitas acessíveis e aproveitamento integral.",
      "<strong>Onde:</strong> Na nossa cozinha comunitária.",
    ],
    buttonText: "Quero Participar", // Botão ativo
    buttonLink: "/cadastro",
    buttonDisabled: false,
  },
  hortas: {
    id: "hortas",
    title: "Hortas Urbanas Comunitárias",
    badges: ["Sustentabilidade"],
    mediaEmbed:
      '<iframe width="444" height="789" src="https://www.youtube.com/embed/I8H7vA8pjy8" title="Curso Horta Comunitária" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    description:
      "Nossas hortas comunitárias são um verdadeiro sucesso entre os moradores! Recentemente, realizamos uma palestra sobre cultivo de alimentos orgânicos em hortas urbanas, reunindo cerca de 60 participantes. No evento, todos aprenderam sobre manejo do solo, formação de mudas, plantio e muito mais, fortalecendo a conexão da comunidade com o alimento saudável.",
    highlights: [
      "<strong>Impacto:</strong> Renda para famílias locais e alimento saudável.",
      "<strong>Metodologia:</strong> Cultivo orgânico com participação ativa dos moradores.",
      "<strong>Voluntariado:</strong> Mutirões aos sábados abertos a todos!",
    ],
    buttonText: "Seja um Voluntário", // Botão ativo
    buttonLink: "/cadastro",
    buttonDisabled: false,
  },
  formacao: {
    id: "formacao",
    title: "Formação de Cozinheiros - Alimentando Sonhos",
    badges: ["Capacitação"],
    mediaEmbed:
      '<iframe width="444" height="789" src="https://www.youtube.com/embed/Gkn3AiaZ08g" title="Curso gratuito de Culinária #shorts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    description:
      'A culinária transforma vidas! No Instituto Raiz, através da nossa iniciativa "Casa da Esperança", oferecemos cursos gratuitos como o "Alimentando Sonhos". Ouvir o depoimento inspirador de cada participante mostra que estamos no caminho certo, capacitando profissionais qualificados com foco em gastronomia social e aproveitamento integral.',
    highlights: [
      "<strong>Iniciativa:</strong> Casa da Esperança.",
      "<strong>Curso:</strong> Alimentando Sonhos (Gratuito).",
      "<strong>Foco:</strong> Capacitação profissional e transformação social.",
      "<strong>Status Atual:</strong> Turmas completas. Fique atento para a próxima seleção!",
    ],
    buttonText: "Turmas Fechadas", // Botão desabilitado
    buttonLink: "#",
    buttonDisabled: true, // Mantido desabilitado
  },
};

export class Router {
  constructor() {
    this.appRoot = document.getElementById("app-root");
    this.routes = {
      "/": "pages/home.html",
      "/projetos": "pages/projetos.html",
      "/cadastro": "pages/cadastro.html",
    };
  }
  init() {
    initModal();
    document.body.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-link]");
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute("href"));
      }
    });
    window.addEventListener("popstate", () => {
      this.loadContent(window.location.pathname, false);
    });
    this.loadContent(window.location.pathname, true);
  }
  navigate(url) {
    window.history.pushState(null, null, url);
    this.loadContent(url, false);
  }
  async loadContent(path, isInitialLoad) {
    const [pathOnly, hash] = path.split("#");
    const templateFile = this.routes[pathOnly] || this.routes["/"];
    try {
      const response = await fetch(templateFile);
      if (!response.ok)
        throw new Error(`Página ${templateFile} não encontrada`);
      const html = await response.text();
      this.appRoot.innerHTML = html;
      this.updateActiveLinks(pathOnly);
      if (pathOnly === "/cadastro") initForm();
      if (pathOnly === "/projetos") this.initProjectCardClicks();
      if (hash && projectData[hash]) openModal(projectData[hash]);
      else if (!isInitialLoad) window.scrollTo(0, 0);
    } catch (error) {
      console.error("Erro ao carregar:", error);
      this.appRoot.innerHTML = `<h1>Erro: ${error.message}</h1>`;
    }
  }
  initProjectCardClicks() {
    this.appRoot.querySelectorAll(".card[data-project-id]").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".btn.disabled")) return;
        const projectId = card.dataset.projectId;
        if (projectData[projectId]) openModal(projectData[projectId]);
      });
    });
  }
  updateActiveLinks(path) {
    document.querySelectorAll("nav a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === path);
    });
  }
}
