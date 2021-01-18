FROM node:8-slim

RUN mkdir -p /usr/src/
WORKDIR /usr/src/
COPY . /usr/src/

RUN npm install typescript
RUN npm install .

ENV NODE_ENV development
EXPOSE 8000

CMD ["npm", "run", "start"]
