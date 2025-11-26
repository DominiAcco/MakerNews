import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Defina o MONGODB_URI em .env.local");
}

type MongooseGlobal = {
  conn?: typeof mongoose | null;
  promise?: Promise<typeof mongoose> | null;
};

declare global {
  var _mongooseGlobal: MongooseGlobal | undefined;
}

const globalWithMongoose = global as unknown as typeof global & {
  _mongooseGlobal?: MongooseGlobal;
};

let cached: MongooseGlobal = globalWithMongoose._mongooseGlobal ?? {
  conn: null,
  promise: null,
};

export async function connectDB() {
 console.log("MONGODB_URI:", process.env.MONGODB_URI);

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string).then((m) => m);
  }

  cached.conn = await cached.promise;
  globalWithMongoose._mongooseGlobal = cached;
  return cached.conn;
}
