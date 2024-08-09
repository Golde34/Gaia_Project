FROM node:slim

WORKDIR /backend/task_manager/

COPY package*.json ./
RUN npm install

COPY src /backend/task_manager/src
COPY .env /backend/task_manager/src/.env
COPY tsconfig.json .
RUN npm run dev

EXPOSE 3000

CMD ["npm", "run", "dev"]
```