/*
 * Quiz Voepet — Dados e Lógica (Versão com Ramificação)
 * Pergunta 1 separa em dois caminhos:
 *   - Caminho A: Veterinários / Empresários → Mentoria Vet Sem Fronteiras (high ticket)
 *   - Caminho B: Tutores de pets → E-books
 */

// ─── Types ───────────────────────────────────────────────────

export type Audience = 'profissional' | 'tutor';
export type PetCategory = 'transporte' | 'comportamento' | 'saude' | 'alergia' | 'nutricional';
export type ProCategory = 'empreendedor' | 'transicao' | 'explorador';
export type LeadTemp = 'quente' | 'morno' | 'frio';
export type QuestionBadge = 'perfil' | 'dores' | 'prioridade' | 'investimento' | 'negocio';

export interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  /** For tutor path */
  petScores?: Partial<Record<PetCategory, number>>;
  /** For professional path */
  proScores?: Partial<Record<ProCategory, number>>;
  leadTemp?: LeadTemp;
  /** If selecting this option routes to a specific audience */
  audience?: Audience;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  badge: QuestionBadge;
  options: QuizOption[];
  layout: 'cards' | 'list';
  /** Which audience sees this question. 'all' = everyone (question 1) */
  audience: 'all' | Audience;
}

export interface QuizResult {
  id: string;
  audience: Audience;
  title: string;
  emoji: string;
  description: string;
  diagnosticTitle: string;
  diagnosticPoints: string[];
  offerLabel: string;
  offerTitle: string;
  offerDescription: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  color: 'sage' | 'terracotta' | 'teal';
}

export interface LeadData {
  name: string;
  email: string;
  whatsapp: string;
  countryCode: string;
}

// ─── Badge Config ────────────────────────────────────────────

