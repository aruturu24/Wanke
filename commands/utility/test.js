module.exports = {
	name: 'test',
	description: 'Ver se o bot está ativo.',
	aliases: ['teste'],
	args: false,
	usage: '',
	guildOnly: false,
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Tô vivo!');
	},
};