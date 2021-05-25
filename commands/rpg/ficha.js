module.exports = {
  name: "ficha",
  description: "Exibe a ficha de um personagem.",
  aliases: ["abatx"],
  args: true,
  argsManual: true,
  usage: "<nome do personagem>",
  guildOnly: true,
  cooldown: 15,
  execute(message, args) {
    const Discord = require("discord.js");
    var fs = require("fs");

    const fichaJSON = JSON.parse(fs.readFileSync("sheets/ficha.json"));;
	let index;

    for (let a = 0; a < fichaJSON.length; a++) {
		for (let b = 0; b < fichaJSON[a].nodice.alias.length; b++) {
			if(fichaJSON[a].nodice.alias[b] == args[0]) {
				index = a;
				pericia = fichaJSON[index][args[1]];
				break;
			}
		}
	}

    const fichaEmbed = new Discord.MessageEmbed()
      .setColor(fichaJSON[index].nodice.cor)
      .setTitle(`*** ${fichaJSON[index].nodice.nome} ***`)
      .setDescription(`${fichaJSON[index].nodice.descrição}`)
      .addField(
        "• INFO:",
        `**Idade:** ${fichaJSON[index].nodice.idade} anos\n**Altura:** ${fichaJSON[index].nodice.tamanho}m\n**Nacionalidade:** ${fichaJSON[index].nodice.nacionalidade}\n**Ocupação:** ${fichaJSON[index].nodice.ocupação}\n**Passatempo:** ${fichaJSON[index].nodice.passatempo}`
      )

      .addField(
        "• STATUS:",
        `**❤️ VIDA:** ${fichaJSON[index].nodice.vida}/${fichaJSON[index].nodice.maxvida}\n**🧠 SANIDADE:** ${fichaJSON[index].sanidade}/${fichaJSON[index].nodice.maxsanidade}\n**🌀 MAGIA:** ${fichaJSON[index].nodice.magia}/${fichaJSON[index].nodice.maxmagia}`
      )

      .addField("• Relações:", `${fichaJSON[index].nodice.relações}`)

      .setTimestamp()
      .setFooter(`Personagem de: *${fichaJSON[index].nodice.by}*`);

    message.channel.send(fichaEmbed);
  },
};
