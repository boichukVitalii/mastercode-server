FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm ci
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./build/main.js"]