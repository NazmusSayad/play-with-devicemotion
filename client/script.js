import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js'
import motion from './motion.js'

const socket = io()
socket.on('connect', () => {
  document.body.innerHTML = 'started...'
})

motion((pos) => {
  socket.emit('movement', pos)
})
