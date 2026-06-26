# TECNICO.md — Portfólio Ryan Soares
> Documento de referência técnica para IA de código e desenvolvedor.
> Leia antes de escrever qualquer linha.

---

## 1. STACK — O QUE É E O QUE NÃO É

### Permitido
- HTML5 semântico
- CSS3 com custom properties nativas
- JavaScript vanilla ES6+ com ES Modules

### Proibido (não sugerir, não usar)
- jQuery
- Bootstrap / Tailwind / qualquer CSS framework
- React / Vue / Angular / qualquer JS framework
- GSAP / AOS / qualquer biblioteca de animação
- Sass / SCSS / Less
- Webpack / Vite / qualquer bundler
- npm / node_modules (zero dependências externas)

**Razão:** performance, fundamentos, sem build process. O site deve funcionar abrindo o `index.html` direto no browser.

---

## 2. ESTRUTURA DE ARQUIVOS

```
portfolio/
├── index.html
├── css/
│   ├── style.css         ← reset, variáveis globais, tipografia, layout base
│   ├── components.css    ← estilos de cada seção (hero, about, skills, etc.)
│   └── animations.css    ← keyframes e transition classes
├── js/
│   ├── main.js           ← entry point, importa todos os módulos
│   ├── theme.js          ← lógica do toggle dark/light
│   ├── nav.js            ← menu mobile, smooth scroll, active state
│   └── animations.js     ← Intersection Observer para fade-in ao scroll
├── assets/
│   ├── avatar/           ← imagem/svg do avatar
│   └── icons/            ← ícones SVG das tecnologias e redes sociais
├── briefing-portfolio-ryan-soares.md
└── TECNICO.md
```

**Regras:**
- Nenhum arquivo JS inline no HTML (exceto `<script type="module" src="js/main.js">`)
- Nenhum CSS inline no HTML (exceto variáveis de tema se necessário)
- Imagens sempre em `assets/`, nunca em `css/` ou na raiz

---

## 3. DESIGN TOKENS — CSS CUSTOM PROPERTIES

Todas as variáveis ficam em `:root` dentro de `css/style.css`.

```css
/* === TEMA DARK (padrão) === */
[data-theme="dark"] {
  --bg-primary: #0d1117;
  --bg-secondary: #111827;
  --bg-card: #1a2332;

  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  --accent: #00e887;
  --accent-hover: #00c974;
  --accent-soft: rgba(0, 232, 135, 0.1);

  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

/* === TEMA LIGHT === */
[data-theme="light"] {
  --bg-primary: #f8fafc;
  --bg-secondary: #f1f5f9;
  --bg-card: #ffffff;

  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;

  --accent: #059669;
  --accent-hover: #047857;
  --accent-soft: rgba(5, 150, 105, 0.1);

  --border: rgba(0, 0, 0, 0.08);
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

/* === TOKENS GLOBAIS (independem do tema) === */
:root {
  /* Tipografia */
  --font-main: 'Poppins', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;

  /* Espaçamento (escala de 8px) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Transições */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* Container */
  --container-max: 1100px;
  --container-padding: var(--space-6);
}
```

**Regras:**
- Toda cor, fonte e espaçamento usa variável — zero valores hardcoded no CSS
- Nunca usar `color: #fff` diretamente — sempre `color: var(--text-primary)`

---

## 4. TIPOGRAFIA

