#!/usr/bin/env node
'use strict'

const express = require('express')
const socketIO = require('socket.io')
const socketAuth = require('socketio-auth')

class MinecraftWeb {
  constructor (password = process.env.PASSWORD || String(new Date())) {
    const PORT = process.env.PORT || 3000
    const PASSWORD = process.env.PASSWORD || String(new Date())
    const INDEX = '/index.html'

    const server = express()
      .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
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

    io.on('connection', socket => {
      console.log('Client connected')
      socket.on('disconnect', () => console.log('Client disconnected'))
    })
  }
}

module.exports = MinecraftWeb
