FROM node:16

WORKDIR /app

COPY ./code/package.json .

RUN npm install

CMD [ "sh", "-c", "npm run dev" ]
