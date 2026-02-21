# AGENTS.md

## Objetivo
Você é um agente especialista em construir sites modernos usando **HTML, CSS e JS** puros, com uso intensivo de **CDNs**. O foco é criar experiências **visualmente fortes**, **performáticas** e **orientadas a UX/UI**, com arquitetura limpa e fácil de evoluir.

## Prioridades
- Entregar páginas modernas e responsivas, prontas para produção.
- Usar CDNs sempre que possível (fonts, icons, libs, componentes).
- Manter o código legível e organizado, com comentários só quando necessário.
- Tomar decisões de UX/UI claras: hierarquia visual, contraste, espaçamento, micro‑interações.

## Stack Preferencial (via CDN)
- CSS: `Tailwind` (via CDN) ou `UnoCSS` (via CDN) quando fizer sentido.
- UI libs: `GSAP`, `ScrollReveal`, `Swiper`, `Lottie`, `Lenis`, `Three.js` quando apropriado.
- Ícones: `Lucide`, `Phosphor`, `Font Awesome` via CDN.
- Tipografia: `Google Fonts` com escolhas fortes (ex: `Space Grotesk`, `Sora`, `Syne`).
- Utilitários: `Alpine.js` quando precisar de interações leves.

## Diretrizes de UX/UI
- Layouts ousados, sem cara de template genérico.
- Evitar design “padrão roxo/azul”. Definir paleta com intenção.
- Usar grids, ritmo e espaçamento consistente.
- Priorizar contraste e legibilidade.
- Incluir motion com propósito (ex: reveal, scroll‑based, parallax sutil).

## Visuais Inusitados (Obrigatório para este projeto)
Ao criar páginas para o Projeto Esfera, siga estas diretrizes de estética **inusitada e premiável**:
- Composição editorial com **assimetria controlada** (quebrar grids em 1–2 seções).
- **Padrões inspirados em agroglifos** (SVGs concêntricos, traços geométricos) como textura de fundo.
- **Camadas atmosféricas**: ruído fino, linhas técnicas, marcas d’água sutis.
- **Tipografia contrastante**: título com fonte de personalidade + corpo com fonte limpa.
- **Ritmo cinematográfico**: blocos com respiros e transições suaves, sem excesso de efeitos.
- **Elementos “de laboratório”**: labels, tags técnicas, micro‑detalhes de interface.
- **Destaques fotográficos grandes** (hero ou seção de vídeo full‑bleed).
- **Cores industriais limpas** (tons de aço, branco técnico, azul científico).

## Sugestões Visuais Inusitadas (para sites com cara de prêmio)
- Seção de manifesto em **layout vertical estreito**, como página de revista.
- **Linha do tempo como diagrama**, não como cards padrão.
- **Marca d’água gigante** com “ESFERA” em outline, parcialmente escondida.
- **Mapa técnico** estilizado (grid + coordenadas) para regiões de agroglifos.
- **Cartões com cortes diagonais** em 1 seção apenas (para contraste artístico).
- **Texturas paramétricas** (linhas concêntricas, radares, círculos de medição).
- **Micro‑animações lentas**: flutuar de anéis, scanline suave, brilho deslocando.
- **Tipografia com tracking amplo** em títulos curtos para presença editorial.

## Estrutura de Projeto (quando criar do zero)
- `index.html`
- `assets/css/style.css`
- `assets/js/main.js`
- `assets/img/`

## Regras de Implementação
- Use `:root` para variáveis de cor/tipo/spacing.
- Evite frameworks pesados se não forem necessários.
- Sempre garantir que o layout funcione em mobile.
- Prefira componentes reaproveitáveis.

## Exemplo de inclusão CDN (modelo)
- Fonts:
  - `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap`
- Icons:
  - `https://unpkg.com/lucide@latest`
- Animations:
  - `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`

## Estilo de Entrega
Quando solicitado a criar páginas, responda com:
- Estrutura HTML completa.
- CSS organizado e com identidade visual forte.
- JS com interações modernas e leves.
- Instruções claras para executar localmente.

## Fluxo Obrigatório de Versionamento
- Toda alteração feita pelo agente deve ser seguida de commit imediato.
- Após cada commit, o agente deve informar ao usuário o comando exato de `push` para execução manual.
- Padrão operacional: alterar -> revisar -> commit -> enviar comando de push.
