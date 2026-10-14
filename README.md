# LP Valor e Arte Marmoraria

Landing page de captação da **Valor e Arte Marmoraria** (Barueri/SP), cliente QH4 Growth no produto **Método Stones Low Ticket** (LP + Google Ads + Meta Ads + GMN Ouro + Cliente Oculto). Contrato iniciado em 05/09/2026.

Pasta pronta para subir na Vercel como site estático (sem build).

---

## 1. Contexto do cliente (resumo para quem pegar o projeto)

- Marmoraria de alto padrão com 13 anos de mercado e +5.000 obras entregues, fundada por mulheres empreendedoras.
- Fábrica própria em Barueri e loja em Pinheiros (SP). Atende Barueri, São Paulo, Grande SP, Litoral e outras regiões sob consulta.
- Hoje vende quase 100% por indicação de arquitetos. Objetivo: diversificar canais e voltar a R$ 250 mil/mês.
- Decisora: **Daniela de Oliveira** (sócia, perfil detalhista e desconfiado). Operação e técnica: **Dalila**.
- Pedido explícito da cliente no briefing: o site precisa mostrar **conhecimento técnico sobre os materiais** (características, aplicações, vantagens e limitações). Evitar visual de luxo exagerado, texto genérico e linguagem formal demais.
- Experiência ruim anterior: agência que ignorou o briefing. Tudo nesta LP foi tirado do briefing, da apresentação comercial e do resumo de onboarding.

## 2. Identidade visual aplicada

Paleta da apresentação comercial (enviada no briefing):

| Uso | Hex |
|---|---|
| Terracota (hero, seção de projetos, CTAs) | `#A5542E` |
| Azul-marinho (processo, formulário, header fixo) | `#121C34` |
| Azul royal (destaques, linha do processo, botão do form) | `#183599` |
| Marrom profundo (títulos em fundo claro, rodapé) | `#3E1400` |
| Areia (seções claras, botões em fundo escuro) | `#DECEC0` |
| Areia 2 / taupe (bordas, detalhes) | `#D1C1B3` / `#A9998B` |

- Fundo **mesclado**, como pedido no briefing: terracota, areia, branco e marinho se alternando, como na apresentação.
- **Tipografia:** Montserrat (títulos, mistura de 300 e 800 igual à apresentação) + Inter (texto). A cliente não pediu fonte, mas disse que site e apresentação usam algo parecido; a Montserrat é a fonte da apresentação.
- **Logo:** extraído da apresentação (`assets/img/logo-white.png` e `logo-dark.png`, PNG transparente). Se a cliente tiver o logo em vetor, vale trocar.
- **Elemento de assinatura:** as linhas diagonais do monograma V/A, desenhadas sobre a foto do hero na abertura da página e repetidas em traços menores nas seções.

## 3. Estrutura da página

1. **Hero:** "Marmoraria com fabricação própria perto de você" + 13 anos / +5.000 obras / fábrica própria
2. **Quem somos:** história, fábrica em Barueri, loja em Pinheiros, horário
3. **O que fazemos:** os 4 destaques que a cliente pediu (cozinha e ilhas, banheiro e lavabo, mesas e tampos, peças especiais) com imagem que troca no scroll + lista completa de serviços
4. **Materiais:** biblioteca interativa por abas (quartzito, granito, mármore, quartzo, ultracompactas, limestone/travertino) com amostras reais da apresentação, onde usar, pontos de atenção e cuidados
5. **Como trabalhamos:** 5 etapas (escolha, projeto executivo, medição, fabricação, instalação) + fotos de fábrica e instalação + prazo padrão de ~30 dias úteis
6. **Projetos que contam nossa história:** Marcelo Rosenbaum, Maurício Arruda, Lufe Gomes (textos da apresentação) + vídeo + bloco para arquitetos/construtoras
7. **Galeria** com lightbox
8. **FAQ** (12 perguntas, todas respondidas com o texto do briefing)
9. **Formulário de orçamento** → página de obrigado → WhatsApp
10. Rodapé com "Desenvolvido pro QH4 Growth"

## 4. O que já está configurado

- WhatsApp **(11) 97289-9613** em todos os CTAs, com mensagem padrão.
- Botão flutuante de WhatsApp fixo no canto direito.
- **Formulário sem Apps Script:** monta a mensagem com todos os campos preenchidos, abre `obrigado.html` (dispara evento de conversão) e redireciona para o WhatsApp em 3,5 s (com botão manual). O botão de envio nasce desabilitado e só libera quando todos os campos obrigatórios estão válidos (`checkValidity` a cada input/change). Máscara de telefone automática.
- GTM instalado (placeholder) em `index.html` e `obrigado.html`.
- SEO: title e description com Barueri/São Paulo/marmoraria, canonical, Open Graph completo, Twitter Card, JSON-LD `HomeAndConstructionBusiness` + `FAQPage`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, width/height em todas as imagens, preload da imagem do hero (desktop e mobile).
- `vercel.json` com cache longo para `/assets` e headers de segurança.
- Página 404 personalizada.
- Animações: desenho das linhas V/A no hero, parallax leve na foto, scroll reveal, troca de imagem nos produtos, entrada das amostras ao trocar de aba, linha de progresso do processo, microinterações nos botões. Respeita `prefers-reduced-motion`.

