# Discord Welcome BOT

HyperCrypto Labs Presents, which is the author of [HyperDeFi](https://hyperDeFi.org/)

The **Welcome BOT** can:

- Auto send a welcome card to a `new-arrival` channel
    - with your own template image
- Prevent spams from fake users (only real human allowed)
    - Auto add a `Locked` role to new member, for only showing the rules channel and some channels without sending
      permissions, so new members can only give emoji reactions to the rules message
    - If a new member give a correct emoji reaction to the rules message (which you expect), he will gain a `Unlocked`
      role (lost the `Locked` role at the same time), so that he can chat in your channels as a normal user
    - You can config the role names as you will
- Works anywhere
    - For example, you can run it on your personal PC (Windows, Mac, Linux...)
    - or even a Raspberry Pi or a VM
    - and of course, if you have a VPS server, you can make it working 7 x 24 hrs avoid instability caused by network
      shakes or occasional power outages in your home or office environment...

## How to use it?

#### Preparation

- Linux / Mac OS / Linux
- Install the latest [Node.js](https://nodejs.org/en/), just download and install
- And [Yarn - Package Manager](https://yarnpkg.com/) is recommended, also quite easy with only one command

#### Download this repo

`git clone`

```bash
$ git clone https://github.com/HyperDeFiProtocol/discord-welcome-bot.git
```

or even download and extract to a new folder

#### Save your fonts and welcome card template image file

- fonts to `./assets/fonts`
- template image file to `./assets/images`

#### Config

- Edit the `./config.yaml` file, fill the items

#### Run it

```bash
$ node index.js
```

#### Leave, it will keep working for you

## Development

Build with [discord.js](https://discord.js.org/#/), feel free to make your contributions to us.

- [discord.js Guide](https://discordjs.guide/#before-you-begin)
- [discord.js Documentation](https://discord.js.org/#/docs/)
- [discord developer portal](https://discord.com/developers/applications)
- [discord official documentation](https://discord.com/developers/docs/intro)

