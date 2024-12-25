import TeleBot from 'telebot';
import connectDB from './db.mjs';  // Экспорт по умолчанию
import { enemyFind, boxAttack, defAttack } from './enemy.mjs';
import { getCharacter, createCharacter, updateCharacter } from './class.mjs';

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)
 
const enemy = {}

//Start command
bot.on('/start', async (msg) => {
    const userId = msg.from.id;
    const character = await getCharacter(userId);
    
    await updateCharacter(userId, {health: 100});
    await bot.sendMessage(msg.chat.id, 'Привет, друг, жми /create_character  и напиши свой класс');
});

//Create character for player
bot.on(/^\/create_character (.+)$/, async (msg, props) => {
    const userId = msg.from.id;
    const name = msg.from.username;
    const charClass = props.match[1];
    try 
    {
        await createCharacter(userId, name, charClass);
        await bot.sendMessage(msg.chat.id, `Создан персонаж ${name} класса ${charClass}.`);
    }
    catch (err)
    {
        await bot.sendMessage(msg.chat.id, 'Ошибка при создании персонажа.');
    }
});

//Move in map
bot.on('/move', async (msg) => 
{
    const userId = msg.from.id;

    try
    {
        const character = await getCharacter(userId);

        if (character) 
        {
            character.position += 1;

            await updateCharacter(userId, { position: character.position }); // Сохранение изменений в базу данных

            await bot.sendMessage(msg.chat.id, `Вы передвинулись на ${character.position}. `);
            if(character.position % 2 != 0) 
                enemyFind(msg, userId, enemy);
        }
        else
        {
            await bot.sendMessage(msg.chat.id, 'Персонаж не найден. Создайте персонажа с помощью команды /create_character и класс.');
        }
    }
    catch (err)
    {
        await bot.sendMessage(msg.chat.id, `Ошибка при получении персонажа.${err.message}`);
    }
});

//Attacks
bot.on('/box1', async (msg) => 
{ 
    await boxAttack(msg, enemy);
}); 

bot.on('/box2', async (msg) => 
{
    await boxAttack(msg, enemy);
}); 
        
bot.on('/fight', async (msg) => 
{
    await defAttack(msg, enemy); 
});

bot.on('/db', async (msg) => 
{
    try 
    {
    const db = await connectDB();
         
    await msg.reply.text(`Подключено к базе данных: ${db.databaseName}`);
    } 
    catch (err)
    {
    console.error('Ошибка при подключении к базе данных:', err);
    await msg.reply.text('Не удалось подключиться к базе данных. Проверьте настройки.');
    }
});
        
bot.on('/stats', async (msg) => 
{ 
    const userId = msg.from.id;
    try 
    {
        const character = await getCharacter(userId);
        if (character)
        { 
            const stats = 
                ` Имя: ${character.name}
                  Класс: ${character.class}
                  Уровень: ${character.level} 
                  Опыт: ${character.experience} 
                  Урон: ${character.damage} 
                  Здоровье: ${character.health}
                  Позиция: ${character.position} `; 
                await bot.sendMessage(msg.chat.id, stats);
        }
        else
        { 
            await bot.sendMessage(msg.chat.id, 'Персонаж не найден. Создайте персонажа с помощью команды /create_character и класс.');
        } 
    } 
    catch (err) 
    { 
        console.error(err); 
        await bot.sendMessage(msg.chat.id, `Ошибка при получении персонажа: ${err.message}`); 
    }
});

export default bot;

