let socket = io()

socket.on('connect', function() {
  console.log('Connected to server')

})

socket.on('disconnect', function() {
  console.log('Disconnected from server')
})

socket.on('newEmail', function(email) {
  console.log(email)
})

socket.on('newMessage', function(message) {
  console.log(message)
  const li = document.createElement('li')
  li.innerHTML = `${message.from}: ${message.text}`
  document.getElementById('messages').appendChild(li)
})

/*socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi Donny!',
}, function(data) {
  console.log('got the message, thanks!', data)
})*/

document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: document.getElementById('message').value
  }, function() {

  })
})