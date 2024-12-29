# Stage 1: Build stage
FROM node:18-slim AS builder

WORKDIR /frontend/client_gui/

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Production stage
FROM node:18-alpine

WORKDIR /frontend/client_gui/

COPY --from=builder /frontend/client_gui/node_modules ./node_modules
COPY --from=builder /frontend/client_gui/package*.json ./
COPY --from=builder /frontend/client_gui/src ./src
COPY --from=builder /frontend/client_gui/public ./public
COPY --from=builder /frontend/client_gui/vite.config.js ./
COPY --from=builder /frontend/client_gui/tailwind.config.js ./
COPY --from=builder /frontend/client_gui/index.html ./

EXPOSE 5173

CMD ["npm", "run", "dev"]
