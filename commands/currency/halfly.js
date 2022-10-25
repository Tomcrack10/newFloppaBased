const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;
module.exports = {
        name: "hafly",
        run: async (client, message, args) => {

    let result = await cs.hafly({
        user: message.author,
        guild: message.guild,
        amount: 100,

    });
    if (result.error) return message.channel.send(`You have used hafly recently Try again in ${result.time}`);
    else message.channel.send(`You have earned $${result.amount}.`)
}

};