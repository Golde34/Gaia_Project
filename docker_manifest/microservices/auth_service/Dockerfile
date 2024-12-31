FROM openjdk:17-jdk-slim

WORKDIR /backend/auth_service/

COPY target/auth_service-0.0.1.jar auth_service.jar
COPY src/main/resources/application-docker.properties backend/auth_service/application.properties

EXPOSE 4001 

ENTRYPOINT ["java", "-jar", "auth_service.jar", "--spring.config.location=classpath:/application.properties"]