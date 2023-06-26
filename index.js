// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials} = require('discord.js');
const { token } = require('./config.json');
const RandomPhraseBot = require('./randomPhrase.js');
const bot = new RandomPhraseBot();


// Create a new client instance
const client = new Client({ intents: 
	[
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.DirectMessageReactions,
	GatewayIntentBits.DirectMessageTyping, 
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.MessageContent
], 'partials': [Partials.Channel]});

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[ATTENTION] Il manque des données requises dans la commande ${filePath} pour l'executer correctement .`);
		}
	}
}
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`Pas de correspondance trouvé pour ${interaction.commandName} .`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Il y a une erreur dans la code de la commande!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Il y a une erreur dans la code de la commande!', ephemeral: true });
		}
	}
 
});
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
 if (message.content.startsWith('!plop')) {
	  const phraseAleatoire = bot.phrases[Math.floor(Math.random() * bot.phrases.length)];
	  message.channel.send("Le proverbe du jour : " + phraseAleatoire);
	}
  });

  client.login(token);