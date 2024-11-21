FROM maven:3.8-openjdk-17-slim AS build

WORKDIR /app

COPY . .

RUN mvn clean install -DskipTests

EXPOSE 8088

CMD ["mvn", "spring-boot:run"]