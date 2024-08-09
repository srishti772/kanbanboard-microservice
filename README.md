# Kanban Board Project

## Overview

This project is a Kanban board application using a microservices architecture. The application consists of a Spring Boot app, a Node.js microservice, and utilizes various technologies and tools to manage tasks and user authentication efficiently.

## Tech Stack

- **Backend:**
  - Spring Boot
  - Node.js
  - Hibernate
  - MongoDB
  - Docker
  - REST API
  - Spring Cloud (including Eureka, Config Server, Gateway)
- **Frontend:**
  - Angular

## Features

- **Microservices Architecture:**
  - Scalable design with Spring Boot and Node.js microservices.
  - Service discovery with Eureka.
  - Centralized configuration with Spring Cloud Config Server.
  - API Gateway with Spring Cloud Gateway for routing and security.
- **Security:**
  - JWT authentication and authorization.
  - Middleware to verify JWT tokens.

## Setup and Configuration

### Spring Boot Application

1. **WebClient Configuration:**

   - Configured `WebClient` to make internal requests with a specific header to avoid circular authentication.
   - `WebClientConfig` class defines the `WebClient` bean used for service communication.

2. **User Management Service Implementation:**
   - `User Management Service` utilizes `WebClient` to fetch tasks from the Node.js microservice, handling exceptions and service unavailability.

### Node.js Microservice

1. **JWT Middleware:**
   - Middleware to authenticate JWT tokens from incoming requests.
   - Handles token validation and verification against a user service endpoint.
   - Includes logic to bypass authentication for internal requests.

## Known Issues

- **Circular Authentication Issue:**
  - A loop issue arises when the Spring Boot app makes requests to the Node.js microservice, which also performs authentication. To resolve this, add a custom header to indicate internal requests.

## Implementation Details

- **Service Registration:**

  - Both services (Spring Boot and Node.js) are registered with Eureka for service discovery and load balancing.

- **Custom Header for Internal Requests:**

  - Add an `X-Internal-Request: true` header to requests from the Spring Boot app to Node.js microservice to bypass authentication.

- **Error Handling:**
  - Handled exceptions and errors gracefully in the `WebClient` and JWT middleware, ensuring robust error reporting and service availability checks.

## Running the Project

1. **Spring Boot Application:**

   - Ensure that `application.properties` is configured correctly for Eureka, Config Server, and other necessary settings.

2. **Node.js Microservice:**

   - Ensure that the microservice is running and accessible for the Spring Boot app to make requests.

3. **Docker:**
   - Use Docker to containerize the services for easier deployment and management.

## Future Improvements

- **Enhanced Security:**

  - Explore advanced security measures to further protect endpoints and data.

- **Performance Optimization:**

  - Analyze and optimize the performance of microservices and communication.

- **Additional Features:**
  - Consider adding new features to the Kanban board based on user feedback and requirements.

## Contact

For any questions or further information, please contact:

- **Name:** Srishti Ahirwar
- **Phone:** (857) 829-0238
