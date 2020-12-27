FROM node:8.11.2

RUN mkdir -p /usr/src/example

COPY dist/example/ /usr/src/example/dist/example
COPY cert /usr/src/example/cert
COPY authMiddleware.js /usr/src/example/
COPY serverdata.json /usr/src/example/
COPY server.js /usr/src/example/server.js
COPY deploy-package.json /usr/src/example/package.json

WORKDIR /usr/src/example

RUN npm install
EXPOSE 80

CMD ["node","server.js"]