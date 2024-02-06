FROM node:slim

WORKDIR /backend/task_manager/

COPY package*.json ./
RUN npm install
RUN npm install -g typescript pm2

COPY src /backend/task_manager/src
COPY .env /backend/task_manager/src/.env
COPY tsconfig.json .
RUN npm run dev

EXPOSE 3000

CMD ["pm2-runtime", "dist/main.js"]