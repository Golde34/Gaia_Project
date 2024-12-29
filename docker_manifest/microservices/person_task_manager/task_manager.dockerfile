# Stage 1: Build stage
FROM node:18-slim AS builder

WORKDIR /backend/person_task_manager/

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Production stage
FROM node:18-alpine

WORKDIR /backend/person_task_manager/

COPY --from=builder /backend/person_task_manager/node_modules ./node_modules
COPY --from=builder /backend/person_task_manager/package*.json ./
COPY --from=builder /backend/person_task_manager/src ./src
COPY --from=builder /backend/person_task_manager/tsconfig.json ./

COPY ./src/.env.docker ./src/.env

EXPOSE 3000

CMD ["npm", "run", "dev"]