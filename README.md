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
  - Spring Security
  - JWT Authentication
- **Frontend:**
  - Angular

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

## Microservices Overview

### 1. **API Gateway**

- Acts as the single entry point for clients.
- Routes requests to appropriate services.
- Implements security and JWT token verification.

### 2. **Config Server**

- Manages configuration settings for all microservices.
- Centralizes configurations for easier maintenance.

### 3. **Service Registry (Eureka)**

- Handles service discovery and load balancing.
- Allows microservices to dynamically register and locate each other.

### 4. **Task Management Service**

- Manages task-related operations.
- Stores task data and supports CRUD operations for tasks.

### 5. **User Management Service**

- Handles user-related functionality like registration, login, and authentication.
- Implements JWT-based security for managing user sessions.

### 6. **Frontend**

- Angular-based UI for interacting with the Kanban board.
- Provides a clean interface for users to manage tasks.

## Tech Stack

- **Backend**: Spring Boot, Node.js, MongoDB, Hibernate, Spring Cloud
- **Frontend**: Angular
- **Security**: JWT, Spring Security
- **Deployment**: Docker

## Setup

1. Clone the repository.
2. Run each microservice as Docker containers.
3. Ensure the configuration server and Eureka registry are up before launching other services.

## Contact

- **Author**: Srishti Ahirwar
- **Phone:** (857) 829-0238
