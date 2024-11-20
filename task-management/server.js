const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const { connectDB } = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const loadConfig = require("./config/configLoader");
const registerService = require("./config/eurekaClient");
const {setupRabbitMQ} = require('./rabbitMQ/initializer');
const mongoose = require("mongoose"); 
const dotenvExpand = require('dotenv-expand');
const dotenv = require('dotenv');


const {
  initializeTracer,
  getTracer,
  expressMiddleware,
} = require("./config/tracing");

const app = express();

const startServer = async () => {
  try {
    console.log("loading config");
    await loadConfig(); // Load configuration from Config Server

    const envConfig = dotenv.config({ path: '.env.config' });
    dotenvExpand.expand(envConfig);

    // Initialize Zipkin Tracer
    await initializeTracer();

    // Log loaded environment variables

    const port = process.env.SERVER_PORT;

    // Connect to the database
    await connectDB();

    // Middleware
    app.use(express.json());

    // Middleware for Zipkin tracing
    // Zipkin Trace Middleware
    // Zipkin Trace Middleware
    const tracer = getTracer();
    app.use(
      expressMiddleware({ tracer, serviceName: process.env.EUREKA_APPNAME })
    );

    //create rabbitMQqueues
    setupRabbitMQ();
    
    // Routes
    app.use("/api/tasks", taskRoutes);

    app.get("/health", (req, res, next) => {

      try {
        if (mongoose.connection.readyState !== 1) {
          throw new Error("MongoDB connection is not established");
        }

        res.status(200).json({ status: "Up" });
      } catch (error) {
        console.error("Health check failed:", error);
        res.status(503).json({ status: "Service Unavailable", error: error.message });
      }
      
    });

    // Error handling
    app.all("*", (req, res, next) => {
      const error = new Error(`Can't find ${req.originalUrl} on the server`);
      error.statusCode = 404;
      next(error);
    });

    app.use(errorHandler);

    app.listen(port, async () => {
      console.log(`Server running on http://localhost:${port}`);

      registerService()
        .then(() => {
          console.log("Service successfully registered with Eureka.");
        })
        .catch((error) => {
          console.error("Failed to register service with Eureka:", error);
        });
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
