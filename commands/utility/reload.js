const fs = require('fs');

module.exports = {
	name: 'reload',
	description: 'Recarrega um comando.',
	args: true,
	permissions: 'ADMINISTRATOR',
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`Não há nenhum comando com o nome ou alias \`${commandName}\`, ${message.author}!`);
		}

		const commandFolders = fs.readdirSync('./commands');
		const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${commandName}.js`));

		delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

		try {
			const newCommand = require(`../${folderName}/${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`O comando \`${newCommand.name}\` foi recarregado!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`Houve um erro ao recarregar o \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};