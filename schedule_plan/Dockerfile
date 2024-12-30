# Stage 1: Build stage
FROM node:18-slim AS builder

WORKDIR /backend/schedule_plan/

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Production stage
FROM node:18-alpine

WORKDIR /backend/schedule_plan/

COPY --from=builder /backend/schedule_plan/node_modules ./node_modules
COPY --from=builder /backend/schedule_plan/package*.json ./
COPY --from=builder /backend/schedule_plan/src ./src
COPY --from=builder /backend/schedule_plan/tsconfig.json ./

COPY ./src/.env.docker ./src/.env

EXPOSE 3000

CMD ["npm", "run", "dev"]
