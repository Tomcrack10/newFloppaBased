const { Schema, model } = require("mongoose")

module.exports = model(
    "boost-count",
    new Schema({
        Guild: String,
        Channel: String,
        Member: String
    })
);