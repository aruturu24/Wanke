const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'Lista todos os comandos disponíveis, ou fala sobre um comando específico.',
	aliases: ['commands', 'comandos', 'ajuda'],
	usage: '[nome do comando]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Aqui está a lista de todos meus comandos:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nVocê pode tentar o \`${prefix}help [nome do comando]\` para saber sobre um comando específico!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Eu te mandei tudo na sua DM!');
				})
				.catch(error => {
					console.error(`Não consegui mandar dm para o ${message.author.tag}.\n`, error);
					message.reply('Não consegui enviar DM para você! Verifique suas configurações de privacidade.');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Isso não é um comando válido!');
		}

		data.push(`**Nome:** ${command.name}`);

		if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Descrição:** ${command.description}`);
		if (command.usage) data.push(`**Jeito de usar:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};