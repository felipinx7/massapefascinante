# ============================================
# Estágio 1: Dependencies
# ============================================
FROM node:18-alpine AS deps

WORKDIR /app

# Ativa o pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala dependências de produção e desenvolvimento
RUN pnpm install --frozen-lockfile

# ============================================
# Estágio 2: Builder
# ============================================
FROM node:18-alpine AS builder

WORKDIR /app

# Ativa o pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia dependências do estágio anterior
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./

# Copia package.json
COPY package.json ./

# Copia o restante do projeto
COPY . .

# Build do Next.js
RUN pnpm build

# ============================================
# Estágio 3: Runner (Produção)
# ============================================
FROM node:18-alpine AS runner

WORKDIR /app

# Define variável de ambiente
ENV NODE_ENV=production

# Ativa o pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Cria usuário não-root por segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copia apenas dependências de produção
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./

# Copia package.json
COPY package.json ./

# Copia arquivos de build do Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Define o usuário
USER nextjs

# Expõe a porta
EXPOSE 3000

# Define a porta como variável de ambiente
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Comando de inicialização
CMD ["pnpm", "start"]