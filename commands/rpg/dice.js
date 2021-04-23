module.exports = {
	name: 'dice',
	description: 'Rolar um dado.',
	aliases: ['dado', 'roll'],
	args: true,
	usage: '<(quantidade)D(faces)>',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
	 
  const argsLower = args.shift().toLowerCase();
  const idk = argsLower.split("d");

  let result = [];

  for(var i = 0; i < idk[0]; i++) {
   result[i] = Math.floor(Math.random() * idk[1]);
  }

  let msg = `**Resultado dos dados:**\n`;
  
  for(var pos = 0; pos < result.length; pos++) {
   msg += `\n🎲${pos+1} = ${result[pos]}`;
  }
  
  message.channel.send(msg);
	},
};