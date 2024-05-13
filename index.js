const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, message => {
    if(message.author.bot) return;
    let res = findLink(message.content);
    if(res == "") return;
    message.channel.send(res);

});

function findLink(msg) {
    let result = msg.replace(/(?:twitter|tumblr).com\/.*\/.*/gm, `vx$&`);
    if(result ==msg){
        result = msg.replace(/x.com(\/.*?\/.*)/gm, `vxtwitter.com$1`);
    }
    return (result==msg)?"":result;
}
// Log in to Discord with your client's token
client.login(token);