export const enemyFight = async(msg) => {
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
         await msg.reply.text(`Вы атакуете ${JSON.stringify(enemy)}. Битва началась!`);
         }
          else { 
           await msg.reply.text('Сначала создайте персонажа с помощью команды /create_character имя класс.'); 
        }
    };