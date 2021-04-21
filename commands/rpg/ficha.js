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
	  .setTitle(`*** ${fichaJSON.nome} ***`)
	  .setDescription(`${fichaJSON.descrição}`)
	  .addField('• INFO:',`**Idade:** ${fichaJSON.idade} anos\n**Altura:** ${fichaJSON.tamanho}m\n**Nacionalidade:** ${fichaJSON.nacionalidade}\n**Ocupação:** ${fichaJSON.ocupação}\n**Passatempo:** ${fichaJSON.passatempo}`)
	  
	  .addField('• STATUS:', `**❤️ VIDA:** ${fichaJSON.vida}/${fichaJSON.maxvida}\n**🧠 SANIDADE:** ${fichaJSON.sanidade}/${fichaJSON.maxsanidade}\n**🌀 MAGIA:** ${fichaJSON.magia}/${fichaJSON.maxmagia}`)
	  
	  .addField('• Relações:', `${fichaJSON.relações}`)
	  
	  .setTimestamp()
	  .setFooter(`Personagem de: ${message.guild.members.get(fichaJSON.by).username}`);
	 
		message.channel.send(fichaEmbed);
	},
};