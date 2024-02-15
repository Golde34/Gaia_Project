FROM openjdk:17-slim

WORKDIR /backend/authentication_manager

COPY /auth_service /backend/authentication_manager/auth_service

RUN mvn clean install -f /backend/authentication_manager/auth_service/pom.xml

EXPOSE 4001

CMD ["java", "-jar", "/backend/authentication_manager/auth_service/target/0.0.1.jar"]