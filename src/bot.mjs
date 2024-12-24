import TeleBot from 'telebot';

const bot = new TeleBot(process.env.TELEGRAM_BOT_TOKEN);

const characters = {};

bot.on('/start', async (msg) => {
    bot.sendMessage(msg.chat.id, 'Привет, друг, жми /create_character имя класс');
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
        health: 100, 
        inventory: [], 
        position: 0
    };
    bot.sendMessage(msg.chat.id, `Создан персонаж ${name} класса ${charClass}.`);
});

bot.on('/move', async (msg) => {
    const playerId = msg.from.id;
    if (characters[playerId]) {
        characters[playerId].position += 1;
        const position = characters[playerId].position;
        bot.sendMessage(msg.chat.id, `Вы передвинулись на ${position}. Что будем делать дальше?`);
    } else {
        bot.sendMessage(msg.chat.id, 'Сначала создайте персонажа с помощью команды /create_character имя класс.');
    }
});



export default bot;
