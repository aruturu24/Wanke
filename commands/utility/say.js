module.exports = {
	name: 'say',
	description: 'Repete a mensagem que você colocar.',
	aliases: ['dizer', 'diga', 'repita', 'fala'],
	args: true,
	argsManual: true,
	usage: '<mensagem>',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
		message.channel.send(args);
	},
};