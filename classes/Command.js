const bot = require("../bot.js");
class Command {
    constructor(options) {
        if(!options) throw new Error("No options passed");
        if(!options.name) throw new Error("Missed 'name' argument");
        if(!options.file) throw new Error("Missed 'file' argument");
        if(!options.description) throw new Error("Missed 'description' argument");
        if(!options.usage) throw new Error("Missed 'usage' argument");
        bot.commands.forEach((value, key, map) => {
            if(value.name == options.name) throw new Error(`${options.name} already exists!`);
        });
        this.name = options.name;
        this.file = options.file;
        this.description = options.description;
        this.module = false;
        this.usage = options.usage;
        let inline;
        if(!options.isInline) inline == true;
        else inline = options.isInline;
        this.isInline = inline;
        bot.commands.set(options.name, this);
    }
}
module.exports.Command = Command;