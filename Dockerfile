FROM node:16-alpine as base
COPY . /workspace
WORKDIR /workspace
RUN npm install
CMD npm start

FROM node:16-alpine as builder
COPY --from=base /workspace/node_modules /workspace/node_modules
COPY --from=base /workspace/src /workspace/src
COPY --from=base /workspace/index.html /workspace/index.html
COPY --from=base /workspace/package.json /workspace/package.json
COPY --from=base /workspace/tsconfig.json /workspace/tsconfig.json
COPY --from=base /workspace/rollup.config.js /workspace/rollup.config.js
WORKDIR /workspace
RUN npm run build

FROM builder as dev
EXPOSE 8000
COPY --from=base /workspace/*.js /workspace
COPY --from=base /workspace/*.json /workspace
COPY --from=base /workspace/*.mjs /workspace
CMD npm start -- -a 0.0.0.0

FROM dev as tester
RUN apk add chromium
COPY --from=base /workspace/test /workspace/test
RUN ls -lash
CMD npm run test

FROM nginx:latest as prod
COPY --from=builder /workspace/dist /usr/share/nginx/html
