const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const { connectDB } = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const loadConfig = require("./config/configLoader");
const registerService = require("./config/eurekaClient");
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

    // Initialize Zipkin Tracer
    await initializeTracer();

    // Log loaded environment variables

    const port = process.env.SERVER_PORT;
    const mongoUri = process.env.MONGODB_URI; // Get MongoDB URI from environment variables

    // Connect to the database
    await connectDB(mongoUri);

    // Middleware
    app.use(express.json());

    // Middleware for Zipkin tracing
    // Zipkin Trace Middleware
    // Zipkin Trace Middleware
    const tracer = getTracer();
    app.use(
      expressMiddleware({ tracer, serviceName: process.env.EUREKA_APPNAME })
    );

    // Routes
    app.use("/api/tasks", taskRoutes);

    app.get("/status", (req, res, next) => {
      res
        .status(200)
        .json({ message: "Connected to task-management microservice" });
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