**Fonte principal:** Poppins (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Hierarquia:**
- `h1` → Hero (nome), 3rem–5rem, weight 700
- `h2` → Títulos de seção, 2rem–2.5rem, weight 600
- `h3` → Subtítulos / card titles, 1.25rem, weight 600
- `p` → Corpo de texto, 1rem, weight 400, line-height 1.7
- `small / .text-muted` → Metadados, labels, 0.875rem

---

## 5. CONVENÇÃO DE CLASSES CSS

**Padrão:** simples e descritivo, com hífen.

```css
/* ✅ Correto */
.hero-title {}
.hero-title-highlight {}
.skill-card {}
.skill-card-active {}
.nav-link {}
.nav-link-active {}

/* ❌ Errado */
.heroTitle {}        /* camelCase — não */
.hero__title {}      /* BEM — não é o padrão deste projeto */
.ht {}              /* abreviação — não */
```

**Estados:**
- `-active` para estado ativo
- `-visible` para elementos revelados pelo scroll
- `-open` para menus/modais abertos
- `-disabled` para elementos desabilitados

---

## 6. TEMA DARK / LIGHT

**Implementação:** atributo `data-theme` na tag `<html>`.

```html
<html lang="pt-BR" data-theme="dark">
```

**Lógica em `js/theme.js`:**
```javascript
export function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

**Regras:**
- Padrão inicial: `dark`
- Persistência: `localStorage` com chave `'theme'`
- Nunca usar `prefers-color-scheme` como lógica principal — só como fallback se `localStorage` estiver vazio
- A transição entre temas deve ter `transition: background-color 250ms ease, color 250ms ease` no `body`

---

## 7. JAVASCRIPT — ESTRUTURA DE MÓDULOS

**Entry point (`js/main.js`):**
```javascript
import { initTheme, toggleTheme } from './theme.js';
import { initNav } from './nav.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initAnimations();

  document.querySelector('#theme-toggle')
    .addEventListener('click', toggleTheme);
});
```

**Carregamento no HTML:**
```html
<script type="module" src="js/main.js"></script>
```

**Regras:**
- Todo módulo exporta uma função `init*` como entry point
- Nenhuma variável global — tudo encapsulado nos módulos
- Sem `var` — apenas `const` e `let`
- Arrow functions para callbacks
- Async/await para qualquer operação assíncrona futura

---

## 8. ANIMAÇÕES

**Regra geral:** CSS primeiro, JS só quando necessário.

**Fade-in ao scroll (`js/animations.js`):**
```javascript
export function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // roda só uma vez
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}
```

**Classe base em `css/animations.css`:**
```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms ease, transform 500ms ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Respeitar preferência do usuário */
@media (prefers-reduced-motion: reduce) {
  .fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Proibido:**
- `setTimeout` para simular animação
- `setInterval` para qualquer coisa visual
- Manipulação direta de `style.opacity` ou `style.transform` via JS quando CSS resolve

---

## 9. RESPONSIVIDADE

**Abordagem:** mobile-first. Estilos base são para mobile, `@media` expande para telas maiores.

**Breakpoints:**
```css
/* Mobile base: sem media query (320px+) */
/* Tablet: */
@media (min-width: 768px) {}
/* Desktop: */
@media (min-width: 1024px) {}
/* Wide: */
@media (min-width: 1280px) {}
```

**Container padrão:**
```css
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

---

## 10. SEÇÕES — REGRAS DE CONTEÚDO

| Seção | ID | Conteúdo | Observações |
|---|---|---|---|
| Header | `#header` | Logo, nav, toggle tema | Fixo no topo, fundo com blur ao scroll |
| Hero | `#hero` | Avatar, nome, título, posicionamento, CTAs | CTA primário: email. CTA secundário: LinkedIn |
| Sobre | `#sobre` | Biografia, trajetória | Mencionar fábrica → tech |
| Serviços | `#servicos` | O que oferece como freelancer | Usar texto do briefing como base |
| Skills | `#skills` | Tecnologias categorizadas com ícones SVG | 3 categorias: Dia a dia / Sei usar / Aprendendo |
| Experiência | `#experiencia` | Timeline: Teamsoft → Rodenstock | Cronologia decrescente (mais recente primeiro) |
| Projetos | `#projetos` | Cards de projeto | Estado "Em breve" — seção preparada mas vazia |
| Contato | `#contato` | Email, GitHub, LinkedIn, 99Freelas | Sem formulário por ora, só links diretos |
| Footer | `#footer` | Links rápidos, copyright | Sem WhatsApp |

---

## 11. ACESSIBILIDADE MÍNIMA

- Toda imagem tem `alt` descritivo (nunca `alt=""` exceto em imagens decorativas)
- Todo botão de ícone tem `aria-label`
- Links externos têm `target="_blank" rel="noopener noreferrer"`
- Foco visível em todos elementos interativos (não remover `outline` sem substituir)
- Contraste mínimo WCAG AA (4.5:1 para texto normal)
- `lang="pt-BR"` no `<html>`

---

## 12. HTML — ESTRUTURA BASE

```html
<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ryan Soares | Desenvolvedor Fullstack</title>
  <meta name="description" content="Desenvolvedor Fullstack especializado em mobile (Flutter) e web. Do back ao app — sistemas que funcionam do começo ao fim.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/animations.css">
</head>
<body>
  <header id="header">...</header>
  <main>
    <section id="hero">...</section>
    <section id="sobre">...</section>
    <section id="servicos">...</section>
    <section id="skills">...</section>
    <section id="experiencia">...</section>
    <section id="projetos">...</section>
    <section id="contato">...</section>
  </main>
  <footer id="footer">...</footer>
  <script type="module" src="js/main.js"></script>
</body>
</html>
```

---

## 13. GIT — CONVENTIONAL COMMITS

**Formato:** `tipo(escopo): descrição em minúsculo`

| Tipo | Quando usar |
|---|---|
| `feat` | Nova seção, nova funcionalidade |
| `fix` | Correção de bug ou erro visual |
| `style` | Mudança visual/CSS sem alterar lógica |
| `chore` | Atualização de arquivo, organização |
| `docs` | Alteração no TECNICO.md ou README |
| `refactor` | Reescrita de código sem mudar comportamento |

**Exemplos:**
```
feat(hero): adicionar seção hero com avatar e CTAs
style(skills): ajustar grid de skills para mobile
fix(theme): corrigir persistência do tema no localStorage
chore: organizar estrutura de pastas inicial
docs: atualizar TECNICO.md com breakpoints
```

---

## 14. DEPLOY

- **Plataforma:** Vercel ou Netlify (gratuito)
- **Sem build process:** deploy da pasta raiz diretamente
- **Repositório:** público no GitHub (`RyanSDeve`)
- **Branch principal:** `main`
- **Domínio futuro sugerido:** `ryansoares.dev`

---

*Última atualização: Junho 2026*