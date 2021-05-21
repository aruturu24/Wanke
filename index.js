const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
 let ontheline = ['Bot tá online! :D', 'O pai tá on! B)', 'Infelizmente acordei. ZZZZzzzz', 'Tenho que ir trabalhar? ):', '*Erro 103:* preguiça demais para funcionar'];
 
	console.log(ontheline[Math.floor((Math.random() * ontheline.length))]);
	
	let activies = ['\"como matar Ren Riki\"','podcast dos Wendigos','\"Dois jovens ficam presos ao resgatar amiga\"', '\"Cala a boca, Oliver!\"', 'Artwa e Hunnigan, uma história de amor', 'a morte da Heloísa 😭', 'Lobo gigante vira churrasco em uma comunidade', 'A MINA MORREU SOTERRADA KKKK'];
	
	let seg=60*5;
	setInterval(() => {
  const index = Math.floor(Math.random() * (activies.length - 1) + 1);
	 client.user.setActivity(activies[index], {type: "WATCHING"});
	}, seg * 1000);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('Esse comando só funciona em servidores!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('Você não tem permissão para isso!');
		}
	}

	if (command.args && !args.length) {
		let reply = `${message.author}, bota os argumentos seu vagabundo >:(`;

		if (command.usage) {
			reply += `\n\nO jeito certo de usar é: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	const { cooldowns } = client;

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
			return message.reply(`Espere mais ${timeLeft.toFixed(1)} segundo(s) antes de usar o \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Não tô conseguindo executar o comando :(');
	}
});

client.login(token);