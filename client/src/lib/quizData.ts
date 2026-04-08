/*
 * Quiz Voepet — Dados e Lógica
 * Design: "Consultório Acolhedor" — paleta sage/terracotta/sand
 * Categorias: transporte, comportamento, saude, alergia, nutricional
 */

export type Category = 'transporte' | 'comportamento' | 'saude' | 'alergia' | 'nutricional';
export type LeadTemp = 'quente' | 'morno' | 'frio';

export interface QuizOption {
  id: string;
  text: string;
  scores: Partial<Record<Category, number>>;
  leadTemp?: LeadTemp;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: QuizOption[];
  type: 'single' | 'contact';
}

export interface QuizResult {
  category: Category;
  title: string;
  emoji: string;
  description: string;
  ebookTitle: string;
  ebookDescription: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  color: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é a sua maior preocupação com o seu pet hoje?',
    subtitle: 'Escolha a que mais se aproxima da sua realidade',
    type: 'single',
    options: [
      {
        id: '1a',
        text: 'Preciso viajar e não sei como transportar meu pet com segurança',
        scores: { transporte: 3 },
      },
      {
        id: '1b',
        text: 'Meu pet tem comportamentos que me preocupam (latir demais, destruir coisas, ansiedade)',
        scores: { comportamento: 3 },
      },
      {
        id: '1c',
        text: 'Percebo que meu pet pode estar sentindo dor ou desconforto',
        scores: { saude: 3 },
      },
      {
        id: '1d',
        text: 'Meu pet vive se coçando, com pele irritada ou problemas recorrentes',
        scores: { alergia: 3 },
      },
      {
        id: '1e',
        text: 'Tenho dúvidas sobre a alimentação ideal para meu pet',
        scores: { nutricional: 3 },
      },
    ],
  },
  {
    id: 2,
    question: 'Como é a rotina do seu pet no dia a dia?',
    subtitle: 'Pense no que mais define o cotidiano dele',
    type: 'single',
    options: [
      {
        id: '2a',
        text: 'Fica muito tempo sozinho e demonstra ansiedade',
        scores: { comportamento: 2 },
      },
      {
        id: '2b',
        text: 'Tem uma rotina tranquila, mas viajamos com frequência',
        scores: { transporte: 2 },
      },
      {
        id: '2c',
        text: 'Tem episódios de apatia, manca ou evita se movimentar',
        scores: { saude: 2 },
      },
      {
        id: '2d',
        text: 'Vive com coceira, lambe as patas ou tem problemas de pele',
        scores: { alergia: 2 },
      },
      {
        id: '2e',
        text: 'Come ração, mas não sei se é a melhor opção para ele',
        scores: { nutricional: 2 },
      },
    ],
  },
  {
    id: 3,
    question: 'Nos últimos meses, o que mais te tirou o sono em relação ao seu pet?',
    subtitle: 'Aquilo que realmente te preocupou',
    type: 'single',
    options: [
      {
        id: '3a',
        text: 'Uma viagem que precisei fazer e não sabia como levar ele',
        scores: { transporte: 2 },
      },
      {
        id: '3b',
        text: 'Comportamento agressivo, medo de barulhos ou destruição',
        scores: { comportamento: 2 },
      },
      {
        id: '3c',
        text: 'Ele pareceu sentir dor, chorou ou mudou de comportamento de repente',
        scores: { saude: 2 },
      },
      {
        id: '3d',
        text: 'Crises alérgicas, otites de repetição ou problemas de pele',
        scores: { alergia: 2 },
      },
      {
        id: '3e',
        text: 'Dúvidas sobre alimentação natural, ração ou suplementos',
        scores: { nutricional: 2 },
      },
    ],
  },
  {
    id: 4,
    question: 'Você já buscou informação sobre esse assunto antes?',
    subtitle: 'Sobre cuidados com o seu pet de forma geral',
    type: 'single',
    options: [
      {
        id: '4a',
        text: 'Sim, mas encontrei muita informação confusa na internet',
        scores: { transporte: 1, comportamento: 1, saude: 1, alergia: 1, nutricional: 1 },
      },
      {
        id: '4b',
        text: 'Nunca busquei, mas sinto que preciso',
        scores: { transporte: 1, comportamento: 1, saude: 1, alergia: 1, nutricional: 1 },
      },
      {
        id: '4c',
        text: 'Já consultei um veterinário, mas quero entender mais por conta própria',
        scores: { transporte: 1, comportamento: 1, saude: 1, alergia: 1, nutricional: 1 },
      },
      {
        id: '4d',
        text: 'Já comprei cursos ou materiais sobre pets',
        scores: { transporte: 1, comportamento: 1, saude: 1, alergia: 1, nutricional: 1 },
      },
    ],
  },
  {
    id: 5,
    question: 'Qual o porte do seu pet?',
    subtitle: 'Isso nos ajuda a personalizar sua recomendação',
    type: 'single',
    options: [
      {
        id: '5a',
        text: 'Pequeno (até 10 kg)',
        scores: { transporte: 1, alergia: 1 },
      },
      {
        id: '5b',
        text: 'Médio (10 a 25 kg)',
        scores: { comportamento: 1, nutricional: 1 },
      },
      {
        id: '5c',
        text: 'Grande (acima de 25 kg)',
        scores: { saude: 1, transporte: 1 },
      },
      {
        id: '5d',
        text: 'Tenho gato',
        scores: { transporte: 1, alergia: 1 },
      },
    ],
  },
  {
    id: 6,
    question: 'Se pudesse resolver UMA coisa agora, o que seria?',
    subtitle: 'A sua prioridade número 1',
    type: 'single',
    options: [
      {
        id: '6a',
        text: 'Conseguir transportar meu pet com tranquilidade em viagens',
        scores: { transporte: 3 },
      },
      {
        id: '6b',
        text: 'Entender por que meu pet age de determinada forma',
        scores: { comportamento: 3 },
      },
      {
        id: '6c',
        text: 'Saber se meu pet está com dor e o que fazer',
        scores: { saude: 3 },
      },
      {
        id: '6d',
        text: 'Acabar com as alergias e coceiras do meu pet',
        scores: { alergia: 3 },
      },
      {
        id: '6e',
        text: 'Dar a melhor alimentação possível para meu pet',
        scores: { nutricional: 3 },
      },
    ],
  },
  {
    id: 7,
    question: 'Você investiria em um material prático e direto, feito por uma veterinária com mais de 20 anos de experiência?',
    subtitle: 'Conteúdo exclusivo da Dra. Wendi',
    type: 'single',
    options: [
      {
        id: '7a',
        text: 'Com certeza! Quero algo confiável e direto ao ponto',
        scores: {},
        leadTemp: 'quente',
      },
      {
        id: '7b',
        text: 'Depende do valor e do conteúdo',
        scores: {},
        leadTemp: 'morno',
      },
      {
        id: '7c',
        text: 'Prefiro conteúdo gratuito por enquanto',
        scores: {},
        leadTemp: 'frio',
      },
    ],
  },
];

