FROM openjdk:17-jdk-slim

WORKDIR /backend/work_optimization/

COPY target/work_optimization-0.0.1.jar work_optimization.jar
COPY src/main/resources/application-docker.properties backend/work_optimization/application.properties

EXPOSE 3001

ENTRYPOINT ["java", "-jar", "work_optimization.jar", "--spring.config.location=classpath:/application.properties"]
