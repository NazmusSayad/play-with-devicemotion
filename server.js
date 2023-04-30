import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'

const app = express()
app.use('/admin', express.static('./admin'))
app.use('/', express.static('./client'))

const httpServer = createServer(app)
const io = new Server(httpServer)

io.on('connection', (socket) => {
  if (socket.handshake.auth.role === 'admin') {
    socket.join('admin')
  }

  socket.on('movement', (...args) => {
    console.log(...args)
    io.to('admin').emit('movement', ...args)
  })
})

httpServer.listen(8080)
