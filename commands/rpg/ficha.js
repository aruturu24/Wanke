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
   fichaJSON = JSON.parse(fs.readFileSync('sheets/ren.json'));
	 }else if(args[0] == "near" || args[0] == "zoom" || args[0] == "z") {
	  fichaJSON = JSON.parse(fs.readFileSync('sheets/near.json'));
	 }else {
	  return;
	 }
	 
	 const fichaEmbed = new Discord.MessageEmbed()
	  .setColor(fichaJSON.cor)
	  .setTitle(`*** ${fichaJSON.nodice.nome} ***`)
	  .setDescription(`${fichaJSON.nodice.descrição}`)
	  .addField('• INFO:',`**Idade:** ${fichaJSON.nodice.idade} anos\n**Altura:** ${fichaJSON.nodice.tamanho}m\n**Nacionalidade:** ${fichaJSON.nodice.nacionalidade}\n**Ocupação:** ${fichaJSON.nodice.ocupação}\n**Passatempo:** ${fichaJSON.nodice.passatempo}`)
	  
	  .addField('• STATUS:', `**❤️ VIDA:** ${fichaJSON.nodice.vida}/${fichaJSON.nodice.maxvida}\n**🧠 SANIDADE:** ${fichaJSON.sanidade}/${fichaJSON.nodice.maxsanidade}\n**🌀 MAGIA:** ${fichaJSON.nodice.magia}/${fichaJSON.nodice.maxmagia}`)
	  
	  .addField('• Relações:', `${fichaJSON.nodice.relações}`)
	  
	  .setTimestamp()
	  .setFooter(`Personagem de: *${fichaJSON.nodice.by}*`);
	 
		message.channel.send(fichaEmbed);
	},
};