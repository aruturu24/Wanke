module.exports = {
	name: 'dice',
	description: 'Rolar um dado.',
	aliases: ['dado'],
	args: true,
	usage: '',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
		var Dice = require('dice');
  var dice = new Dice();
  
  let result = dice.execute(args[0]);
  
  message.channel.send(`Resultado do dado: ${result.outcomes[rolls[0]]}`);
	},
};