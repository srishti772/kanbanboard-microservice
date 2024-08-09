const axios = require("axios");
const client = require("./eurekaClient");

const getServiceUrl = (serviceName) => {
  return new Promise((resolve, reject) => {
    client.getInstancesByAppId(serviceName, (err, instances) => {
      if (err) {
        return reject(err);
      }
      if (instances.length === 0) {
        return reject(new Error("No instances found"));
      }
      const instance = instances[0];
      const serviceUrl = `${instance.homePageUrl}/api/auth/validate-token`;
      resolve(serviceUrl);
    });
  });
};

module.exports = {
  getServiceUrl,
};
