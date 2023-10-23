# Dockerfile

FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
COPY src/ ./src/
COPY public/ ./public/

RUN npm install
RUN npm run build

CMD ["npm", "start"]