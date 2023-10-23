# Dockerfile

FROM node:20

WORKDIR /

COPY . .

RUN npm install

CMD ["npm", "start"]