export const QUIZ_RESULTS: Record<Category, QuizResult> = {
  transporte: {
    category: 'transporte',
    title: 'Tutor Viajante',
    emoji: '✈️',
    description:
      'Você é um tutor que ama viajar e quer levar seu pet junto com segurança! Transportar um animal exige planejamento, documentação e cuidados específicos que muitos tutores desconhecem. A boa notícia é que existe um caminho seguro e tranquilo para isso.',
    ebookTitle: 'Guia Completo de Transporte Seguro para Pets',
    ebookDescription:
      'Tudo o que você precisa saber sobre documentação, caixas de transporte, companhias aéreas, sedação, e como preparar seu pet para viajar sem estresse. Escrito pela Dra. Wendi, que transporta animais profissionalmente há anos.',
    ctaText: 'Quero Meu Guia de Transporte!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-transporte-dRTC2dUrFRixhCPAiJ7DEV.webp',
    color: 'sage',
  },
  comportamento: {
    category: 'comportamento',
    title: 'Tutor Observador',
    emoji: '🐾',
    description:
      'Você percebe que o comportamento do seu pet não está normal e quer entender o que está por trás disso. Ansiedade, agressividade, medo e destruição são sinais que precisam ser interpretados — e não punidos.',
    ebookTitle: 'Entendendo o Comportamento do Seu Cão',
    ebookDescription:
      'Um guia prático para decodificar os sinais do seu pet: por que ele late, destrói, tem medo ou fica ansioso. Com orientações da Dra. Wendi para melhorar a convivência e o bem-estar do seu companheiro.',
    ctaText: 'Quero Entender Meu Pet!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-comportamento-MefPMBRniqThGz88VHTPgy.webp',
    color: 'terracotta',
  },
  saude: {
    category: 'saude',
    title: 'Tutor Protetor',
    emoji: '🩺',
    description:
      'Você sente que algo não está bem com o seu pet e quer saber como identificar sinais de dor e desconforto. Animais são mestres em esconder a dor — e reconhecer esses sinais precocemente pode salvar a vida dele.',
    ebookTitle: 'Sinais de Dor no Seu Pet — O Que Você Precisa Saber',
    ebookDescription:
      'Aprenda a identificar os sinais sutis de dor no seu cão ou gato, saiba quando procurar o veterinário e o que fazer em casa. Conteúdo baseado em mais de 20 anos de experiência clínica da Dra. Wendi.',
    ctaText: 'Quero Proteger Meu Pet!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-saude-ViKVYZUey8DDCv46KciA5S.webp',
    color: 'sage',
  },
  alergia: {
    category: 'alergia',
    title: 'Tutor Cuidador',
    emoji: '🌿',
    description:
      'Seu pet sofre com coceiras, pele irritada, otites ou problemas recorrentes. Alergias em pets são mais comuns do que se imagina e, quando não tratadas corretamente, afetam drasticamente a qualidade de vida do animal.',
    ebookTitle: 'Alergias em Pets — Identificação e Cuidados',
    ebookDescription:
      'Entenda os tipos de alergia, como identificar gatilhos, tratamentos eficazes e cuidados diários para aliviar o sofrimento do seu pet. Orientações práticas da Dra. Wendi, veterinária especialista.',
    ctaText: 'Quero Aliviar Meu Pet!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-alergia-3Mh9hyYFSdZZbhvkExRrdv.webp',
    color: 'terracotta',
  },
  nutricional: {
    category: 'nutricional',
    title: 'Tutor Consciente',
    emoji: '🥗',
    description:
      'Você se preocupa com o que coloca no prato do seu pet e quer oferecer a melhor alimentação possível. A nutrição é a base da saúde — e fazer as escolhas certas pode prevenir doenças e aumentar a longevidade.',
    ebookTitle: 'Alimentação Inteligente para o Seu Pet',
    ebookDescription:
      'Ração, alimentação natural ou mista? Saiba como escolher a melhor opção para o seu pet, quais alimentos evitar e como montar um plano alimentar equilibrado. Pela Dra. Wendi, com base em ciência e prática.',
    ctaText: 'Quero Alimentar Melhor!',
    ctaLink: '#',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663458931464/5XPcGj2vraE3wVcMMnDzBN/resultado-nutricional-eNCEPabwGuXwJ6WwjCTueu.webp',
    color: 'sage',
  },
};

export function calculateResult(answers: Record<number, string>): {
  category: Category;
  leadTemp: LeadTemp;
} {
  const scores: Record<Category, number> = {
    transporte: 0,
    comportamento: 0,
    saude: 0,
    alergia: 0,
    nutricional: 0,
  };

  let leadTemp: LeadTemp = 'morno';

  QUIZ_QUESTIONS.forEach((question) => {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) return;

    const option = question.options.find((o) => o.id === selectedOptionId);
    if (!option) return;

    // Add scores
    Object.entries(option.scores).forEach(([cat, score]) => {
      scores[cat as Category] += score;
    });

    // Check lead temperature
    if (option.leadTemp) {
      leadTemp = option.leadTemp;
    }
  });

  // Find the category with the highest score
  const category = (Object.entries(scores) as [Category, number][]).reduce(
    (max, [cat, score]) => (score > max[1] ? [cat, score] : max),
    ['transporte', 0] as [Category, number]
  )[0];

  return { category, leadTemp };
}
