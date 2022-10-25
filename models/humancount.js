const { Schema, model } = require("mongoose")

module.exports = model(
    "human-count",
    new Schema({
        Guild: String,
        Channel: String,
        Member: String
    })
);