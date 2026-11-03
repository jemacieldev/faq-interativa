/**
 * faq-data.js
 * Conteúdo do FAQ: links dos botões e pares da trilha.
 * Fica separado da lógica (script.js) para que o conteúdo possa ser
 * atualizado sem mexer no funcionamento.
 *
 * Versão demonstrativa: a instituição, o programa e os cursos são fictícios,
 * e os links externos foram removidos.
 */

// ===== Links dos botões =====
// Na versão original, cada botão abre o vídeo de acesso, o quiz, o card de
// jornada e a comunidade. Nesta versão os links ficam vazios e o botão
// aparece marcado como "link a definir" (veja script.js).
const LINKS = {
  video: "",
  quiz: "",
  jornada: "",
  linkedin: "https://www.linkedin.com/",
  whatsapp: ""
};

// ===== Pares da trilha =====
// Cada par une um curso de IA na Prática a um curso de Habilidades Humanas.
// Formato: [tema, [curso IA, "instituição · carga horária", idioma],
//                 [curso Humanas, "instituição · carga horária", idioma], por que juntos]
// A carga horária ("6 h") é lida pela seção "Falta de tempo".
const PARES = [
  ["IA e aprendizagem", ["IA para Todos", "Instituto Exemplo · 6 h", "Em português"], ["Aprender a Aprender", "Escola Modelo · 16 h", "Em português"], "Aprender os fundamentos da IA enquanto desenvolve estratégias para estudar com autonomia."],
  ["IA generativa e produtividade", ["Introdução à IA Generativa", "Academia Horizonte · 10 h", "Legendas automáticas em PT-BR"], ["Gestão do Tempo e Produtividade", "Instituto Exemplo · 10 h", "Legendas em PT-BR"], "Explorar a IA generativa e organizar o próprio tempo para transformar ideias em entregas."],
  ["Prompts e pensamento criativo", ["Como Escrever Bons Prompts", "Escola Modelo · 19 h", "Legendas em PT-BR"], ["Pensamento Criativo: Técnicas e Ferramentas", "Academia Horizonte · 20 h", "Legendas em PT-BR"], "Combinar a elaboração de prompts com a criatividade aplicada à solução de problemas."],
  ["Ética e pensamento crítico", ["IA Generativa: Impactos e Ética", "Instituto Exemplo · 6 h", "Legendas automáticas em PT-BR"], ["Pensamento Crítico no Trabalho", "Escola Modelo · 9 h", "Legendas em PT-BR"], "Analisar os impactos da IA com pensamento crítico e avaliação de riscos."],
  ["Fundamentos da IA e comunicação", ["Como a IA Funciona", "Academia Horizonte · 13 h", "Legendas em PT-BR"], ["Habilidades Interpessoais", "Instituto Exemplo · 3 h", "Legendas em PT-BR"], "Conhecer a IA e fortalecer as relações e a comunicação interpessoal."],
  ["Modelos de linguagem e colaboração", ["Introdução aos Modelos de Linguagem", "Escola Modelo · 1 h", "Legendas automáticas em PT-BR"], ["Trabalho em Equipe e Comunicação", "Academia Horizonte · 10 h", "Legendas automáticas em PT-BR"], "Entender os modelos de linguagem e aprimorar a colaboração em equipe."],
  ["Experimentação e adaptabilidade", ["Laboratório de Ferramentas de IA", "Instituto Exemplo · 2 h", "Legendas automáticas em PT-BR"], ["Adaptabilidade e Resiliência", "Escola Modelo · 10 h", "Dublado em PT-BR (IA)"], "Experimentar ferramentas de IA com flexibilidade e resiliência."],
  ["Dados e inteligência emocional", ["IA Generativa para Análise de Dados", "Academia Horizonte · 10 h", "Legendas automáticas em PT-BR"], ["Inteligência Emocional e Social", "Instituto Exemplo · 12 h", "Dublado em PT-BR (IA)"], "Aplicar a análise de dados com atenção à inteligência emocional na atuação profissional."],
  ["IA responsável e ética aplicada", ["Introdução à IA Responsável", "Escola Modelo · 1 h", "Em português"], ["Ética, Tecnologia e Sociedade", "Academia Horizonte · 18 h", "Legendas automáticas em PT-BR"], "Relacionar os princípios de IA responsável a escolhas éticas no uso da tecnologia."],
  ["Geração de imagens e resolução de problemas", ["Introdução à Geração de Imagens", "Instituto Exemplo · 1 h", "Em português"], ["Resolução de Problemas e Tomada de Decisão", "Escola Modelo · 8 h", "Dublado em PT-BR (IA)"], "Explorar a geração de imagens e técnicas estruturadas de tomada de decisão."],
  ["Cultura de dados e liderança", ["Fundamentos de Dados", "Academia Horizonte · 10 h", "Dublado em PT-BR (IA)"], ["Liderança Conectada", "Instituto Exemplo · 30 h", "Legendas automáticas em PT-BR"], "Desenvolver o letramento em dados e competências de liderança conectada."],
  ["IA generativa e propósito", ["IA Generativa em 1 Hora", "Escola Modelo · 1 h", "Legendas automáticas em PT-BR"], ["Propósito nas Organizações", "Academia Horizonte · 9 h", "Legendas automáticas em PT-BR"], "Relacionar o uso da IA generativa ao propósito e aos impactos na organização."],
  ["IA e influência", ["Copiloto de IA para Painéis de Dados", "Instituto Exemplo · 2 h", "Legendas automáticas em PT-BR"], ["Influência e Persuasão", "Escola Modelo · 10 h", "Legendas automáticas em PT-BR"], "Usar ferramentas de análise e comunicação de dados com influência responsável."],
  ["Ferramentas de IA e talentos", ["IA Generativa na Nuvem", "Academia Horizonte · 50 h", "Legendas automáticas em PT-BR"], ["Gestão de Talentos", "Instituto Exemplo · 10 h", "Dublado em PT-BR (IA)"], "Experimentar ferramentas de IA e reconhecer a importância do desenvolvimento de talentos."],
  ["Tecnologia e bem-estar", ["Mapas e Dados Geográficos", "Escola Modelo · 11 h", "Legendas automáticas em PT-BR"], ["A Ciência do Bem-Estar", "Academia Horizonte · 13 h", "Dublado em PT-BR (IA)"], "Explorar tecnologias de análise espacial e refletir sobre escolhas ligadas ao bem-estar."]
];

// ===== Links dos cursos =====
// Na versão original, cada curso tem o link da plataforma, dentro do programa
// do aluno. Vazio = o botão "Abrir curso" não aparece.
const PROG = "";
const SLUG_IA = Array(PARES.length).fill("");
const SLUG_HUM = Array(PARES.length).fill("");
