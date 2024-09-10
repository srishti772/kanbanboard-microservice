# Kanban Board Project

## Overview

This project is a Kanban board application using a microservices architecture. The application consists of a Spring Boot app, a Node.js microservice, and utilizes various technologies and tools to manage tasks and user authentication efficiently.
## Tech Stack

- **Backend:** 
     
  - ### Technologies Used:
- **Spring Boot + SQL and Node js + MongoDB** for microservices
- **RabbitMQ** for message queuing
- **Eureka** for service registry
- **Spring Cloud** for  Config Server, API Gateway
- **Spring Security** for securing API endpoints and RBAC
- **Angular** for frontend development
- **JWT** for secure authentication
- **Docker** for containerization

## Features

- **Microservices Architecture:**
  - Scalable design with Spring Boot and Node.js microservices.
  - Service discovery with Eureka.
  - Centralized configuration with Spring Cloud Config Server.
  - API Gateway with Spring Cloud Gateway for routing and security.
- **Security:**
  - Centralised JWT authentication and authorization.
  - Spring Security to secure API endpoints.

## Setup and Configuration

### Spring Boot Microservices

# Kanban Board Microservice

## Overview

This project is a Kanban board application built with a microservices architecture. It uses Spring Boot, Node.js, and various backend technologies to manage tasks, users, and handle authentication.

# Microservices Architecture Overview

This document provides an overview of the components in the microservices architecture for the Kanban board application.

## 1. API Gateway
The **API Gateway** serves as the single entry point for all client requests.

### Responsibilities:
- **Request Routing:** Routes incoming requests to the appropriate backend microservice.
- **Load Balancing:** Distributes traffic across multiple instances of microservices to improve performance and availability.
- **Security:** Implements security measures such as JWT (JSON Web Token) verification for authentication and authorization.
- **Aggregation:** Combines responses from multiple services into a single response for the client, improving efficiency.

## 2. Config Server
The **Config Server** manages the configuration settings for all microservices, centralizing configurations for better maintainability and consistency.

### Responsibilities:
- **Centralized Configuration:** Provides a single source of configuration for all microservices, ensuring consistency.
- **Dynamic Updates:** Supports hot-reloading of configuration changes without restarting services.
- **Security:** Sensitive configuration values (e.g., passwords) can be encrypted.

## 3. Service Registry (Eureka)
The **Service Registry** enables dynamic service discovery and registration.

### Responsibilities:
- **Service Discovery:** Microservices can register themselves and discover other services dynamically.
- **Load Balancing:** Supports client-side load balancing, allowing services to balance requests across multiple instances.
- **Heartbeat Monitoring:** Continuously monitors the health of registered services and deregisters unhealthy instances.

## 4. Task Management Service
The **Task Management Service** handles all task-related operations in the Kanban board.

### Responsibilities:
- **CRUD Operations:** Provides APIs for creating, reading, updating, and deleting tasks.
- **Data Storage:** Stores task data, including descriptions, owners, and statuses.
- **Message Producer:** Sends messages to a **RabbitMQ** queue when a task is created or updated to notify other services (e.g., Notification Service).

## 5. User Management Service
The **User Management Service** handles user-related functionality, such as registration, login, and authentication.

### Responsibilities:
- **User Authentication:** Manages user authentication using JWT tokens for secure session management.
- **User Registration:** Provides APIs for user registration and profile management.
- **Authorization:** Secures endpoints based on user roles and permissions.

## 6. Frontend (Angular)
The **Frontend** is an Angular-based user interface for interacting with the Kanban board.

### Responsibilities:
- **Task Management:** Provides a clean and intuitive interface for users to create, edit, and manage tasks.
- **User Authentication:** Implements user login, registration, and JWT-based authentication mechanisms.
- **Real-time Updates:** Displays real-time updates of tasks and notifications using web sockets or polling.

## 7. Notification Service
The **Notification Service** reads messages from the RabbitMQ queue and sends notifications to users.

### Responsibilities:
- **Message Consumer:** Consumes messages from the RabbitMQ queue when tasks are created or updated.
- **Notification Sending:** Sends notifications to task owners when a task is created and to the new owner when a task is updated.
- **Communication Channels:** Can be configured to send notifications via different channels like email or in-app notifications.

### Getting Started:
1. Clone the repository.
2. Install the necessary dependencies for each microservice.
3. Run the services using Docker Compose or Kubernetes for orchestration.
4. Access the application via the API Gateway.

## Contact

- **Author**: Srishti Ahirwar
- **Phone:** (857) 829-0238
