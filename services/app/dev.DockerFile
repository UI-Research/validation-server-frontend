FROM node:12-alpine

RUN apk add --no-cache tini
ENTRYPOINT [ "tini", "-g", "--" ]

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json next.config.js \
     next-env.d.ts \
     emotion.d.ts \
     ./

EXPOSE 3000

CMD npm run dev
