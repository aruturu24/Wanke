module.exports = {
	name: 'pericia',
	description: 'Rolar um dado e fala o sucesso.',
	aliases: ['pericias', 'p'],
	args: true,
	usage: '<personagem> <perícia>',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
  const {MessageEmbed} = require('discord.js');
  var fs = require('fs');
  
  var fichaJSON;
  
	 const {dado} = require("../../functions");
	 var dice = dado(100);
	 
	 let sucess = "desastre";
	 let txt = ['KKKKKKKKK MORREU', 'NÃO, NÃO, NÃÃÃÃOOOO', 'F...', 'Sorte tá em dia...'];
	 
	 if(args[0] == "ren" || args[0] == "fernando" || args[0] == "fefe") {
   fichaJSON = JSON.parse(fs.readFileSync('sheets/ren.json'));
	 }else if(args[0] == "near" || args[0] == "zoom" || args[0] == "z") {
	  fichaJSON = JSON.parse(fs.readFileSync('sheets/near.json'));
	 }else {
	  return;
	 }
	 
	 let pericia = fichaJSON[args[1]];
	 
	 if(pericia === undefined){
	  message.channel.send("Perícia inválida.");
	  return;
	 }
	 
	 if(dice > pericia && dice < 100-(pericia/5)){
	  sucess = "fracasso";
	  txt = ['kkkkkkkk tristeza', 'Poxa ):', 'As vezes temos que errar mesmo', 'Meeeeeh'];
	 }else if(dice < pericia/5){
	  sucess = "extremo"
	  txt = ['Uou 0:', 'MLK TÁ SORTUDO HJ!', 'FAVELA VENCEU!!!', 'NEM FUDENDO'];
	 }else if(dice < pericia/2){
	  txt = ['Quaaaaasee', 'Tá de boa', 'Melhor que a média', 'TÁ ÓTIMO!'];
	  sucess = "bom"
	 }else if(dice < pericia){
	  txt = ['Passou!!!', 'Poderia ser melhor...', 'Já é algo'];
	  sucess = "normal";
	 }
	 
	 let footer = txt[Math.ceil(Math.random() * (txt.length - 1))];
	 
	 const msg = new MessageEmbed()
	  .setColor(fichaJSON.nodice.cor)
	  .setTitle(`*** Dado de ${fichaJSON.nodice.nome} ***`)
	  .setDescription(`Você tirou: **${sucess}** \`\`\`(${dice})\`\`\``)
	  .setTimestamp()
	  .setFooter(footer);
  
  message.channel.send(msg);
	},
};