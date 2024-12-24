export const getRandomNumber = (max) => {
    return Math.floor(Math.random() * max);
};

export const enemyFind = async (msg, characters, enemy) => {
    const playerId = msg.from.id; 
    
    if (characters[playerId]) {
        if (characters[playerId].position < 10) {
            enemy[playerId] = {
                name: 'ABOBA', 
                damage: 50, 
                health: 100
            };
        }
        
        await msg.reply.text(`Вы атакуете ${enemy[playerId].name}. Битва началась! Урон: ${enemy[playerId].damage}, Здоровье: ${enemy[playerId].health}\nВыбирай ящик для атаки или атакуй:\n/box1 /box2 /fight`);
    } else { 
        await msg.reply.text('Сначала создайте персонажа с помощью команды /create_character имя класс.'); 
    }
};

export const box1Attack = async (msg, characters, enemy) => { 
    const playerId = msg.from.id;
    const randomValue = getRandomNumber(2); 

    if (characters[playerId]) {
        if (randomValue === 0) { 
            await msg.reply.text('Атака не удалась! Попробуйте другой вариант.');
        } else if (randomValue === 1) {
            const damage = characters[playerId].damage * 2;
            enemy[playerId].health -= damage; 
            await msg.reply.text(`Успех! Атака удалась. Ваш урон: ${damage}. Здоровье врага: ${enemy[playerId].health}`); 
        }
    } else { 
        await msg.reply.text('Сначала создайте персонажа с помощью команды /create_character имя класс.'); 
    }
};

export const box2Attack = async (msg, characters, enemy) => { 
    const playerId = msg.from.id;
    const randomValue = getRandomNumber(2); 

    if (characters[playerId]) {
        if (randomValue === 0) { 
            await msg.reply.text('Атака не удалась! Попробуйте другой вариант.');
        } else if (randomValue === 1) {
            const damage = characters[playerId].damage * 2;
            enemy[playerId].health -= damage; 
            await msg.reply.text(`Успех! Атака удалась. Ваш урон: ${damage}. Здоровье врага: ${enemy[playerId].health}`); 
        }
    } else { 
        await msg.reply.text('Сначала создайте персонажа с помощью команды /create_character имя класс.'); 
    }
};

export const defAttack = async (msg, characters, enemy) => {
    const playerId = msg.from.id;

    if (characters[playerId]) {
        const damage = characters[playerId].damage;
        enemy[playerId].health -= damage;
        await msg.reply.text(`Атака удалась. Ваш урон: ${damage}. Здоровье врага: ${enemy[playerId].health}`);
    } else {
        await msg.reply.text('Сначала создайте персонажа с помощью команды /create_character имя класс.'); 
    }
};
