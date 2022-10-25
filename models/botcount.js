const { Schema, model } = require("mongoose")

module.exports = model(
    "bot-count",
    new Schema({
        Guild: String,
        Channel: String,
        Member: String
    })
)