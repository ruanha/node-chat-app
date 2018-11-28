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
  li.textContent = `${message.from}: ${message.text}`
  document.getElementById('messages').appendChild(li)
})

socket.on('newLocationMessage', function(message) {
  const li = document.createElement('li')
  const a = document.createElement('a')
  a.setAttribute('href', message.url)
  a.setAttribute('target', '_blank')
  a.textContent = 'My current position'
  li.textContent = `${message.from}: `
  li.appendChild(a)
  document.getElementById('messages').appendChild(li)
})


document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault()
  const messageTextbox = document.getElementById('message')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.value
  }, function() {
    messageTextbox.value = ''
  })
})

const locationBtn = document.getElementById('send-location')
locationBtn.addEventListener('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationBtn.setAttribute('disabled', 'disabled')
  locationBtn.textContent = 'Sending location...'

  navigator.geolocation.getCurrentPosition(function(position) {
    locationBtn.removeAttribute('disabled')
    locationBtn.textContent = 'Send location'
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  }, function() {
    locationBtn.removeAttribute('disabled')
    locationBtn.textContent = 'Send location'
    alert('Unable to fetch location.')
  })
})