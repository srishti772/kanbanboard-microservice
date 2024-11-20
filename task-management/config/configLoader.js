const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
dotenv.config();

const CONFIG_SERVER_URL = process.env.CONFIG_SERVER_URL;
const SERVICE_NAME = process.env.SERVICE_NAME;

const loadConfig = async () => {
  console.log("Configuration is loadingg...", CONFIG_SERVER_URL);

  try {
    const response = await axios.get(
      `${CONFIG_SERVER_URL}/${SERVICE_NAME}/default`
     
    );
    const config = response.data;

    if (config && config.propertySources && config.propertySources.length > 0) {
      const properties = config.propertySources[0].source;

      // Convert properties to environment variable format
      const envFileContent = Object.entries(properties)
        .map(([key, value]) => {
          const envKey = key.replace(/\./g, "_").toUpperCase();
          return `${envKey}=${value}`;
        })
        .join("\n");

      // Save to .env.config
      const filePath = path.join(__dirname, "..", ".env.config");
      fs.writeFileSync(filePath, envFileContent, "utf8");
      console.log("Configuration loaded and .env.config file updated.");

      // Load the newly created .env.config file
      dotenv.config({ path: filePath });
    }
  } catch (err) {
    console.error(
      "Error fetching configuration from Config Server:",
      err.message
    );
    throw new Error("Failed to load configuration");
  }
};

module.exports = loadConfig;
