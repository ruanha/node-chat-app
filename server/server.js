const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', {
    from: 'mike@example.com',
    text: 'Hey. Whats up?',
    createdAt: new Date(),
  })

  socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail)
  })

  socket.on('createMessage', (message) => {
    console.log('create message', message)
  })
  
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(port, () => {
  console.log(`server running on port ${port}`)
})