const fs = require("fs");
let plugins = fs.readdirSync("./cmds");
for(let i = 0; i < plugins.length; i++)
    require(`./cmds/${plugins[i]}/main.js`);
module.exports.plugins = plugins;