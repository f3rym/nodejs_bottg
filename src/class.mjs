import connectDB from "./db.mjs"
//class person
export const createCharacter = async (userId, name, charClass) =>
{
    const db = await connectDB();
    const collection = db.collection('characters');
    const newCharacter = 
    {
        userId, 
        name, 
        class: charClass, 
        level: 1, 
        experience: 0, 
        damage: 25, 
        health: 100, 
        position: 0
    };

    await collection.insertOne(newCharacter);
}

export const getCharacter = async (userId) => 
{
    const db = await connectDB();
    const collection = db.collection('characters');
    const character = await collection.findOne({ userId });
    
    return character;
}

export const updateCharacter = async (userId, updateFields) =>
{ 
    const db = await connectDB();
    const collection = db.collection('characters');

    await collection.updateOne({ userId }, { $set: updateFields }); 
    console.log(`Персонаж с userId ${userId} обновлен.`); 
};
