FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json prisma ./
RUN npm install

COPY . .

# Gera Prisma Client
RUN npx prisma generate

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Copia o client do Prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma

CMD ["node", "dist/main.js"]
