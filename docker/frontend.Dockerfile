ARG APP_PATH

FROM node:22-alpine AS build
ARG APP_PATH
ARG VITE_API_URL=
ARG VITE_INVITATION_URL=

WORKDIR /app
COPY . .

RUN npm install --workspace apps/${APP_PATH} \
    && VITE_API_URL="${VITE_API_URL}" VITE_INVITATION_URL="${VITE_INVITATION_URL}" npm run build --workspace apps/${APP_PATH}

FROM nginx:1.27-alpine
ARG APP_PATH

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/${APP_PATH}/dist /usr/share/nginx/html

EXPOSE 80