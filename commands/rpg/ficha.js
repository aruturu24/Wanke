module.exports = {
	name: 'ficha',
	description: 'Exibe a ficha de um personagem.',
	aliases: ['abatx'],
	args: true,
	usage: '<nome do personagem>',
	guildOnly: true,
	cooldown: 15,
	execute(message, args) {
	 const Discord = require('discord.js');
  var fs = require('fs');

	 var fichaJSON;
	 
	 if(args[0] == "ren" || args[0] == "fernando" || args[0] == "fefe") {
   var data = fs.readFileSync('sheets/ren.json');
   fichaJSON = JSON.parse(data);
	 }
	 
	 const fichaEmbed = new Discord.MessageEmbed()
	  .setColor(fichaJSON.cor)
	  .setTitle(fichaJSON.nome)
	  .setDescription(`${fichaJSON.descrição}`)
	  .addField('INFO',`**Idade:** ${fichaJSON.idade} anos\n
	  **Altura:** ${fichaJSON.tamanho}\n
	  **Nacionalidade:** ${fichaJSON.nacionalidade}\n
	  **Ocupação:** ${fichaJSON.ocupação}\n
	  **Passatempo:** ${fichaJSON.passatempo}`)
	  
	  .addField('STATUS', `**VIDA:** ${fichaJSON.vida}/${fichaJSON.maxvida}\n
	  **SANIDADE:** ${fichaJSON.sanidade}/${fichaJSON.maxsanidade}\n
	  **MAGIA:** ${fichaJSON.magia}/${fichaJSON.maxmagia}`)
	  .setTimestamp()
	  .setFooter('Fernando', 'https://cdn.discordapp.com/avatars/405712573741400074/62b2ccd14958e1751742d63e483349cb.png');
	 
		message.channel.send(fichaEmbed);
	},
};