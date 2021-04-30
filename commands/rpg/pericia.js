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
	 
	 let pericia;
	 
	 let sucess = "desastre";
	 let txt = ['KKKKKKKKK MORREU', 'NÃO, NÃO, NÃÃÃÃOOOO', 'F...', 'Sorte tá em dia...'];
	 
	 let ren = ['ren','fernando','riki','fefe'];
	 let near = ['near','zoom','mello','funny'];
	 
	 if(args.length > 1){
	  if(ren.indexOf(args[0]) > -1) {
    fichaJSON = JSON.parse(fs.readFileSync('sheets/ren.json'));
	  }else if(near.indexOf(args[0]) > -1) {
	   fichaJSON = JSON.parse(fs.readFileSync('sheets/near.json'));
	  }else {
	   return;
	  }
	 
	  pericia = fichaJSON[args[1]];
	 }else {
	  if(message.author.id == '405712573741400074') {
    fichaJSON = JSON.parse(fs.readFileSync('sheets/ren.json'));
	  }else if(message.author.id == '699737918193008802') {
	   fichaJSON = JSON.parse(fs.readFileSync('sheets/near.json'));
	  }else {
	   return;
	  }
	  
	  pericia = fichaJSON[args[0]];
	 }
	 
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