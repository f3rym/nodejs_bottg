import TeleBot from 'telebot';
import { connectDB } from './db.mjs';
import { enemyFind, box1Attack, box2Attack, defAttack } from './enemy.mjs';

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN)
 

const characters = {};
const enemy = {}
bot.on('/start', async (msg) => {
    await bot.sendMessage(msg.chat.id, 'Привет, друг, жми /create_character имя класс');
});

bot.on(/^\/create_character (.+) (.+)$/, async (msg, props) => {
    const playerId = msg.from.id;
    const name = props.match[1];
    const charClass = props.match[2];
    characters[playerId] = {
        name, 
        class: charClass, 
        level: 1, 
        experience: 0, 
        damage: 25,
        health: 100, 
        inventory: [], 
        position: 0
    };
    await bot.sendMessage(msg.chat.id, `Создан персонаж ${name} класса ${charClass}.`);
});

bot.on('/move', async (msg) => {
    const playerId = msg.from.id;
    if (characters[playerId]) {
        characters[playerId].position += 1;
        const position = characters[playerId].position;

        
        await bot.sendMessage(msg.chat.id, `Вы передвинулись на ${position}. `);
        if(position % 2 != 0) 
           enemyFind(msg, characters, enemy);
    } else {
        await bot.sendMessage(msg.chat.id, 'Сначала создайте персонажа с помощью команды /create_character имя класс.');
    }
});

bot.on('/box1', async (msg) => { 
    await box1Attack(msg, characters, enemy);
     }); 
      bot.on('/box2', async (msg) => {
         await box2Attack(msg, characters, enemy);
        }); 
        bot.on('/fight', async (msg) => {
             await defAttack(msg, characters, enemy); 
        });

 bot.on('/db', async (msg) => {
         const database = await connectDB();
        await msg.reply.text(`Connected to database: ${database.databaseName}`)});
 

export default bot;
