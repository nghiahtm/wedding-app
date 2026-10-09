# Chỉ build thiệp mời. Trang admin không được đóng gói và chỉ chạy local.
FROM node:22-alpine AS build
ARG VITE_API_URL=

WORKDIR /app
COPY . .

RUN npm install --workspace apps/wedding-invitation     && VITE_API_URL="${VITE_API_URL}" npm run build --workspace apps/wedding-invitation

FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/wedding-invitation/dist /usr/share/nginx/html

EXPOSE 80
