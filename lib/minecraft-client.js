const { createBot } = require('mineflayer')

class MinecraftClient {
  constructor (options = {}) {
    this.botOptions = options.bot
    this.io = options.io
  }

  connect () {
    try {
      const bot = createBot(this.options.bot)
      this.bot = bot
      this.register(bot)
      return bot
    } catch (error) {
      console.error(error.message, error)
    }
  }

  register (bot = this.bot) {
    const io = this.io
    io.bind(bot)
    io.on('connection', socket => {
      socket.on('chat', bot.chat)
    })
  }
}

module.exports = MinecraftClient
