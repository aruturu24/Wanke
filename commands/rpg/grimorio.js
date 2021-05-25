module.exports = {
  name: "grimorio",
  description: "Um livro sobre as magias do RPG.",
  aliases: ["g", "grim", "grimório"],
  args: false,
  argsManual: true,
  usage: "<magia>",
  guildOnly: false,
  cooldown: 15,
  execute(message, args) {
    const Discord = require("discord.js");
    var fs = require("fs");

    const magic = JSON.parse(fs.readFileSync("sheets/magias.json"));

    if (args.length == 0) {
      let magics = `**Nomes das magias:**\n`;
      let magicarray = [];
      for (let i = 0; i < magic.length; i++) {
        magicarray[i] = magic[i].nome;
      }
      magicarray.sort();
      for (let i = 0; i < magicarray.length; i++) {
        magics += `${magicarray[i]}\n`;
      }

      const embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle(`*** GRIMÓRIO ***`)
        .setDescription(magics)
        .setTimestamp()
        .setFooter(`Tente usar "w.g <magia>"`);

      message.channel.send(embed);
    } else {
      let index;
      for (let a = 0; a < magic.length; a++) {
        for (let b = 0; b < magic[a].alias.length; b++) {
          if (args[0] == magic[a].alias[b]) {
            index = a;
          }
        }
      }

      let gastos = "";
      let ordem = ["Vida", "Magia", "Sanidade", "Rodadas", "Dano"];
      //vida, magia, sanidade f, san s, rodadas, dano
      for (let i = 0; i < magic[index].status.length; i++) {
        if (magic[index].status[i] != null && i != 2) {
          gastos += `**${ordem[i]}:** ${magic[index].status[i]}\n`;
        } else if (magic[index].status[i] != null && i == 2) {
          gastos += `**${ordem[i]}:** ${magic[index].status[i][0]}/${magic[index].status[i][1]}\n`;
        }
      }

      const embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle(`*** ${magic[index].nome} ***`)
        .setDescription(magic[index].descricao)
        .addField("• Gasto", gastos)
        .setTimestamp()
        .setFooter(`Magia maneira 👍`);

      message.channel.send(embed);
    }
  },
};
