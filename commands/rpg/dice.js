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
  
  let result = d20.roll(args[0], true);
  let msg = `**Resultado dos dados:**\n`;
  
  for(var pos = 0; pos < result.length; pos++) {
   msg += `\n🎲${pos+1} = ${result[pos]}`;
  }
  
  message.channel.send(msg);
	},
};