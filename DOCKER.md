# 🐳 Docker - Guia de Uso

Este projeto está totalmente configurado para rodar em Docker. Aqui estão as instruções.

## 📋 Pré-requisitos

- Docker instalado ([download aqui](https://www.docker.com/products/docker-desktop))
- Docker Compose instalado (geralmente já vem com Docker Desktop)

## 🚀 Quick Start

### Build da imagem Docker

```bash
docker build -t massape-fascinante:latest .
```

### Rodar o container

```bash
docker run -p 3000:3000 massape-fascinante:latest
```

Acesse `http://localhost:3000` no seu navegador.

## 🐳 Com Docker Compose (Recomendado)

### Build e iniciar

```bash
docker-compose up --build
```

### Apenas iniciar (sem rebuild)

```bash
docker-compose up
```

### Parar os containers

```bash
docker-compose down
```

### Ver logs

```bash
docker-compose logs -f frontend
```

## 🛠️ Desenvolvimento Local vs Docker

### Para desenvolvimento (sem Docker)

```bash
pnpm install
pnpm dev
```

Acesse `http://localhost:3000`

### Para produção (com Docker)

```bash
docker-compose up --build
```

## 📊 Informações da Imagem

- **Node**: 18-alpine
- **Gerenciador de pacotes**: pnpm
- **Framework**: Next.js 15
- **Porta**: 3000

## 🔒 Segurança

- ✅ Usa usuário não-root (`nextjs` UID 1001)
- ✅ Build em múltiplos estágios para reduzir tamanho
- ✅ Health check integrado
- ✅ Variáveis de ambiente configuradas

## 📏 Tamanho da Imagem

A imagem usa multi-stage build para manter o tamanho reduzido:

- **deps**: dependências de desenvolvimento
- **builder**: compilação do Next.js
- **runner**: apenas os arquivos necessários para produção

## 🌐 Variáveis de Ambiente

Se precisar passar variáveis de ambiente, use:

```bash
docker run -e NODE_ENV=production -e NEXT_PUBLIC_API_URL=https://api.massapefascinante.com.br -p 3000:3000 massape-fascinante:latest
```

Ou no `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_API_URL=https://api.massapefascinante.com.br
```

## 📝 Troubleshooting

### Container não inicia

```bash
docker-compose logs frontend
```

### Limpar e recriar tudo

```bash
docker-compose down --volumes
docker-compose up --build
```

### Remover imagem

```bash
docker rmi massape-fascinante:latest
```

## 📱 API Configurada

O Next.js está configurado para aceitar imagens remotas de:

- `https://api.massapefascinante.com.br/api/uploads/**`
- `http://localhost:4444/uploads/**` (desenvolvimento)

Certifique-se de que essas URLs estão acessíveis quando rodar em produção.
