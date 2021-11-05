const fs = require("fs");
const {client} = require('./utils/bot');
const config = require('./utils/config');


// events
//
for (const file of fs.readdirSync('./events').filter(file => file.endsWith('.js'))) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}


client.login(config.token)
