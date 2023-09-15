FROM node:16-alpine AS builder

WORKDIR /app

COPY aws-fe/package.json aws-fe/package-lock.json ./
COPY aws-fe/public/ public/
COPY aws-fe/src/ src/
RUN npm ci
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.25.2-alpine3.18

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

ENV REACT_APP_USERNAME = "admin" \
    REACT_APP_API_URL = "http://jswntreports.com" \
    REACT_APP_USERNAME = "admin" \
    REACT_APP_PASSWORD = "admin" \
    REACT_APP_LESSECODE = "0006" \
    REACT_APP_LESSENAME = "Devdari" \
    REACT_APP_BULKPERMITCODE = "98765412345678"

USER nginx
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]