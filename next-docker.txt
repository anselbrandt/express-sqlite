FROM node:16-alpine AS web_deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY web/package.json web/yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine AS web_builder
WORKDIR /app
COPY --from=web_deps /app/node_modules ./node_modules
COPY web/. .
RUN yarn build

FROM node:16-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=web_builder /app/public ./public
COPY --from=web_builder /app/package.json ./package.json
COPY --from=web_builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=web_builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 5000

ENV PORT 5000

CMD ["node", "server.js"]