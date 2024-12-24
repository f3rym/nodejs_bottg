export const enemyFind = async(msg, characters) => {
    let enemy;    
    const playerId = msg.from.id; 
      if (characters[playerId])      {
        if(characters[playerId].position < 10) {
            enemy = {
                name: 'ABOBA', 
                damage: 50, 
                health: 100, 
            }
        }
        await msg.reply.text(`Вы атакуете ${enemy.name}. Битва началась! Урон: ${enemy.damage}, Здоровье: ${enemy.health}\nВыбирай ящик для атаки или атакуй:\n/box1 /box2 /fight`);
         }
          else { 
           await msg.reply.text('Сначала создайте персонажа с помощью команды /create_character имя класс.'); 
        }
    };