# Blog PHP Tecnologia EBAC - Estudo

> Uma aplicação moderna de blog desenvolvida com Next.js 15 e TypeScript, focada em artigos sobre PHP e tecnologias relacionadas.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)

## Funcionalidades

###  Core Features
- ** Blog Dinâmico**: Listagem de artigos com paginação e filtros
- ** SEO Otimizado**: Metadados dinâmicos para cada artigo
- ** Design Responsivo**: Interface adaptável para todos os dispositivos
- ** Performance**: SSG/ISR com revalidação inteligente
- ** Sistema de Tags**: Categorização e filtros por tags
- ** Otimização de Imagens**: Next.js Image Optimization

###  Funcionalidades Técnicas
- ** Geração de Slugs**: Sistema robusto usando `slugify`
- ** Roteamento Dinâmico**: `[slug]` routes para artigos
- ** ISR (Incremental Static Regeneration)**: Atualizações automáticas
- ** Integração com DEV.to API**: Fonte de conteúdo externa
- ** Loading States**: UX aprimorada com componentes de loading
- ** Error Handling**: Páginas 404 personalizadas

## Arquitetura do Projeto

```
src/
├── app/                   
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial (lista de artigos)
│   └── artigos/[slug]/    # Páginas dinâmicas de artigos
│       ├── page.tsx       # Conteúdo do artigo
│       ├── loading.tsx    # Loading state
│       └── not-found.tsx  # Página 404
├── components/            # Componentes reutilizáveis
├── interfaces/           # Definições TypeScript
│   └── interface.ts      # Interface BlogPost
├── services/            # Camada de serviços
│   └── service.ts       # API calls e lógica de negócio
├── utils/               # Utilitários
    ├── api.ts          # Configuração do Axios
    ├── slug.ts         # Funções para manipulação de slugs
    └── limparUrlImagem.ts # Utilitário para URLs de imagens
```

## Tecnologias Utilizadas

### Frontend
- **[Next.js 15.5.4](https://nextjs.org/)** - Framework React com App Router
- **[React 19.1.0](https://reactjs.org/)** - Biblioteca para interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset tipado do JavaScript

### Utilitários
- **[Axios](https://axios-http.com/)** - Cliente HTTP para APIs
- **[Slugify](https://www.npmjs.com/package/slugify)** - Geração de slugs SEO-friendly

### Fonte de Dados
- **[DEV.to API](https://developers.forem.com/api)** - API pública para artigos sobre PHP

## Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm, yarn, pnpm ou bun

### 1. Clone o repositório
```bash
git clone https://github.com/andsonalex-dev/ebac-blog-php-nextjs.git
cd ebac-blog-php-nextjs
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Execute o projeto em desenvolvimento
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

### 4. Acesse a aplicação
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run dev:turbo` | Inicia com Turbopack (experimental) |
| `npm run build` | Gera build de produção |
| `npm run start` | Inicia servidor de produção |

## Funcionalidades Detalhadas

### Sistema de Slugs
O projeto utiliza a biblioteca `slugify` para gerar URLs amigáveis:

```typescript
// Exemplo de uso
import { generateSlug, normalizeSlug, compareSlugs } from '@/utils/slug';

const title = "Como Criar APIs REST com PHP";
const slug = generateSlug(title); // "como-criar-apis-rest-com-php"
```

### Metadados Dinâmicos
Cada artigo possui metadados otimizados para SEO e redes sociais:

```typescript
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Gera title, description, Open Graph, Twitter Cards, etc.
}
```

### ISR (Incremental Static Regeneration)
- **Página inicial**: Revalidação a cada 60 segundos
- **Páginas de artigos**: Revalidação a cada 3600 segundos (1 hora)
- **Geração estática**: 10 artigos mais recentes

## Integração com APIs

### DEV.to API
A aplicação consome a API do DEV.to para obter artigos:

- **Endpoint**: `https://dev.to/api/articles?tag=php&top=10`
- **Filtros**: Artigos com tag "php", ordenados por popularidade
- **Limite**: 10 artigos mais populares

## Design Responsivo

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para tablet e desktop
- **Imagens Responsivas**: Next.js Image component
- **Performance**: Lazy loading e otimizações automáticas

## SEO e Performance

### Otimizações Implementadas
-  Metadados dinâmicos por página
-  Open Graph
-  URLs semânticas com slugs
-  Sitemap automático
-  Robots.txt configurado
-  Otimização de imagens
-  Loading states para UX
-  Error boundaries

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
