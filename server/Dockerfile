FROM node:lts-alpine AS BUILD

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:lts-alpine AS PROD

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8000

COPY --from=BUILD /app/build/ ./

EXPOSE 8000

CMD [ "node", "index.js" ]
