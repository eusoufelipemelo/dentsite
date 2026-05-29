# DentSite

Landing page para o serviço **DentSite** — criação e hospedagem de sites para consultórios odontológicos, com entrega em 3 dias úteis e otimização para Google + buscas com IA (SSEO/GEO).

🌐 **Produção:** [dentsite.com.br](https://dentsite.com.br)

## Stack

- **Next.js 15** (App Router, JavaScript)
- **React 19**
- **CSS** puro com variáveis (sem framework)
- Renderização **estática (SSG)** para SEO máximo
- Hospedagem em **EasyPanel** com **Traefik** + **Let's Encrypt**

## Estrutura

```
app/
  layout.jsx           # html, fontes, metadata global / OG
  page.jsx             # home → renderiza <Landing/>
  globals.css          # CSS do projeto (landing + páginas legais)
  termos/page.jsx      # /termos
  privacidade/page.jsx # /privacidade
components/
  Landing.jsx          # landing completa (client component, interatividade)
  LegalShell.jsx       # cabeçalho/rodapé compartilhado das páginas legais
public/files/          # logo, favicon, OG image, selo de garantia
```

## Rodando localmente

```bash
npm install
npm run dev          # http://localhost:3000
```

Para testar a versão de produção:

```bash
npm run build
npm run start
```

## Deploy

O deploy é **automático**: cada `git push` no branch `main` dispara um rebuild no EasyPanel via webhook.

Build no EasyPanel:
1. Nixpacks detecta Next.js
2. `npm ci` → `npm run build` → `npm run start`
3. Traefik roteia `dentsite.com.br` / `www` → container porta 3000
4. SSL via Let's Encrypt (renovação automática)

Para deploy manual (caso necessário), basta clicar em **Implantar** no painel do EasyPanel.

## Domínios

- `dentsite.com.br` — principal
- `www.dentsite.com.br` — redireciona 301 para o principal (canônico)
- `http://` → redireciona para `https://`

---

Desenvolvido por [OutBox Group](https://outboxgroup.framer.ai/).
