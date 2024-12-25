// db.mjs
import { MongoClient } from 'mongodb';

// Функция подключения к базе данных
export const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    return client.db();
};
