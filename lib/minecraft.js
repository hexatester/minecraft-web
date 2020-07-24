const { createBot } = require('mineflayer')

class MinecraftClient {
  constructor (options = {}) {
    this.options = options
  }

  connect () {
    this.bot = createBot(this.options.bot)
  }
}

module.exports = MinecraftClient
