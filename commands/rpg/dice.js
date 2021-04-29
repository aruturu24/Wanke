module.exports = {
	name: 'dice',
	description: 'Rolar um dado.',
	aliases: ['dado', 'roll', 'r', 'd'],
	args: true,
	usage: '<(quantidade)D(faces)>',
	guildOnly: false,
	cooldown: 7,
	execute(message, args) {
	 if(isNaN(args[0])) {
   const argsLower = args.shift().toLowerCase();
   const dice = argsLower.split("d");
	 }else {
	  const dice = [1, args[0]];
	 } //Transforma os argumentos num array de quantidade, faces

  let result = [];
  
  const {dado} = require("./functions");

  for(var i = 0; i < dice[0]; i++) {
   result[i] = dado(dice[1]);
  } //Gera números aleatórios para a quantidade de dados colocada

  let msg = `**Resultado dos dados:**\n`;
  
  for(var pos = 0; pos < result.length; pos++) {
   msg += `\n🎲.${pos+1} = ${result[pos]}`;
  } //Coloca os resultados na variável "msg
  
  message.channel.send(msg);
	},
};