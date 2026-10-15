# Helena & Rafael — Site de Casamento

Site completo de casamento com experiência premium, minimalista e emocional —
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion + Firebase.

> **Tudo é configurável em um único arquivo:** [`app/data/wedding.ts`](app/data/wedding.ts).
> Troque nomes, data, local, textos, fotos, presentes e FAQ sem tocar no resto do código.

---

## ✨ Funcionalidades

- **Abertura cinematográfica** com monograma do casal (respeita `prefers-reduced-motion`)
- **Hero em tela cheia** com parallax, contagem regressiva e CTAs
- **Carta aos convidados** com foto e assinatura
- **Nossa história** em timeline editorial (assimétrica no desktop, vertical no mobile)
- **Contagem regressiva** em tempo real — muda a mensagem após o evento
- **Detalhes do evento** com Google Calendar e download `.ics` (Apple/Outlook)
- **Galeria** com grid assimétrico, lazy loading, lightbox, swipe e teclado
- **RSVP** com validação elegante, estados de loading/sucesso e envio ao **Firestore**
- **Presentes** com Pix (copiar chave) e listas externas
- **FAQ** em accordion animado
- **Localização** com mapa embutido e rota no Google Maps
- **Navbar fixa** com blur ao rolar e menu mobile fluido
- **SEO completo**: Open Graph, Twitter Cards, favicon e metadata de compartilhamento
- **Acessibilidade**: HTML semântico, foco visível, ARIA e navegação por teclado

## 🛠 Stack

| Camada       | Tecnologia                          |
| ------------ | ----------------------------------- |
| Framework    | Next.js 14+ (App Router, `output: 'export'`) |
| Linguagem    | TypeScript (strict)                 |
| Estilos      | Tailwind CSS 3                      |
| Animações    | Framer Motion 11                    |
| Ícones       | Lucide React                        |
| Backend      | Firebase Hosting + Firestore        |
| Tipografia   | Cormorant Garamond + Manrope (auto-hospedadas em `app/fonts`) |

## 🚀 Instalação

```bash
# 1. Instale as dependências
npm install

# 2. (Opcional) Configure o Firebase — copie e preencha as variáveis
cp .env.example .env.local

# 3. Rode em modo desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

```bash
# Build de produção (gera a pasta /out, pronta para o Firebase Hosting)
npm run build

# Visualize o build de produção localmente (servidor estático sem dependências)
npm run preview
```

## 🎨 Personalização — `app/data/wedding.ts`

| Bloco        | O que alterar                                              |
| ------------ | ---------------------------------------------------------- |
| `couple`     | nomes e iniciais do monograma                               |
| `date`       | data/hora (ISO), textos de data e prazo do RSVP             |
| `venue`      | nome, endereço, link do Maps, horários, traje, observações  |
| `contact`    | WhatsApp, e-mail, Instagram                                 |
| `gifts`      | chave Pix e links de listas                                 |
| `story`      | marcos da história (ano, título, texto, foto)               |
| `faq`        | perguntas frequentes                                        |
| `seo`        | URL base, títulos e imagem OG                               |
| `images`     | fotos do hero, carta, contagem e galeria                    |

As fotos ficam em [`public/images`](public/images) — basta substituir os arquivos
mantendo os nomes (ou apontar novos caminhos em `wedding.ts`).

## 🔥 Firebase

### 1. Criar o projeto

1. Acesse o [Console do Firebase](https://console.firebase.google.com) e crie um projeto.
2. Em **Build → Firestore Database**, crie o banco (modo produção).
3. Em **Project settings → Your apps**, adicione um app **Web** e copie as chaves.

### 2. Variáveis de ambiente

```bash
cp .env.example .env.local
# preencha com as chaves do seu projeto
```

Sem essas variáveis o site funciona em **modo demonstração**: o RSVP é salvo
apenas no navegador (`localStorage`) e um aviso aparece no console.

### 3. Estrutura dos dados (Firestore)

Coleção `rsvps` — cada documento criado pelo formulário:

```ts
{
  name: string;            // nome completo
  phone: string;           // telefone com DDD
  email: string | null;    // opcional
  attending: boolean;      // confirmou presença?
  companions: number;      // 0..5
  companionNames: string[];// nomes dos acompanhantes
  dietary: string | null;  // restrições alimentares
  message: string | null;  // recado para os noivos
  createdAt: Timestamp;
  source: 'site';
}
```

As regras de segurança em [`firestore.rules`](firestore.rules) permitem apenas a
**criação** de confirmações válidas. A leitura é feita pelo Console do Firebase.

### 4. Deploy no Firebase Hosting

```bash
# Instale a CLI (uma vez)
npm install -g firebase-tools

# Faça login e selecione o projeto
firebase login
firebase use --add          # escolha o projeto e apelido "default"

# Build estático + deploy (Hosting + regras do Firestore)
npm run build
firebase deploy
```

O `firebase.json` já está configurado para publicar a pasta `out/` com cache
agressivo em imagens e assets estáticos.

> Dica: para apontar para o seu projeto, edite `.firebaserc` ou rode
> `firebase use <id-do-projeto>`.

## 📁 Estrutura do projeto

```
app/
├── components/
│   ├── Preloader.tsx        # abertura com monograma
│   ├── Header.tsx           # navbar fixa + menu mobile
│   ├── Hero.tsx             # capa cinematográfica + contagem compacta
│   ├── Letter.tsx           # carta aos convidados
│   ├── LoveStory.tsx        # timeline da história
│   ├── Countdown.tsx        # contagem regressiva
│   ├── EventDetails.tsx     # cerimônia, recepção, calendário
│   ├── Gallery.tsx          # galeria + lightbox
│   ├── RSVPForm.tsx         # confirmação de presença (Firestore)
│   ├── Gifts.tsx            # presentes + Pix
│   ├── FAQ.tsx              # perguntas frequentes
│   ├── LocationSection.tsx  # mapa e endereço
│   ├── Footer.tsx           # rodapé
│   ├── Reveal.tsx           # animação de entrada reutilizável
│   ├── SectionHeading.tsx   # cabeçalho de seção reutilizável
│   └── Monogram.tsx         # monograma reutilizável
├── data/
│   └── wedding.ts           # ⭐ configuração única do casal
├── lib/
│   ├── firebase.ts          # init do Firebase (Firestore)
│   └── utils.ts             # calendário .ics, contagem, helpers
├── globals.css
├── layout.tsx               # fontes, metadata, SEO
└── page.tsx                 # composição das seções

public/
└── images/                  # fotos do casal (substituíveis)

firebase.json                # Hosting + Firestore
firestore.rules              # regras de segurança
.env.example                 # variáveis de ambiente
```

## 💡 Notas de implementação

- **Export estático** (`output: 'export'`): o build gera HTML estático em `out/`,
  ideal para Firebase Hosting sem servidor. `next/image` usa `unoptimized` —
  as imagens em `public/images` já são geradas em tamanho adequado.
- **Duplicidade de RSVP**: o botão desabilita durante o envio e o formulário só
  volta ao estado inicial após sucesso ou erro explícito.
- **Movimento reduzido**: animações, parallax e preloader respeitam
  `prefers-reduced-motion` em todo o site.
- **Performance**: fontes auto-hospedadas (woff2 com preload), imagens com lazy
  loading e o SDK do Firebase carregado apenas no envio do RSVP — o bundle
  inicial fica leve para redes móveis.

---

Feito com carinho para o grande dia. 🤍
