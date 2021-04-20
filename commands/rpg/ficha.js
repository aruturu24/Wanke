module.exports = {
	name: 'ficha',
	description: 'Exibe a ficha de um personagem.',
	aliases: ['abatx'],
	args: true,
	usage: '<nome do personagem>',
	guildOnly: true,
	cooldown: 5,
	execute(message, args) {
	 const { MessageEmbed } = require('discord.js');
  var fs = require('fs');

	 var fichaJSON;
	 
	 if(args[0] == "ren" || args[0] == "fernando" || args[0] == "fefe") {
   var data = fs.readFileSync('sheets/ren.json');
   fichaJSON = JSON.parse(data);
	 }
	 
		message.channel.send(`**Nome:** ${fichaJSON.nome}`);
	},
};