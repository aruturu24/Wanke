module.exports = {
	name: "pericia",
	description: "Rolar um dado e fala o sucesso.",
	aliases: ["pericias", "p"],
	args: true,
	argsManual: true,
	usage: "<personagem> <perícia>",
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
		const { MessageEmbed } = require("discord.js");
    	var fs = require("fs");

    	var fichaJSON = JSON.parse(fs.readFileSync("sheets/ficha.json"));

    	const { dado } = require("../../functions");
    	var dice = dado(100);

		let pericia;
		let index = 0;

		let sucess = "desastre";
		let txt = [
			"KKKKKKKKK MORREU",
			"NÃO, NÃO, NÃÃÃÃOOOO",
			"F...",
			"Sorte tá em dia...",
		];

		if (args.length > 1) {
			for (let a = 0; a < fichaJSON.length; a++) {
				for (let b = 0; b < fichaJSON[a].nodice.alias.length; b++) {
					if(fichaJSON[a].nodice.alias[b] == args[0]) {
						index = a;
						pericia = fichaJSON[index][args[1]];
						break;
					}
				}
			}
		} else {
			if (message.author.id == "405712573741400074") {
				//Ren Riki
				index = 0;
			} else if (message.author.id == "699737918193008802") {
				//Near Mello
				index = 1;
			} else if (message.author.id == "417444048085975050"){
				//Francis Drake
				index = 2;
			} else {
				message.channel.send("específique o nome do personagem.");
				return;
			}

			pericia = fichaJSON[index][args[0]];
		}

		if (pericia === undefined) {
			message.channel.send("Perícia inválida.");
			return;
		}

		if (dice > pericia && dice < 100 - pericia / 5) {
			sucess = "fracasso";
			txt = [
				"kkkkkkkk tristeza",
				"Poxa ):",
				"As vezes temos que errar mesmo",
				"Meeeeeh",
			];
		} else if (dice < pericia / 5) {
			sucess = "extremo";
			txt = ["Uou 0:", "MLK TÁ SORTUDO HJ!", "FAVELA VENCEU!!!", "NEM FUDENDO"];
		} else if (dice < pericia / 2) {
			txt = ["Quaaaaasee", "Tá de boa", "Melhor que a média", "TÁ ÓTIMO!"];
			sucess = "bom";
		} else if (dice < pericia) {
			txt = ["Passou!!!", "Poderia ser melhor...", "Já é algo"];
			sucess = "normal";
		}

		let footer = txt[Math.ceil(Math.random() * (txt.length - 1))];

		const msg = new MessageEmbed()
			.setColor(fichaJSON[index].nodice.cor)
			.setTitle(`*** Dado de ${fichaJSON[index].nodice.nome}***`)
			.setDescription(`Você tirou: **${sucess}** \`\`\`(${dice})\`\`\``)
			.setTimestamp()
			.setFooter(footer);

		message.channel.send(msg);
	},
};
