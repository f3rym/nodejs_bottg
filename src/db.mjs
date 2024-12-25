import { MongoClient } from 'mongodb';

if (!process.env.MONGODB) {
  throw new Error('The MONGODB environment variable is not defined');
}

const client = new MongoClient(process.env.MONGODB);

export default client.connect()
  .then(() => {
    console.log('Successfully connected to MongoDB');
    return client;
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    throw err;
  });
