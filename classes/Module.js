const bot = require("../bot.js");
class Module {
    constructor(options) {
        if(!options) throw new Error("No options passed");
        if(!options.name) throw new Error("Missed 'name' argument");
        if(!options.description) throw new Error("Missed 'description' argument");
        this.name = options.name;
        this.description = options.description;
        this.rusdescription = options.rusdescription;
        this.commands = new Map();
        this.image = options.image;
        bot.modules.set(options.name, this);
    }
    addCommand(command) {
        this.commands.set(command.name, command);
        command.module = this;
        return this;
    }
}
module.exports.Module = Module;