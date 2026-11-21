// Navegação mobile
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});
mainNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

// Ano automático no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Cards Mito ou Verdade: clique para abrir/fechar
document.querySelectorAll(".myth-card").forEach(card => {
  card.addEventListener("click", () => {
    const open = card.classList.toggle("is-open");
    card.setAttribute("aria-expanded", String(open));
  });
});

// Quiz educativo
const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");
quizForm?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(quizForm);
  const answers = [1, 2, 3, 4].map(n => data.get(`q${n}`));
  const yes = answers.filter(value => value === "sim").length;
  const unsure = answers.filter(value => value === "naosei").length;

  let title, message;
  if (yes > 0) {
    title = "Atenção: há situações que merecem ser verificadas.";
    message = `Você marcou “Sim” em ${yes} pergunta(s). Isso não determina, por si só, que houve uma infração, mas indica pontos que merecem informação e, se necessário, orientação profissional.`;
  } else if (unsure > 0) {
    title = "Continue se informando sobre seus direitos.";
    message = `Você indicou dúvida em ${unsure} pergunta(s). Consulte os materiais do site e os canais oficiais para compreender melhor cada situação.`;
  } else {
    title = "Suas respostas não apontaram alertas nas situações avaliadas.";
    message = "Continue conhecendo seus direitos. Este questionário é apenas educativo e não substitui uma análise individual das condições de trabalho.";
  }
  quizResult.innerHTML = `<h4>${title}</h4><p>${message}</p>`;
  quizResult.hidden = false;
  quizResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

// Checklist de rescisão: progresso local, sem envio a servidor
const checklist = document.getElementById("rescisaoChecklist");
const checkboxes = [...checklist.querySelectorAll('input[type="checkbox"]')];
const checkCount = document.getElementById("checkCount");
const progressBar = document.getElementById("progressBar");
function updateChecklist() {
  const checked = checkboxes.filter(item => item.checked).length;
  checkCount.textContent = `${checked} de ${checkboxes.length} itens conferidos`;
  progressBar.style.width = `${(checked / checkboxes.length) * 100}%`;
}
checkboxes.forEach(item => item.addEventListener("change", updateChecklist));
document.getElementById("resetChecklist").addEventListener("click", () => {
  checkboxes.forEach(item => item.checked = false);
  updateChecklist();
});

// Pilares do ambiente saudável: abrir e fechar cada cartão
const pillarCards = document.querySelectorAll('.pillar-card');
pillarCards.forEach(card => {
  card.addEventListener('click', () => {
    const isOpen = card.getAttribute('aria-expanded') === 'true';
    card.setAttribute('aria-expanded', String(!isOpen));
    const hint = card.querySelector('small');
    if (hint) hint.textContent = isOpen ? 'Toque para explorar +' : 'Toque para recolher −';
  });
});

// Termômetro educativo do ambiente de trabalho
const climateForm = document.getElementById('climateForm');
const climateResult = document.getElementById('climateResult');
climateForm?.addEventListener('submit', event => {
  event.preventDefault();
  const values = [1, 2, 3, 4].map(n => Number(new FormData(climateForm).get(`c${n}`)));
  const total = values.reduce((sum, value) => sum + value, 0);
  let title, message;
  if (total <= 7) {
    title = 'Há pontos importantes que precisam de atenção.';
    message = 'As respostas indicam que respeito, comunicação, segurança ou participação podem estar frágeis. Priorize a escuta, identifique riscos e procure apoio confiável. Uma pontuação baixa não deve ser ignorada.';
  } else if (total <= 12) {
    title = 'Existem práticas positivas, mas há espaço para melhorar.';
    message = 'Vale conversar sobre os pontos que receberam avaliações menores e construir ações com participação da equipe. Melhorias consistentes precisam de acompanhamento.';
  } else {
    title = 'As respostas apontam práticas favoráveis.';
    message = 'É positivo perceber respeito, comunicação e prevenção. Mantenha essas práticas, acompanhe os resultados e continue ouvindo as pessoas. A pontuação não garante que todos os problemas estejam resolvidos.';
  }
  climateResult.replaceChildren();
  const heading = document.createElement('h4');
  const paragraph = document.createElement('p');
  heading.textContent = title;
  paragraph.textContent = `${message} Resultado da reflexão: ${total} de 16 pontos.`;
  climateResult.append(heading, paragraph);
  climateResult.hidden = false;
  climateResult.scrollIntoView({behavior: 'smooth', block: 'nearest'});
});

// Gerador de ideias para um plano de melhoria: conteúdo educativo local
const actionIdeas = {
  communication: {title:'Melhorar a comunicação',items:['Criar momentos breves e regulares para alinhamento de prioridades.','Definir um canal acessível para dúvidas e sugestões.','Registrar decisões e mudanças importantes em linguagem clara.','Pedir retorno à equipe para verificar se as informações chegaram a todos.']},
  respect: {title:'Fortalecer o respeito nas relações',items:['Construir combinados de convivência com participação da equipe.','Preparar lideranças para feedback privado, objetivo e respeitoso.','Divulgar canais de acolhimento e formas seguras de relatar situações.','Apurar relatos com imparcialidade, confidencialidade e proteção contra retaliação.']},
  overload: {title:'Prevenir sobrecarga',items:['Mapear tarefas, prazos e prioridades reais.','Rever a distribuição de atividades e os recursos disponíveis.','Respeitar jornadas, intervalos e períodos de descanso.','Manter conversas periódicas sobre carga de trabalho e fatores de risco.']},
  inclusion: {title:'Promover inclusão',items:['Identificar barreiras físicas, digitais e de comunicação.','Ouvir as pessoas diretamente afetadas sobre adaptações necessárias.','Usar critérios transparentes em recrutamento, avaliação e desenvolvimento.','Prevenir discriminação e acompanhar se todos conseguem participar.']},
  recognition: {title:'Valorizar contribuições',items:['Definir critérios claros para reconhecimento e oportunidades.','Oferecer feedback específico, respeitoso e construtivo.','Criar oportunidades de aprendizagem e desenvolvimento.','Reconhecer resultados coletivos e individuais sem estimular competição prejudicial.']},
  safety: {title:'Reforçar saúde e segurança',items:['Ouvir os trabalhadores sobre riscos presentes nas atividades.','Solicitar avaliação dos riscos aos profissionais responsáveis.','Verificar treinamento, equipamentos e condições ergonômicas adequadas.','Acompanhar as medidas preventivas e corrigir problemas identificados.']}
};
const buildAction = document.getElementById('buildAction');
const actionTopic = document.getElementById('actionTopic');
const actionResult = document.getElementById('actionResult');
buildAction?.addEventListener('click', () => {
  const idea = actionIdeas[actionTopic.value];
  if (!idea || !actionResult) return;
  actionResult.replaceChildren();
  const heading = document.createElement('b');
  heading.textContent = idea.title;
  const intro = document.createElement('p');
  intro.textContent = 'Sugestões para discutir e adaptar à realidade da organização:';
  const list = document.createElement('ul');
  idea.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.append(li);
  });
  actionResult.append(heading, intro, list);
});
