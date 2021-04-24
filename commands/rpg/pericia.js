module.exports = {
	name: 'pericia',
	description: 'Rolar um dado e fala o sucesso.',
	aliases: ['pericias'],
	args: true,
	usage: '<perícia>',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
  
  var fs = require('fs');

	 var fichaJSON;
	 let dice = Math.floor(Math.random() * 99)+1;
	 let sucess = "desastre";
	 let footer;
	 var txt = ['KKKKKKKKK MORREU', 'NÃO, NÃO, NÃÃÃÃOOOO', 'F...', 'Sorte tá em dia...'];
	 
	 if(args[0] == "ren" || args[0] == "fernando" || args[0] == "fefe") {
   var data = fs.readFileSync('sheets/ren.json');
   fichaJSON = JSON.parse(data);
	 }
	 
	 let pericia = fichaJSON[args[0]];
	 
	 if(pericia === undefined){
	  message.channel.send("Perícia inválida.");
	  return;
	 }
	 
	 if(dice > pericia & dice < 100-(pericia/5)){
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
	 
	 footer = txt[Math.ceil(Math.random() * (nomes.length - 1))];
	 
	 const msg = new Discord.MessageEmbed()
	  .setColor(fichaJSON.cor)
	  .setTitle(`*** Dado de ${fichaJSON.nome} ***`)
	  .setDescription(`Você tirou: **${sucess}**\`\`\`(${dice})\`\`\``)
	  .setTimestamp()
	  .setFooter(footer);
  
  message.channel.send(msg);
	},
};