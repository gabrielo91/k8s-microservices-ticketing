// import request from "supertest";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock('../nats-wrapper.ts');

process.env.STRIPE_KEY =
  'sk_test_51I3vuYKtWrdkCqYxq6OBJYfC9yanUnteLWgUYZKAHY03YmuMbPatox7Tfk5kI7UQreXEsW0vcULmRch5QrB2Ro4b0095S2Lofs';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'FOO';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object { jwt: MY_JWT }
  const session = { jwt: token };

  // Take jSON and encode it as base64
  const sessionJSON = JSON.stringify(session);

  // return string with jwt cookie
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`express:sess=${base64}`];
};
