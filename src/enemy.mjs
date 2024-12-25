import { getCharacter, updateCharacter } from "./class.mjs";

export const getRandomNumber = (max) => { return Math.floor(Math.random() * max); };

export const enemyFind = async (msg, userId, enemy) => 
{
    try 
    {
        const character = await getCharacter(userId);

        if(character)
        {
                enemy[userId] = 
                {
                    name: 'ABOBA', 
                    damage: 50,
                    health: 100
                }
            await msg.reply.text(`Вы атакуете ${enemy[userId].name}. Битва началась! Урон: ${enemy[userId].damage}, Здоровье: ${enemy[userId].health}\nВыбирай ящик для атаки или атакуй:\n/box1 /box2 /fight`);

        }
        else
            await msg.reply.text(`'Персонаж не найден. Создайте персонажа с помощью команды /create_character и класс.'`);
    }
    catch (err)
    {
        await bot.reply.text(msg.chat.id, `Ошибка при получении персонажа.${err.message}`);
    }
};
        
export const boxAttack = async (msg, enemy) => 
{ 
    const userId = msg.from.id;
    const randomValue = getRandomNumber(2); 

    const character = await getCharacter(userId);

    try
    {
        if (character)
        {
            if (randomValue === 0) 
            { 
                character.health -=enemy[userId].damage;
                character.dept += enemy[userId].damage;
                enemy[userId].health -= damage; 
                await updateCharacter(userId, { dept: character.dept });
                await updateCharacter(userId, { health: character.health }); // Сохранение изменений в базу данных

                await msg.reply.text('Атака не удалась! Попробуйте другой вариант.');

                await msg.reply.text(`Оу нееет. Враг нанес урон, у вас осталось: ${character.health} HP`);
            }
            else if (randomValue === 1)
            {
                const damage = character.damage * 2;
                enemy[userId].health -= damage; 
                character.dept += enemy[userId].damage;
                await updateCharacter(userId, { dept: character.dept });
                character.health -=enemy[userId].damage;
                await updateCharacter(userId, { health: character.health }); // Сохранение изменений в базу данных

                if(character.health <= 0 || enemy[userId].health <= 0)
                    ChekHP(msg, enemy);
                else
                {
                    await msg.reply.text(`Успех! Атака удалась. Ваш урон: ${damage}. Здоровье врага: ${enemy[userId].health}`);
                
                    await msg.reply.text(`Оу нееет. Враг нанес урон, у вас осталось: ${character.health} HP`);
                }
                
            }
        }
        else
            await msg.reply.text('Сначала создайте персонажа с помощью команды /create_character и класс.'); 
    }
    catch (err)
    {
        await bot.reply.text(msg.chat.id, `Ошибка при получении персонажа.${err.message}`);
    }
    
};

export const defAttack = async (msg,  enemy) =>
{
    const userId = msg.from.id;

    const character = await getCharacter(userId);

    try
    {
        if (character)
        {
            const damage = character.damage;
            enemy[userId].health -= damage;
            character.dept += enemy[userId].damage;
            character.health -=enemy[userId].damage;
            await updateCharacter(userId, { health: character.health }); // Сохранение изменений в базу данных
            await updateCharacter(userId, { dept: character.dept });

            if(character.health <= 0 || enemy[userId].health <= 0)
                ChekHP(msg, enemy);
            else
            {
                await msg.reply.text(`Атака. Ваш урон: ${damage}. Здоровье врага: ${enemy[userId].health}`);
                
                await msg.reply.text(`Оу нееет. Враг нанес урон, у вас осталось: ${character.health} HP`);
            }
        }
        else
            await msg.reply.text('Сначала создайте персонажа с помощью команды /create_character и класс.'); 
    }
    catch (err)
    {
        await bot.reply.text(msg.chat.id, `Ошибка при получении персонажа.${err.message}`);
    }
};

export const ChekHP = async (msg, enemy) =>
{
    const userId = msg.from.id;
    const character = await getCharacter(userId);

    if(character.health <= 0)
    {
        character.position = 0;
        character.health = character.dept;
        character.dept = 0;
        await updateCharacter(userId, { position: character.position }); // Сохранение изменений в базу данных
        await updateCharacter(userId, { dept: character.dept });

        await msg.reply.text('Печаль...');
        await msg.reply.text(`Вы погибли. Мне жаль. Вы перемещены в начало, ваша позиция ${character.position}`);
    }
    else if(enemy[userId].health <= 0)
    {
        character.health = character.dept;
        character.dept = 0;
        character.experience +=1;
        await updateCharacter(userId, { experience: character.experience});
        await updateCharacter(userId, { position: character.position }); // Сохранение изменений в базу данных
        await updateCharacter(userId, { dept: character.dept });

        await msg.reply.text('Ого');
        await msg.reply.text(`Не такой ты и слабый)\nТвой опыт за победу +1.\nПродолжай /move`);
    }
}
