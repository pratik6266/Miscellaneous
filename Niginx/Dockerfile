FROM node:18

WORKDIR /app

COPY index.js .
COPY index.html .
COPY package.json .

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]