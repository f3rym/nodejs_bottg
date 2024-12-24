export const enemyFight = (msg) => {
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
         msg.reply.text(`Вы атакуете ${JSON.stringify(enemy)}. Битва началась!`);
         }
          else { 
            msg.reply.text('Сначала создайте персонажа с помощью команды /create_character имя класс.'); 
        }
    };