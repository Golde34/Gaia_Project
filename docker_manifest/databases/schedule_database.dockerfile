
FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=golde
ENV MONGO_INITDB_ROOT_PASSWORD=483777
ENV MONGO_INITDB_DATABASE=schedule_database

COPY ./init-mongo.js /docker-entrypoint-initdb.d/