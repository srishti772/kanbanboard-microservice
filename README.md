# Kanban Board Project

## Overview

This project is a Kanban board application using a microservices architecture. The application consists of a Spring Boot app, a Node.js microservice, and utilizes various technologies and tools to manage tasks and user authentication efficiently.


### Kubernetes Deployment

Each microservice is defined in its own Kubernetes deployment YAML file. The setup includes:

- **InitContainers**: These containers ensure that dependent services are up and running before starting the main container of the microservice.
- **ConfigMaps**: Used for storing non-sensitive configuration data, like service URLs.
- **Secrets**: Securely stores sensitive information like DB credentials and Gmail API credentials.
- **StatefulSets**: For stateful services like MongoDB and MySQL, to manage persistent storage and ensure stable network identities.
- **Kubernetes Services**: Facilitate internal communication between services using stable DNS names.

### External Access

The **Cloud Gateway** is exposed via a LoadBalancer service, providing a single entry point for external users to interact with the application.

## CI/CD Pipeline

### Overview

The pipeline automates the process of building and deploying microservices to Amazon EKS, with Docker images stored in Amazon ECR. It is triggered whenever there is a push to the `main` branch.

### Steps in the Pipeline

1. **Triggering the Workflow**:
   - The workflow is triggered when changes are pushed to the `main` branch.

2. **AWS CLI Setup**:
   - The AWS CLI is configured using the `aws-actions/configure-aws-credentials` action, with credentials securely stored in GitHub Secrets.

3. **Docker Buildx Setup**:
   - The `docker/setup-buildx-action` is used to enable advanced Docker build capabilities, including multi-platform builds.

4. **Building and Pushing Docker Images**:
   - Each microservice is built and tagged with the ECR registry URL and the Git commit SHA.
   - Docker images are built for each service (e.g., `config-server`, `api-gateway`, `notification-management`, etc.).
   - After building, the images are pushed to the private Amazon Elastic Container Registry (ECR) for storage.

5. **Deploying to Kubernetes**:
   - The pipeline updates the kubeconfig to authenticate with the EKS cluster.
   - A Kubernetes secret (`my-ecr-secret`) is created (if not already present) to allow Kubernetes to securely pull images from private ECR.
   - The Kubernetes deployment YAML files are dynamically updated with the latest `ECR_REGISTRY` and `IMAGE_TAG` values.

### Why It’s Important

This CI/CD pipeline ensures that:
- **Consistency**: All services are built, tagged, and deployed with the same commit ID, ensuring version control and traceability.
- **Automated Deployment**: Kubernetes always pulls the latest version of the Docker images automatically, reducing manual intervention.
  
## Kubernetes Architecture

1. **Deployment**:
   - Each microservice is deployed as a Kubernetes Deployment resource, with replicas for high availability.
   - **InitContainers** verify that dependencies are up and running before starting the service.

2. **ConfigMaps and Secrets**:
   - **ConfigMaps**: Store URLs and other non-sensitive configurations like service endpoints.
   - **Secrets**: Store sensitive credentials (e.g., MySQL root password, Gmail API credentials, MongoDB credentials) securely.
   
3. **Stateful Services**:
   - **StatefulSets** are used for stateful services like MongoDB and MySQL, ensuring persistent storage and stable network identities.
   
4. **Scaling**:
   - Each service is scalable by adjusting the number of replicas in the deployment.

5. **Health Checks**:
   - **LivenessProbe** and **ReadinessProbe** are used for ensuring the health of pods and minimizing downtime.

## Persistent Storage

- **MongoDB** and **MySQL** are configured with persistent storage using EBS volumes, ensuring data persistence even when pods are terminated or restarted.
- The PersistentVolumeClaims (PVCs) automatically provision the necessary storage.

## Challenges and Optimizations

- **Service Dependency Management**: We use initContainers to verify the readiness of other services before starting a microservice.
- **Efficient Resource Allocation**: Pods are configured with resource requests and limits to ensure efficient use of cluster resources.
- **Secure Secrets Handling**: Secrets like database credentials are securely stored and injected into containers as environment variables.
- **Probes**: Liveness and readiness probes ensure that Kubernetes automatically restarts services if they become unresponsive.

## Future Enhancements

- **Automated Testing**: Add unit and integration tests to the pipeline to improve quality assurance.
- **Monitoring and Logging**: Integrate AWS CloudWatch and Prometheus for enhanced monitoring and logging of microservices.
- **Security Enhancements**: Implement Kubernetes Network Policies to restrict communication between services based on security requirements.

## Getting Started

1. Set up an AWS account with ECR and EKS. ( I will come up eith a Terraform code for this soon), till then manually setup a cluster and all ECR private repositories like (api-dateway, user-management, notification-managemnent, task-management and config-server. Will will be pushing Docker images via CI/CD into these)
3. Create the below as environment secrets in github repository AWS credentials.
- AWS_REGION
- EKS_CLUSTER_NAME
- AWS_ACCESS_KEY_ID_DEV
- AWS_SECRET_ACCESS_KEY_DEV
4. Run the github action workflow. Use command kubectl get all to see deployed resources.



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
The **Service Registry** enables dynamic service discovery and registration. This is later replaced with Kubernetes Services during deployment to cloud.

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
