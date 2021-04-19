module.exports = {
	name: 'dice',
	description: 'Rolar um dado.',
	aliases: ['dado', 'roll'],
	args: true,
	usage: '<(quantidade)D(faces)>',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
		var d20 = require('d20');
  
  let result = d20.roll(args[0]);
  
  message.channel.send(`Resultado do dado: ${result} ||isso é um teste||`);
	},
};