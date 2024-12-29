FROM node:18

WORKDIR /backend/schedule_plan/

COPY package*.json ./
RUN npm install

COPY . .
COPY ./src/.env.docker ./src/.env

EXPOSE 3000

CMD ["npm", "run", "dev"]
