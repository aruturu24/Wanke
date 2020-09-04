const fs = require('fs');

const Discord=require("discord.js");

const { prefix, token }=require("./config.json");

const client=new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

	const command = require(`./commands/${file}`);	client.commands.set(command.name, command);

}

const cooldowns = new Discord.Collection();

const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://wankebot:5jsfEWeSpuMTHdPJ@wanke.9jynl.gcp.mongodb.net/wanke?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {

  if(err) return console.log("erro ao acessar database\n"+err);

});

client.once('ready', () => {

	console.log('iniciado!');

});

client.on("guildCreate", () => {

  

});

client.on('message', message => {

    if(!message.content.startsWith(prefix)||message.author.bot) {

      randomReact(message);

      return;

    }

  	const args = message.content.slice(prefix.length).trim().split(/ +/);

  	const commandName = args.shift().toLowerCase();

	  const command = client.commands.get(commandName)

		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	  if (!command) return;

    

    

    if (command.guildOnly && message.channel.type === 'dm') {

	    return message.reply('Não posso fazer isso no PV :flushed:');

    }

    

    if (!cooldowns.has(command.name)) {

	    cooldowns.set(command.name, new Discord.Collection());

    }

    const now = Date.now();

    const timestamps = cooldowns.get(command.name);

    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {

    	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    	if (now < expirationTime) {

   	  	const timeLeft = (expirationTime - now) / 1000;

	    	return message.reply(`Espera ${timeLeft.toFixed(1)} segundos antes de usar o \`${command.name}\` de novo mano.`);

	    }

	    

	    timestamps.set(message.author.id, now);

      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    }

    

    if (command.args && !args.length) {

      let reply = `Não tá esquecendo de nada não, ${message.author}?`

      

      if(command.usage) {

        reply += `\na maneira certa de se usar é: \`${prefix}${command.name} ${command.usage}\``;

      }

      return message.channel.send(reply);

    }

    try {

	    command.execute(client, message, args, mongoose);

    } catch (error) {

	    console.error(error);

    	message.channel.send('Escreve direito aí mano.');

    }

});

client.login(token);

function randomReact(message) {

  if(Math.floor(Math.random() * 100)+1 < 30) {

    var emojiName = [

      'angrygun',

      'bonk',

      'timido',

      'holdthefuckup',

      'KannaKill',

      'kirbyknife',

      'waitporn',

      'forca',

      'ragescream',

      'nanipika'];

    

    const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === emojiName[Math.floor(Math.random() * emojiName.length)]);

	  message.react(reactionEmoji);

      }

}