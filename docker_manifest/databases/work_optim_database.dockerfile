# setup mysql
FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=483777
ENV MYSQL_DATABASE=work_optim_database
ENV MYSQL_USER=golde
ENV MYSQL_PASSWORD=483777

# Khoi tao cau lenh chay SQL sau
# COPY ./work_optim_database.sql /docker-entrypoint-initdb.d/