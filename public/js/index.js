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
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const template = document.getElementById('message-template').textContent
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime,
  })
  document.getElementById('messages').innerHTML += html
})

socket.on('newLocationMessage', function(message) {
  const formattedTime = moment(message.createdAt).format('h:mm a')
  const template = document.getElementById('location-message-template').textContent
  const html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url,
  })
  document.getElementById('messages').innerHTML += html  
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