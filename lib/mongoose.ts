import mongoose from "mongoose";
import Admin from "@/models/admin";
import { hash } from "bcryptjs";

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
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string).then((m) => m);
  }

  cached.conn = await cached.promise;
  globalWithMongoose._mongooseGlobal = cached;

  await createInitialAdmin();

  return cached.conn;
}


async function createInitialAdmin() {
  const totalAdmins = await Admin.countDocuments();

  if (totalAdmins > 0) {
    return;
  }

  const DEFAULT_ADMIN = {
    name: "admin",
    email: "maker_admin@gmail.com",
    password: "Maker@123",
  };

  const hashedPassword = await hash(DEFAULT_ADMIN.password, 10);

  await Admin.create({
    name: DEFAULT_ADMIN.name,
    email: DEFAULT_ADMIN.email,
    password: hashedPassword,
  });
}