## 5. O que trocar antes de subir

- [ ] **GTM:** trocar `GTM-XXXXXXX` em `index.html` (2x) e `obrigado.html` (2x).
- [ ] **Domínio:** a URL `https://valorearte-lp.vercel.app/` está como placeholder em: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD (`@id`, `url`, `logo`, `image`), `robots.txt` e `sitemap.xml`. Buscar e substituir pelo domínio final. O site atual da cliente (valorearte.com.br) está no Wix, então definir se a LP vai num subdomínio.
- [ ] Conferir no GTM as tags de conversão (Google Ads e Meta) amarradas aos eventos abaixo.

## 6. Pendências de briefing (validar com a cliente)

- **Textos técnicos dos materiais:** "onde usar / atenção / cuidados" seguem orientação técnica geral do mercado e os pontos que a própria cliente citou (ex.: granito, quartzito, lâminas e quartzo para cozinha; não trabalham com Corian). Como a Daniela é detalhista e pediu exatamente esse conteúdo, **vale a Dalila revisar essa seção antes de publicar**.
- **Direitos das fotos:** a cliente avisou que a maioria das fotos é de fotógrafos profissionais. Confirmar autorização de uso das imagens da galeria, do hero e do vídeo. As fotos do perfil do Lufe Gomes (lifebylufe) e uma foto com marca d'água de outro escritório foram deixadas de fora de propósito.
- **Cases Rosenbaum, Arruda e Lufe:** textos copiados da apresentação comercial da cliente. Confirmar se pode citar os nomes na LP de anúncio.
- **Endereço:** não há endereço completo no briefing, só Barueri (fábrica) e Pinheiros (loja). O JSON-LD está só com a cidade. Se ela passar o endereço, completar o `PostalAddress` e o rodapé.
- **Avaliações:** a nota do Google (3,9) não aparece na LP por estratégia. Não há depoimentos no briefing, então não foi criada seção de depoimentos. Quando a ação de GMN gerar novas avaliações, dá para incluir.
- **Apps Script:** se a QH4 quiser gravar os leads numa planilha, ligar o webhook no `submit` do `assets/js/main.js` antes do redirecionamento para `obrigado.html`.

## 7. Eventos de rastreamento (dataLayer)

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `whatsapp_click` | Qualquer link de WhatsApp | `cta_id` (cta_hero_whatsapp, cta_float_whatsapp, cta_faq_whatsapp, cta_profissionais_whatsapp, cta_contato_whatsapp, cta_footer_whatsapp) |
| `cta_click` | CTAs que levam ao formulário | `cta_id` (cta_header, cta_hero_form, cta_email) |
| `form_start` | Primeira interação no formulário | `form_id` |
| `generate_lead` | Envio válido do formulário | `form_id`, `perfil`, `peca`, `fase` |
| `lead_thankyou_view` | Carregamento da página de obrigado | `form_id` (usar como conversão principal) |
| `material_tab_view` | Troca de aba em Materiais | `material` |
| `faq_open` | Abertura de pergunta do FAQ | `question` |

## 8. Estrutura da pasta

```
lp-valor-e-arte/
├── index.html
├── obrigado.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── img/      (fotos .webp, amostras de pedra, logo .png, ícones, og-image .jpg)
    └── video/cozinha-marmore-vermelho.mp4
```

Fontes do conteúdo: Briefing + Site (Google Forms, respondido por Daniela em 14/10/2026), Apresentação Comercial Valor e Arte (PDF), pasta de fotos enviada pela cliente e resumo de onboarding da QH4.

## 9. Como publicar na Vercel

1. Descompactar o zip.
2. Na Vercel: **Add New → Project → Deploy** arrastando a pasta `lp-valor-e-arte` (ou via CLI: `vercel --prod` dentro da pasta).
3. Framework preset: **Other**. Sem build command, output = raiz.
4. Adicionar o domínio em **Settings → Domains** e atualizar as URLs do item 5.

## 10. Checklist de entrega

- [x] Headline com "Marmoraria" e "perto de você"
- [x] SEO on-page (title, description, canonical, headings, alt)
- [x] Open Graph + Twitter Card
- [x] JSON-LD LocalBusiness (HomeAndConstructionBusiness) + FAQPage
- [x] sitemap.xml
- [x] robots.txt
- [x] site.webmanifest + favicons
- [x] vercel.json
- [x] Página de obrigado
- [x] Página 404 personalizada
- [x] Botão flutuante de WhatsApp
- [x] Formulário com botão desabilitado até validar
- [x] Rodapé "Desenvolvido pro QH4 Growth" com link para @qh4growth
- [x] HTML validado sem erros (html-validate) e JS sem erros no console
- [x] Testado em 1440px e 390px, sem rolagem horizontal
- [ ] GTM real
- [ ] Domínio final
