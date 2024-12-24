import TeleBot from 'telebot';
import { enemyFind, box1Attack, box2Attack, defAttack } from './enemy.mjs'; // Подключение функций

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

const characters = {};
const enemy = {}; // Объект для хранения информации о врагах для каждого игрока

// Команда /start
bot.on('/start', async (msg) => {
    await bot.sendMessage(msg.chat.id, 'Привет, друг, жми /create_character имя класс');
});

// Команда /create_character
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

// Команда /move
bot.on('/move', async (msg) => {
    const playerId = msg.from.id;
    if (characters[playerId]) {
        characters[playerId].position += 1;
        const position = characters[playerId].position;

        await bot.sendMessage(msg.chat.id, `Вы передвинулись на ${position}.`);
        if (position % 2 !== 0) {
            await enemyFind(msg, characters, enemy); // Используем await для асинхронного вызова и передаем объект enemy
        }
    } else {
        await bot.sendMessage(msg.chat.id, 'Сначала создайте персонажа с помощью команды /create_character имя класс.');
    }
});

// Команда /box1
bot.on('/box1', async (msg) => { 
    await box1Attack(msg, characters, enemy); // Используем await для асинхронного вызова
});

// Команда /box2
bot.on('/box2', async (msg) => {
    await box2Attack(msg, characters, enemy); // Используем await для асинхронного вызова
});

// Команда /fight
bot.on('/fight', async (msg) => {
    await defAttack(msg, characters, enemy); // Используем await для асинхронного вызова
});

bot.start();

export default bot;
