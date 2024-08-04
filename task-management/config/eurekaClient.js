const Eureka = require("eureka-js-client").Eureka;
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Load environment variables from .env.config file
dotenv.config({ path: path.resolve(__dirname, "..", ".env.config") });

const createEurekaClient = () => {
  return new Eureka({
    instance: {
      app: process.env.EUREKA_APPNAME || "l",
      instanceId: process.env.EUREKA_INSTANCEID,
      hostName: process.env.EUREKA_HOSTNAME,
      ipAddr: process.env.EUREKA_IPADDR,
      port: {
        $: process.env.SERVER_PORT,
        "@enabled": true,
      },
      vipAddress: process.env.EUREKA_VIPADDRESS || "1",
      secureVipAddress: process.env.EUREKA_SECUREVIPADDRESS,
      statusPageUrl: `http://${process.env.EUREKA_HOSTNAME}:${process.env.SERVER_PORT}/status`,
      healthCheckUrl: `http://${process.env.EUREKA_HOSTNAME}:${process.env.SERVER_PORT}/health`,
      homePageUrl: `http://${process.env.EUREKA_HOSTNAME}:${process.env.SERVER_PORT}`,
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: process.env.EUREKA_DATACENTERNAME,
      },
    },
    eureka: {
      host: process.env.EUREKASERVER_HOST,
      port: process.env.EUREKASERVER_PORT,
      servicePath: process.env.EUREKASERVER_SERVICEPATH,
    },
  });
};

// Register service with Eureka
const registerService = async () => {
  const eurekaClient = createEurekaClient();

  return new Promise((resolve, reject) => {
    eurekaClient.start((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = registerService;
