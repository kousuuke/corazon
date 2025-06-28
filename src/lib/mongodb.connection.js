import mongoose from "mongoose";

// export const connectToMongoDB = async () => {
//   try {
//     const db_url = process.env.MONGODB_URL;
//     await mongoose.connect(db_url);
//     console.log("Connected to MongoDB successfully.");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// };

// cache the connection
// this is to prevent multiple connections in serverless environments
// such as vercel, netlify to avoid hitting the connection limit
// and to improve performance by reusing the existing connection
// global.mongoose is used to store the connection in a global variable
// so that it can be reused across different routes and functions
let cached = global.mongoose;

// check if the cached connection exists
// if it doesn't exist, create a new one
// this is to ensure that the connection is only created once
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// this function connects to mongnodb
export async function connectToMongoDB() {
  // if we already have a connection, return it
  if (cached.conn) {
    console.log("Using cached MongoDB connection.");
    return cached.conn;
  }

  // if there's no promise in progress, create one to connect
  if (!cached.promise) {
    const db_url = process.env.MONGODB_URL;

    if (!db_url) {
      throw new Error(
        "Please define the MONGODB_URL environment variable in .env"
      );
    }

    const opts = {
      bufferCommands: false, // recommended for serverless environments
      // you can add other mongoose connection options here if needed
      // maxPoolSize: 10, // example: set max number of connections in the pool
      // minPoolSize: 1,  // example: set min number of connections in the pool
    };

    // create a new promise to connect to mongodb
    cached.promise = mongoose.connect(db_url, opts).then((mongoose) => {
      console.log("New MongoDB connection established.");
      return mongoose;
    });
  }

  // await the promise to get the connection, then store it
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // clear the promise on error to allow retries
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
