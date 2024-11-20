const mongoose = require("mongoose");


const connectDB = async () => {
  const mongodbUsername = process.env.MONGODB_USERNAME || '';
const mongodbPassword = process.env.MONGODB_PASSWORD ? `:${process.env.MONGODB_PASSWORD}` : '';
const mongodbHost = process.env.MONGODB_HOST || 'localhost';

//const mongodbUri = `mongodb://${mongodbUsername}${mongodbPassword}@${mongodbHost}:27017/kanbanboard?authSource=admin`;
const mongodbUri = `mongodb://${mongodbHost}:27017/kanbanboard`;

console.log("MongoDB URI:", mongodbUri);
  await mongoose
    .connect(mongodbUri)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB",err);
    });
};
module.exports = { connectDB };
