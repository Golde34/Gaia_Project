## Create timescaledb container
docker run -d \                             
  --name timescaledb \
  -e POSTGRES_PASSWORD=483777 \
  -p 5432:5432 \
  timescale/timescaledb:latest-pg14

## Start timescaledb container
docker start timescaledb

## Stop timescaledb container
docker stop timescaledb

## Exec into timescaledb container
docker exec -it timescaledb psql -U postgres

## Create new user and database
CREATE USER admin WITH PASSWORD 'admin';
CREATE DATABASE tsdb;