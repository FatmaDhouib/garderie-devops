FROM node:24-alpine

ENV NODE_ENV=production
ENV PORT=3001

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src/ ./src/

EXPOSE 3001

USER node

CMD ["npm", "start"]
