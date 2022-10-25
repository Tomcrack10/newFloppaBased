const { Client, Message } = require('discord.js');
const SnakeGame = require('snakecord')
module.exports = {
    name: 'snakegame',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const snakeGame = new SnakeGame({
            title: 'Snake',
            color: "BLUE",
            timestamp: true,
            gameOverTitle: "Game Over!"
        });
        return snakeGame.newGame(message);
    }
}
