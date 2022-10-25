const { Schema, model } = require("mongoose")

module.exports = model(
    "total-count",
    new Schema({
        Guild: String,
        Channel: String,
        Member: String
    })
);