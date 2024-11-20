FROM maven:3.8-openjdk-17-slim AS build
WORKDIR /app
COPY . .
RUN mvn install
EXPOSE 8761
CMD ["mvn", "spring-boot:run"]
