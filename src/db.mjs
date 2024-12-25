import { MongoClient } from 'mongodb';

const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    return client.db();
};

export default connectDB;
