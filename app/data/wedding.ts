/**
 * Único arquivo de configuração do casamento.
 * Troque os dados abaixo pelas informações reais do casal — todo o site
 * (textos, links, fotos, FAQ e presentes) é alimentado por este arquivo.
 */

export interface StoryItem {
  year: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GiftOption {
  label: string;
  description: string;
  url: string;
}

export interface WeddingConfig {
  couple: {
    bride: string;
    groom: string;
    brideFullName: string;
    groomFullName: string;
    brideInitial: string;
    groomInitial: string;
  };
  date: {
    /** Data/hora da cerimônia em ISO 8601 com fuso. */
    iso: string;
    /** Ex.: "15 de maio de 2027" */
    display: string;
    /** Ex.: "15.05.2027" */
    short: string;
    time: string;
    timeRange: string;
    /** Data limite para confirmação de presença. */
    rsvpDeadline: string;
    rsvpDeadlineDisplay: string;
  };
  venue: {
    name: string;
    address: string;
    mapsUrl: string;
    ceremonyTime: string;
    receptionTime: string;
    dressCode: string;
    notes: string;
  };
  contact: {
    whatsappUrl: string;
    whatsappDisplay: string;
    email: string;
    instagramUrl: string | null;
  };
  gifts: {
    pixKey: string;
    pixLabel: string;
    options: GiftOption[];
  };
  story: StoryItem[];
  faq: FaqItem[];
  seo: {
    baseUrl: string;
    title: string;
    description: string;
    ogImage: string;
  };
  images: {
    hero: string;
    letter: string;
    countdown: string;
    gallery: { src: string; alt: string }[];
  };
}

export const wedding: WeddingConfig = {
  couple: {
    bride: 'Helena',
    groom: 'Rafael',
    brideFullName: 'Helena Vasconcelos',
    groomFullName: 'Rafael Monteiro',
    brideInitial: 'H',
    groomInitial: 'R',
  },

  date: {
    iso: '2027-05-15T16:30:00-03:00',
    display: '15 de maio de 2027',
    short: '15.05.2027',
    time: '16h30',
    timeRange: '16h30 — 23h',
    rsvpDeadline: '2027-04-15',
    rsvpDeadlineDisplay: '15 de abril de 2027',
  },

  venue: {
    name: 'Quinta das Oliveiras',
    address: 'Estrada do Vinhedo, 1.200 — Itu, São Paulo - SP',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Quinta+das+Oliveiras+Itu+S%C3%A3o+Paulo',
    ceremonyTime: '16h30',
    receptionTime: '18h00',
    dressCode: 'Traje passeio completo',
    notes:
      'A cerimônia e a recepção serão ao ar livre. Recomendamos sapatos confortáveis — e um agasalho leve para a noite.',
  },

  contact: {
    whatsappUrl: 'https://wa.me/5511999999999',
    whatsappDisplay: '(11) 99999-9999',
    email: 'helena.rafael@email.com.br',
    instagramUrl: 'https://www.instagram.com/',
  },

  gifts: {
    pixKey: 'helena.rafael.casamento@email.com.br',
    pixLabel: 'Chave Pix (e-mail)',
    options: [
      {
        label: 'Lista de presentes',
        description: 'Itens escolhidos com carinho para o nosso novo lar.',
        url: 'https://example.com/lista-de-presentes',
      },
      {
        label: 'Lua de mel',
        description: 'Contribua com memórias que levaremos para a vida toda.',
        url: 'https://example.com/lua-de-mel',
      },
    ],
  },

  story: [
    {
      year: '2018',
      title: 'Onde nos conhecemos',
      text: 'Foi em uma tarde comum, entre estantes e o aroma do café. Uma conversa que deveria durar minutos atravessou a tarde inteira — e, sem perceber, já era o início de tudo.',
      image: '/images/story-1.jpg',
      alt: 'Café aconchegante onde Helena e Rafael se conheceram',
    },
    {
      year: '2020',
      title: 'O primeiro "sim"',
      text: 'Descobrimos juntos montanhas, cidades novas e o jeito mais bonito de caminhar lado a lado. Cada viagem nos ensinou que casa não é um lugar — é uma pessoa.',
      image: '/images/story-2.jpg',
      alt: 'Casal contemplando montanhas ao amanhecer',
    },
    {
      year: '2026',
      title: 'O pedido',
      text: 'Em uma noite tranquila, sob um céu que parecia escrito à mão, veio a pergunta mais importante de todas. E, entre lágrimas e risos, veio o segundo "sim".',
      image: '/images/story-3.jpg',
      alt: 'Mãos entrelaçadas com a aliança de noivado',
    },
    {
      year: '2027',
      title: 'O grande dia',
      text: 'Agora queremos celebrar o início da nossa vida juntos cercados pelas pessoas que mais amamos. Este convite é o nosso jeito de dizer: esse dia só fica completo com você.',
      image: '/images/gallery-2.jpg',
      alt: 'Casal dançando ao entardecer',
    },
  ],

  faq: [
    {
      question: 'Qual é o traje recomendado?',
      answer:
        'O traje sugerido é passeio completo. Como a celebração será ao ar livre, sapatos confortáveis são bem-vindos — e um agasalho leve cai bem depois do pôr do sol.',
    },
    {
      question: 'Haverá estacionamento no local?',
      answer:
        'Sim. A Quinta das Oliveiras conta com estacionamento gratuito e monitorado dentro do próprio local.',
    },
    {
      question: 'Crianças são convidadas?',
      answer:
        'Amamos as crianças da nossa família e dos nossos amigos, mas este será um evento voltado aos adultos. Em caso de dúvida, fale conosco — será um prazer conversar.',
    },
    {
      question: 'Qual é o horário de chegada?',
      answer:
        'Recomendamos chegar 20 minutos antes da cerimônia, às 16h10, para acomodar-se com calma antes do nosso "sim".',
    },
    {
      question: 'Posso levar um acompanhante?',
      answer:
        'Seu convite indica o número de pessoas incluídas. Ao confirmar presença, você poderá informar os nomes dos seus acompanhantes.',
    },
    {
      question: 'Como confirmo minha presença?',
      answer:
        'Basta preencher o formulário de confirmação neste site, até 15 de abril de 2027. Leva menos de dois minutos.',
    },
    {
      question: 'Onde será a recepção?',
      answer:
        'A recepção acontece no mesmo endereço da cerimônia: Quinta das Oliveiras, em Itu — São Paulo.',
    },
    {
      question: 'Existe lista de presentes?',
      answer:
        'Sim. Na seção "Presentes" você encontra nossa lista e também a chave Pix. Mas lembre-se: o seu carinho e a sua presença são o nosso maior presente.',
    },
  ],

  seo: {
    baseUrl: 'https://helena-e-rafael.web.app',
    title: 'Helena & Rafael — 15 de maio de 2027',
    description:
      'Estamos ansiosos para celebrar este momento com você. Cerimônia e recepção na Quinta das Oliveiras, em 15 de maio de 2027. Confirme sua presença.',
    ogImage: '/images/og.jpg',
  },

  images: {
    hero: '/images/hero.jpg',
    letter: '/images/letter.jpg',
    countdown: '/images/gallery-2.jpg',
    gallery: [
      { src: '/images/gallery-1.jpg', alt: 'Mesa da recepção decorada com arranjos de oliveira' },
      { src: '/images/story-2.jpg', alt: 'Casal ao amanhecer entre montanhas' },
      { src: '/images/gallery-2.jpg', alt: 'Primeira dança ao entardecer' },
      { src: '/images/gallery-3.jpg', alt: 'Brinde com taças de champanhe na hora dourada' },
      { src: '/images/story-3.jpg', alt: 'Detalhe das alianças e das mãos entrelaçadas' },
      { src: '/images/gallery-4.jpg', alt: 'Detalhe do vestido de noiva iluminado pelo sol' },
    ],
  },
};

/** Textos da abertura (tela de carregamento). */
export const preloaderConfig = {
  durationMs: 2000,
};
