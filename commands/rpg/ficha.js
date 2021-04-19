module.exports = {
	name: 'ficha',
	description: 'Exibe a ficha de um personagem.',
	aliases: ['abatx'],
	args: true,
	usage: '<nome do personagem>',
	guildOnly: true,
	cooldown: 30,
	execute(message, args) {
	 const { MessageEmbed } = require('discord.js');
  var fs = require('fs');

	 var fichaJSON;
	 
	 if(args[0] == "ren" || args[0] == "fernando" || args[0] == "fefe") {
	  fs.readFile('sheets/ren.json', (err, data) => {
   if (err) { console.log(err); }
   fichaJSON = JSON.parse(data);
	 });
	 }
	 
		message.channel.send(`**Nome:** ${fichaJSON.nome}`);
	},
};