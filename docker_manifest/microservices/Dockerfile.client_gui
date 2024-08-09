FROM node:slim

WORKDIR /frontend/client_gui

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "run", "dev"]