#!/usr/bin/env node
'use strict'

const express = require('express')
const socketIO = require('socket.io')
const socketAuth = require('socketio-auth')
const serveStatic = require('serve-static')
const path = require('path')
const MinecraftClient = require('./lib/minecraft-client')

class MinecraftWeb {
  constructor (PASSWORD = process.env.PASSWORD || String(new Date())) {
    const PORT = process.env.PORT || 3000
    const STATIC = path.join(__dirname, path.join('client', 'dist'))

    const server = express()
      .use(serveStatic(STATIC))
      .listen(PORT, () =>
        console.log(`Listening on ${PORT}, with password ${PASSWORD}`)
      )

    const io = socketIO(server)

    socketAuth(io, {
      authenticate: function (socket, data, callback) {
        // get credentials sent by the client
        return callback(null, data.password === PASSWORD)
      }
    })

    this.minecraft = {}
    io.on('connection', socket => {
      console.log('Client connected')
      socket.on('create', this.create)
      socket.on('disconnect', () => console.log('Client disconnected'))
      socket.emit('clients', {
        clients: this.minecraft.keys()
      })
    })
    this.io = io
  }

  create (botOptions = {}) {
    const username = botOptions.username || 'Player'
    try {
      const minecraft = MinecraftClient({
        bot: botOptions,
        io: this.io.of(`/${username}`)
      })
      this.minecraft[username] = minecraft
    } catch (error) {
      this.io.emit('failconnect', username)
    }
    this.io.emit('connected', username)
  }
}

module.exports = MinecraftWeb
