const mineflayer = require('mineflayer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
    const host = await askQuestion('Enter the server IP: ');
    const port = parseInt(await askQuestion('Enter the server port (default: 25565): ') || '25565', 10);
    const numberOfBots = parseInt(await askQuestion('Enter the number of bots to join: '), 10);
    const usernamePrefix = await askQuestion('Enter the username prefix (e.g., Bot): ');
    const delayBetweenBots = 4000; // 4 seconds delay

    rl.close();

    function createBot(username) {
        const bot = mineflayer.createBot({
            host: host,
            port: port,
            username: username,
        });

        bot.on('login', () => {
            console.log(`${username} has joined the server`);
        });

        bot.on('end', () => {
            console.log(`${username} disconnected`);
        });

        bot.on('error', (err) => {
            console.error(`${username} encountered an error:`, err);
        });
    }

    for (let i = 1; i <= numberOfBots; i++) {
        const username = `${usernamePrefix}${i}`;
        createBot(username);
        await new Promise(resolve => setTimeout(resolve, delayBetweenBots));
    }
}

main();