export const BADGE_CONFIG: Record<QuestionBadge, { label: string; color: string }> = {
  perfil: { label: 'PERFIL', color: 'bg-sage/15 text-sage-dark border-sage/30' },
  dores: { label: 'DORES', color: 'bg-terracotta/10 text-terracotta border-terracotta/30' },
  prioridade: { label: 'PRIORIDADE', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  investimento: { label: 'INVESTIMENTO', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
  negocio: { label: 'NEGÓCIO', color: 'bg-sky-50 text-sky-700 border-sky-300' },
};

// ─── Questions ───────────────────────────────────────────────

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ═══════════════════════════════════════════════════════════
  // PERGUNTA 1 — Separação de público (todos veem)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'q1',
    question: 'Quem é você no universo pet?',
    subtitle: 'Isso define o seu diagnóstico personalizado',
    badge: 'perfil',
    layout: 'cards',
    audience: 'all',
    options: [
      {
        id: 'q1-vet',
        emoji: '🩺',
        text: 'Sou médico(a) veterinário(a)',
        audience: 'profissional',
        proScores: { empreendedor: 1 },
      },
      {
        id: 'q1-emp',
        emoji: '💼',
        text: 'Sou empresário(a) do setor pet',
        audience: 'profissional',
        proScores: { empreendedor: 1 },
      },
      {
        id: 'q1-tutor',
        emoji: '🐾',
        text: 'Sou tutor(a) de pet',
        audience: 'tutor',
        petScores: { comportamento: 1, saude: 1 },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CAMINHO A — Profissionais (5 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'pa2',
    question: 'Qual é a sua situação profissional hoje?',
    subtitle: 'Entender onde você está nos ajuda a direcionar melhor',
    badge: 'perfil',
    layout: 'list',
    audience: 'profissional',
    options: [
      {
        id: 'pa2-a',
        emoji: '🏥',
        text: 'Trabalho em clínica/hospital como CLT',
        proScores: { transicao: 2 },
      },
      {
        id: 'pa2-b',
        emoji: '🏢',
        text: 'Tenho meu próprio negócio (clínica, pet shop, etc.)',
        proScores: { empreendedor: 3 },
      },
      {
        id: 'pa2-c',
        emoji: '🎒',
        text: 'Sou autônomo(a) / freelancer',
        proScores: { transicao: 2, empreendedor: 1 },
      },
      {
        id: 'pa2-d',
        emoji: '🌱',
        text: 'Estou começando na área',
        proScores: { explorador: 3 },
      },
    ],
  },
  {
    id: 'pa3',
    question: 'Qual é o maior gargalo do seu negócio ou carreira hoje?',
    subtitle: 'Seja honesto(a) — isso define seu diagnóstico',
    badge: 'dores',
    layout: 'list',
    audience: 'profissional',
    options: [
      {
        id: 'pa3-a',
        emoji: '💸',
        text: 'Faturamento baixo ou instável — trabalho muito e ganho pouco',
        proScores: { empreendedor: 2 },
      },
      {
        id: 'pa3-b',
        emoji: '🔄',
        text: 'Não consigo escalar — faço tudo sozinho(a)',
        proScores: { empreendedor: 2, transicao: 1 },
      },
      {
        id: 'pa3-c',
        emoji: '🏷️',
        text: 'Não sei precificar meus serviços corretamente',
        proScores: { transicao: 2 },
      },
      {
        id: 'pa3-d',
        emoji: '📉',
        text: 'Falta de clientes ou dificuldade em atrair novos',
        proScores: { empreendedor: 1, transicao: 1 },
      },
      {
        id: 'pa3-e',
        emoji: '🚀',
        text: 'Quero diversificar receita mas não sei como',
        proScores: { empreendedor: 2, explorador: 1 },
      },
    ],
  },
  {
    id: 'pa4',
    question: 'Você já considerou o transporte de animais como fonte de receita?',
    subtitle: 'O mercado de transporte pet cresce mais de 20% ao ano',
    badge: 'negocio',
    layout: 'list',
    audience: 'profissional',
    options: [
      {
        id: 'pa4-a',
        emoji: '✈️',
        text: 'Sim, mas não sei como começar',
        proScores: { empreendedor: 2, explorador: 1 },
        leadTemp: 'quente',
      },
      {
        id: 'pa4-b',
        emoji: '🤔',
        text: 'Nunca pensei nisso, mas tenho interesse',
        proScores: { explorador: 2 },
        leadTemp: 'morno',
      },
      {
        id: 'pa4-c',
        emoji: '🛫',
        text: 'Já trabalho com isso, mas quero profissionalizar',
        proScores: { empreendedor: 3 },
        leadTemp: 'quente',
      },
      {
        id: 'pa4-d',
        emoji: '❌',
        text: 'Não me interessa no momento',
        proScores: { transicao: 1 },
        leadTemp: 'frio',
      },
    ],
  },
  {
    id: 'pa5',
    question: 'Se pudesse resolver UMA coisa no seu negócio agora, o que seria?',
    subtitle: 'A sua prioridade número 1',
    badge: 'prioridade',
    layout: 'list',
    audience: 'profissional',
    options: [
      {
        id: 'pa5-a',
        emoji: '📈',
        text: 'Aumentar meu faturamento de forma previsível',
        proScores: { empreendedor: 2 },
      },
      {
        id: 'pa5-b',
        emoji: '⚙️',
        text: 'Ter um método para escalar sem depender só de mim',
        proScores: { empreendedor: 2, transicao: 1 },
      },
      {
        id: 'pa5-c',
        emoji: '✈️',
        text: 'Aprender a monetizar com transporte de animais',
        proScores: { empreendedor: 2, explorador: 1 },
      },
      {
        id: 'pa5-d',
        emoji: '🎯',
        text: 'Ter mentoria de alguém que já fez isso na prática',
        proScores: { empreendedor: 3 },
        leadTemp: 'quente',
      },
    ],
  },
  {
    id: 'pa6',
    question: 'Você estaria disposto(a) a investir em uma mentoria com acompanhamento para transformar seu negócio?',
    subtitle: 'Conteúdo exclusivo da Dra. Wendi — veterinária e empresária',
    badge: 'investimento',
    layout: 'list',
    audience: 'profissional',
    options: [
      {
        id: 'pa6-a',
        emoji: '🚀',
        text: 'Sim, estou pronto(a) para investir no meu crescimento',
        proScores: {},
        leadTemp: 'quente',
      },
      {
        id: 'pa6-b',
        emoji: '💭',
        text: 'Depende do formato e do investimento',
        proScores: {},
        leadTemp: 'morno',
      },
      {
        id: 'pa6-c',
        emoji: '🌱',
        text: 'Prefiro conteúdo gratuito por enquanto',
        proScores: {},
        leadTemp: 'frio',
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // CAMINHO B — Tutores de Pets (6 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: 'pb2',
    question: 'Qual é a sua maior preocupação com o seu pet hoje?',
    subtitle: 'Escolha a que mais se aproxima da sua realidade',
    badge: 'dores',
    layout: 'list',
    audience: 'tutor',
    options: [
      {
        id: 'pb2-a',
        emoji: '✈️',
        text: 'Preciso viajar e não sei como transportar meu pet com segurança',
        petScores: { transporte: 3 },
      },
      {
        id: 'pb2-b',
        emoji: '🐕',
        text: 'Meu pet tem comportamentos que me preocupam (latir demais, destruir coisas, ansiedade)',
        petScores: { comportamento: 3 },
      },
      {
        id: 'pb2-c',
        emoji: '💊',
        text: 'Percebo que meu pet pode estar sentindo dor ou desconforto',
        petScores: { saude: 3 },
      },
      {
        id: 'pb2-d',
        emoji: '🌿',
        text: 'Meu pet vive se coçando, com pele irritada ou problemas recorrentes',
        petScores: { alergia: 3 },
      },
      {
        id: 'pb2-e',
        emoji: '🥗',
        text: 'Tenho dúvidas sobre a alimentação ideal para meu pet',
        petScores: { nutricional: 3 },
      },
    ],
  },
  {
    id: 'pb3',
    question: 'Nos últimos meses, o que mais te tirou o sono em relação ao seu pet?',
    subtitle: 'Aquilo que realmente te preocupou',
    badge: 'dores',
    layout: 'list',
    audience: 'tutor',
    options: [
      {
        id: 'pb3-a',
        emoji: '🧳',
        text: 'Uma viagem que precisei fazer e não sabia como levar ele',
        petScores: { transporte: 2 },
      },
      {
        id: 'pb3-b',
        emoji: '😤',
        text: 'Comportamento agressivo, medo de barulhos ou destruição',
        petScores: { comportamento: 2 },
      },
      {
        id: 'pb3-c',
        emoji: '😢',
        text: 'Ele pareceu sentir dor, chorou ou mudou de comportamento de repente',
        petScores: { saude: 2 },
      },
      {
        id: 'pb3-d',
        emoji: '🤧',
        text: 'Crises alérgicas, otites de repetição ou problemas de pele',
        petScores: { alergia: 2 },
      },
      {
        id: 'pb3-e',
        emoji: '🍽️',
        text: 'Dúvidas sobre alimentação natural, ração ou suplementos',
        petScores: { nutricional: 2 },
      },
    ],
  },
  {
    id: 'pb4',
    question: 'Você já buscou informação sobre esse assunto antes?',
    subtitle: 'Não existe resposta certa.',
    badge: 'perfil',
    layout: 'list',
    audience: 'tutor',
    options: [
      {
        id: 'pb4-a',
        emoji: '🔍',
        text: 'Sim, mas encontrei muita informação confusa na internet',
        petScores: { transporte: 1, comportamento: 1, saude: 1, alergia: 1, nutricional: 1 },
      },
      {
        id: 'pb4-b',
        emoji: '💡',
        text: 'Nunca busquei, mas sinto que preciso',
        petScores: { transporte: 1, comportamento: 1, saude: 1, alergia: 1, nutricional: 1 },
      },
      {
        id: 'pb4-c',
        emoji: '🩺',
        text: 'Já consultei um veterinário, mas quero entender mais por conta própria',
        petScores: { transporte: 1, comportamento: 1, saude: 1, alergia: 1, nutricional: 1 },
      },
      {
        id: 'pb4-d',
        emoji: '📚',
        text: 'Já comprei cursos ou materiais sobre pets',
        petScores: { transporte: 1, comportamento: 1, saude: 1, alergia: 1, nutricional: 1 },
        leadTemp: 'quente',
      },
    ],
  },
  {
    id: 'pb5',
    question: 'Qual o porte do seu pet?',
    subtitle: 'Isso nos ajuda a personalizar sua recomendação',
    badge: 'perfil',
    layout: 'cards',
    audience: 'tutor',
    options: [
      {
        id: 'pb5-a',
        emoji: '🐕',
        text: 'Pequeno (até 10 kg)',
        petScores: { transporte: 1, alergia: 1 },
      },
      {
        id: 'pb5-b',
        emoji: '🦮',
        text: 'Médio (10 a 25 kg)',
        petScores: { comportamento: 1, nutricional: 1 },
      },
      {
        id: 'pb5-c',
        emoji: '🐕‍🦺',
        text: 'Grande (acima de 25 kg)',
        petScores: { saude: 1, transporte: 1 },
      },
      {
        id: 'pb5-d',
        emoji: '🐈',
        text: 'Tenho gato',
        petScores: { transporte: 1, alergia: 1 },
      },
    ],
  },
  {
    id: 'pb6',
    question: 'Se pudesse resolver UMA coisa agora, o que seria?',
    subtitle: 'A sua prioridade número 1',
    badge: 'prioridade',
    layout: 'list',
    audience: 'tutor',
    options: [
      {
        id: 'pb6-a',
        emoji: '✈️',
        text: 'Conseguir transportar meu pet com tranquilidade em viagens',
        petScores: { transporte: 3 },
      },
      {
        id: 'pb6-b',
        emoji: '🧠',
        text: 'Entender por que meu pet age de determinada forma',
        petScores: { comportamento: 3 },
      },
      {
        id: 'pb6-c',
        emoji: '🩹',
        text: 'Saber se meu pet está com dor e o que fazer',
        petScores: { saude: 3 },
      },
      {
        id: 'pb6-d',
        emoji: '🌿',
        text: 'Acabar com as alergias e coceiras do meu pet',
        petScores: { alergia: 3 },
      },
      {
        id: 'pb6-e',
        emoji: '🥗',
        text: 'Dar a melhor alimentação possível para meu pet',
        petScores: { nutricional: 3 },
      },
    ],
  },
  {
    id: 'pb7',
    question: 'Se encontrasse um material prático e direto, feito por uma veterinária com +20 anos de experiência, investiria no cuidado do seu pet?',
    subtitle: 'Conteúdo exclusivo da Dra. Wendi',
    badge: 'investimento',
    layout: 'list',
    audience: 'tutor',
    options: [
      {
        id: 'pb7-a',
        emoji: '🚀',
        text: 'Sim, estou pronto! Quero algo confiável e direto ao ponto',
        petScores: {},
        leadTemp: 'quente',
      },
      {
        id: 'pb7-b',
        emoji: '💭',
        text: 'Depende do valor e do conteúdo',
        petScores: {},
        leadTemp: 'morno',
      },
      {
        id: 'pb7-c',
        emoji: '🌱',
        text: 'Prefiro conteúdo gratuito por enquanto',
        petScores: {},
        leadTemp: 'frio',
      },
    ],
  },
];

// ─── Helper: get questions for a given audience ──────────────

export function getQuestionsForAudience(audience: Audience): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(
    (q) => q.audience === 'all' || q.audience === audience
  );
}

// ─── Results ─────────────────────────────────────────────────

export const TUTOR_RESULTS: Record<PetCategory, QuizResult> = {
  transporte: {
    id: 'tutor-transporte',
    audience: 'tutor',
    title: 'Tutor Viajante',
    emoji: '✈️',
    description:
      'Você é um tutor que ama viajar e quer levar seu pet junto com segurança! Transportar um animal exige planejamento, documentação e cuidados específicos que muitos tutores desconhecem. A boa notícia é que existe um caminho seguro e tranquilo para isso.',
    diagnosticTitle: 'Seu diagnóstico aponta para:',
    diagnosticPoints: [
      'Necessidade de informação sobre documentação e regras de transporte',
      'Insegurança sobre caixas de transporte e companhias aéreas',
      'Preocupação com o bem-estar do pet durante viagens',
    ],
    offerLabel: 'Recomendação para você',
    offerTitle: 'Guia Completo de Transporte Seguro para Pets',
    offerDescription:
      'Tudo o que você precisa saber sobre documentação, caixas de transporte, companhias aéreas, sedação, e como preparar seu pet para viajar sem estresse. Escrito pela Dra. Wendi, que transporta animais profissionalmente há anos.',
    ctaText: 'Quero Meu Guia de Transporte!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-transporte-dRTC2dUrFRixhCPAiJ7DEV.webp',
    color: 'sage',
  },
  comportamento: {
    id: 'tutor-comportamento',
    audience: 'tutor',
    title: 'Tutor Observador',
    emoji: '🐾',
    description:
      'Você percebe que o comportamento do seu pet não está normal e quer entender o que está por trás disso. Ansiedade, agressividade, medo e destruição são sinais que precisam ser interpretados — e não punidos.',
    diagnosticTitle: 'Seu diagnóstico aponta para:',
    diagnosticPoints: [
      'Necessidade de entender a linguagem comportamental do seu pet',
      'Dificuldade em lidar com ansiedade de separação ou agressividade',
      'Busca por orientação profissional sobre manejo comportamental',
    ],
    offerLabel: 'Recomendação para você',
    offerTitle: 'Entendendo o Comportamento do Seu Cão',
    offerDescription:
      'Um guia prático para decodificar os sinais do seu pet: por que ele late, destrói, tem medo ou fica ansioso. Com orientações da Dra. Wendi para melhorar a convivência e o bem-estar do seu companheiro.',
    ctaText: 'Quero Entender Meu Pet!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-comportamento-MefPMBRniqThGz88VHTPgy.webp',
    color: 'terracotta',
  },
  saude: {
    id: 'tutor-saude',
    audience: 'tutor',
    title: 'Tutor Protetor',
    emoji: '🩺',
    description:
      'Você sente que algo não está bem com o seu pet e quer saber como identificar sinais de dor e desconforto. Animais são mestres em esconder a dor — e reconhecer esses sinais precocemente pode salvar a vida dele.',
    diagnosticTitle: 'Seu diagnóstico aponta para:',
    diagnosticPoints: [
      'Dificuldade em identificar sinais sutis de dor no seu pet',
      'Insegurança sobre quando procurar atendimento veterinário',
      'Necessidade de conhecimento sobre primeiros socorros pet',
    ],
    offerLabel: 'Recomendação para você',
    offerTitle: 'Sinais de Dor no Seu Pet — O Que Você Precisa Saber',
    offerDescription:
      'Aprenda a identificar os sinais sutis de dor no seu cão ou gato, saiba quando procurar o veterinário e o que fazer em casa. Conteúdo baseado em mais de 20 anos de experiência clínica da Dra. Wendi.',
    ctaText: 'Quero Proteger Meu Pet!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-saude-ViKVYZUey8DDCv46KciA5S.webp',
    color: 'sage',
  },
  alergia: {
    id: 'tutor-alergia',
    audience: 'tutor',
    title: 'Tutor Cuidador',
    emoji: '🌿',
    description:
      'Seu pet sofre com coceiras, pele irritada, otites ou problemas recorrentes. Alergias em pets são mais comuns do que se imagina e, quando não tratadas corretamente, afetam drasticamente a qualidade de vida do animal.',
    diagnosticTitle: 'Seu diagnóstico aponta para:',
    diagnosticPoints: [
      'Problemas recorrentes de pele, coceira ou otites no seu pet',
      'Necessidade de identificar os gatilhos alérgicos',
      'Busca por tratamentos eficazes e cuidados preventivos',
    ],
    offerLabel: 'Recomendação para você',
    offerTitle: 'Alergias em Pets — Identificação e Cuidados',
    offerDescription:
      'Entenda os tipos de alergia, como identificar gatilhos, tratamentos eficazes e cuidados diários para aliviar o sofrimento do seu pet. Orientações práticas da Dra. Wendi, veterinária especialista.',
    ctaText: 'Quero Aliviar Meu Pet!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-alergia-3Mh9hyYFSdZZbhvkExRrdv.webp',
    color: 'terracotta',
  },
  nutricional: {
    id: 'tutor-nutricional',
    audience: 'tutor',
    title: 'Tutor Consciente',
    emoji: '🥗',
    description:
      'Você se preocupa com o que coloca no prato do seu pet e quer oferecer a melhor alimentação possível. A nutrição é a base da saúde — e fazer as escolhas certas pode prevenir doenças e aumentar a longevidade.',
    diagnosticTitle: 'Seu diagnóstico aponta para:',
    diagnosticPoints: [
      'Dúvidas sobre a melhor dieta para o seu pet',
      'Insegurança entre ração, alimentação natural ou mista',
      'Necessidade de orientação nutricional profissional',
    ],
    offerLabel: 'Recomendação para você',
    offerTitle: 'Alimentação Inteligente para o Seu Pet',
    offerDescription:
      'Ração, alimentação natural ou mista? Saiba como escolher a melhor opção para o seu pet, quais alimentos evitar e como montar um plano alimentar equilibrado. Pela Dra. Wendi, com base em ciência e prática.',
    ctaText: 'Quero Alimentar Melhor!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-nutricional-eNCEPabwGuXwJ6WwjCTueu.webp',
    color: 'sage',
  },
};

export const PRO_RESULTS: Record<ProCategory, QuizResult> = {
  empreendedor: {
    id: 'pro-empreendedor',
    audience: 'profissional',
    title: 'Veterinário Empreendedor',
    emoji: '🚀',
    description:
      'Você já tem visão de negócio e sabe que a veterinária vai muito além do consultório. O mercado veterinário projeta R$ 78 bilhões em faturamento, mas a maioria dos profissionais ainda ganha em torno de 4 salários mínimos. Falta método, estrutura e o diferencial certo para transformar seu conhecimento em faturamento previsível.',
    diagnosticTitle: 'Seu diagnóstico aponta para:',
    diagnosticPoints: [
      'Potencial de faturamento não explorado — vets com gestão otimizada faturam R$ 15 mil+/mês',
      'Oportunidade real no mercado de transporte de animais (Lei Joca abriu um novo nicho)',
      'Necessidade de método para escalar sem depender só de você',
      'Perfil pronto para mentoria com acompanhamento estratégico',
    ],
    offerLabel: 'Oportunidade exclusiva para você',
    offerTitle: 'Mentoria Vet Sem Fronteiras',
    offerDescription:
      'Programa de alto valor com a Dra. Wendi para transformar sua mentalidade de "salvador de pets" para empresário de alto faturamento. Inclui: Mentalidade e Gestão, Precificação Lucrativa, Vendas e Posicionamento + Bônus exclusivo: O Método Voepet (transporte de animais) e Assessoria na Prática para viagens internacionais.',
    ctaText: 'Agendar Meu Diagnóstico Gratuito',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/hero-quiz-voepet-QNtJZRmD8kN9kKqaxvJEJ8.webp',
    color: 'teal',
  },
  transicao: {
    id: 'pro-transicao',
    audience: 'profissional',
    title: 'Profissional em Transição',
    emoji: '🔄',
    description:
      'Você está num momento de virada. Trabalha demais, ganha menos do que merece e a concorrência desleal não ajuda. A maioria dos vets atua sobrecarregada, com rotinas exaustivas e dificuldade na precificação. Com o método certo, é possível sair dos R$ 4.500/mês para R$ 15.000+ em poucos meses.',
    diagnosticTitle: 'Seu diagnóstico aponta para:',
    diagnosticPoints: [
      'Dificuldade em precificar — você pode estar "pagando para trabalhar"',
      'Rotina exaustiva sem retorno financeiro proporcional',
      'Necessidade de aprender Vendas e Posicionamento para atrair clientes premium',
      'Potencial para diversificar receita com transporte pet (mercado em expansão)',
    ],
    offerLabel: 'Oportunidade exclusiva para você',
    offerTitle: 'Mentoria Vet Sem Fronteiras',
    offerDescription:
      'Saia da estagnação com acompanhamento direto da Dra. Wendi. O programa inclui Precificação Lucrativa (calcular custos reais e definir margens), Vendas e Posicionamento nas redes sociais, e o bônus exclusivo do Método Voepet para monetizar com transporte de animais.',
    ctaText: 'Agendar Meu Diagnóstico Gratuito',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/hero-quiz-voepet-QNtJZRmD8kN9kKqaxvJEJ8.webp',
    color: 'teal',
  },
  explorador: {
    id: 'pro-explorador',
    audience: 'profissional',
    title: 'Profissional Explorador',
    emoji: '🌍',
    description:
      'Você está no começo da jornada e quer entender como o mercado pet pode ser uma oportunidade real de negócio. A boa notícia: o mercado veterinário brasileiro projeta R$ 78 bilhões em faturamento, e a Lei Joca abriu um nicho novo e lucrativo no transporte de animais. Curiosidade é o primeiro passo — e você já deu ele.',
    diagnosticTitle: 'Seu diagnóstico aponta para:',
    diagnosticPoints: [
      'Fase inicial de exploração — precisa de método para não perder tempo',
      'Oportunidade no transporte de animais (regulamentações, Lei Joca, viagens internacionais)',
      'Necessidade de Mentalidade e Gestão para sair do operacional',
      'Busca por orientação prática de quem já construiu um negócio no setor',
    ],
    offerLabel: 'Próximo passo para você',
    offerTitle: 'Mentoria Vet Sem Fronteiras',
    offerDescription:
      'Comece com o pé direito. A Dra. Wendi criou um programa completo: Mentalidade e Gestão, Precificação Lucrativa, Vendas e Posicionamento, mais os bônus exclusivos do Método Voepet e Assessoria na Prática (microchipagem, sorologia, CVI, caixas de transporte). Do zero ao faturamento.',
    ctaText: 'Agendar Meu Diagnóstico Gratuito',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/hero-quiz-voepet-QNtJZRmD8kN9kKqaxvJEJ8.webp',
    color: 'teal',
  },
};

// ─── Calculate Result ────────────────────────────────────────

export function calculateTutorResult(answers: Record<string, string>): {
  category: PetCategory;
  leadTemp: LeadTemp;
} {
  const scores: Record<PetCategory, number> = {
    transporte: 0,
    comportamento: 0,
    saude: 0,
    alergia: 0,
    nutricional: 0,
  };
  let leadTemp: LeadTemp = 'morno';

  const tutorQuestions = QUIZ_QUESTIONS.filter(
    (q) => q.audience === 'all' || q.audience === 'tutor'
  );

  tutorQuestions.forEach((question) => {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) return;
    const option = question.options.find((o) => o.id === selectedOptionId);
    if (!option) return;

    if (option.petScores) {
      Object.entries(option.petScores).forEach(([cat, score]) => {
        scores[cat as PetCategory] += score;
      });
    }
    if (option.leadTemp) {
      leadTemp = option.leadTemp;
    }
  });

  const category = (Object.entries(scores) as [PetCategory, number][]).reduce(
    (max, [cat, score]) => (score > max[1] ? [cat, score] : max),
    ['transporte', 0] as [PetCategory, number]
  )[0];

  return { category, leadTemp };
}

export function calculateProResult(answers: Record<string, string>): {
  category: ProCategory;
  leadTemp: LeadTemp;
} {
  const scores: Record<ProCategory, number> = {
    empreendedor: 0,
    transicao: 0,
    explorador: 0,
  };
  let leadTemp: LeadTemp = 'morno';

  const proQuestions = QUIZ_QUESTIONS.filter(
    (q) => q.audience === 'all' || q.audience === 'profissional'
  );

  proQuestions.forEach((question) => {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) return;
    const option = question.options.find((o) => o.id === selectedOptionId);
    if (!option) return;

    if (option.proScores) {
      Object.entries(option.proScores).forEach(([cat, score]) => {
        scores[cat as ProCategory] += score;
      });
    }
    if (option.leadTemp) {
      leadTemp = option.leadTemp;
    }
  });

  const category = (Object.entries(scores) as [ProCategory, number][]).reduce(
    (max, [cat, score]) => (score > max[1] ? [cat, score] : max),
    ['empreendedor', 0] as [ProCategory, number]
  )[0];

  return { category, leadTemp };
}
