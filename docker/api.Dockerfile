FROM node:22-alpine

WORKDIR /app

COPY package.json ./package.json
COPY apps/api/package.json ./apps/api/package.json
COPY apps/wedding-invitation/package.json ./apps/wedding-invitation/package.json
COPY apps/admin/package.json ./apps/admin/package.json

RUN npm install --omit=dev --workspace apps/api --include-workspace-root=false

COPY apps/api ./apps/api

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["npm", "run", "start", "--workspace", "apps/api"]