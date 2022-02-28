const { model, Schema } = require("mongoose");

module.exports = model(
    "Lockdown",
    new Schema({
        GuildID: String,
        ChannnelID: String,
        Time: String,
    })
);