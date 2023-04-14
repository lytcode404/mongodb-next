// import mongoose from "mongoose";

// const MONGO_URI = `mongodb+srv://dilshad:${process.env.pass}@cluster0.i4rydma.mongodb.net/?retryWrites=true&w=majority`;

// const connectMongo = async () => {
//   try {
//     const { connection } = await mongoose.connect(MONGO_URI);
//     if (connection.readyState == 1) {
//       console.log("Database Connected");
//     }
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// export default connectMongo;


// lib/db.js

import mongoose from 'mongoose';

const MONGODB_URI = `mongodb+srv://dilshad:${process.env.pass}@cluster0.i4rydma.mongodb.net/?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;

