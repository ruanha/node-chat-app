let socket = io()

function scrollToBottom() {
  const messages = document.getElementById('messages')
  const newMessage = messages.lastElementChild;
  const prevMessage = newMessage.previousElementSibling;
 
  const clientHeight = messages.clientHeight;
  const scrollTop = messages.scrollTop;
  const scrollHeight = messages.scrollHeight;
 
  const newMessageStyle = window.getComputedStyle(newMessage, null);
  const newMessageHeight = parseInt(newMessageStyle.getPropertyValue("height"));
  let prevMessageHeight = 0;
  if (prevMessage) {
    const prevMessageStyle = window.getComputedStyle(prevMessage, null);
    prevMessageHeight = parseInt(prevMessageStyle.getPropertyValue("height"));
  }
 
  if ((clientHeight + scrollTop + newMessageHeight + prevMessageHeight) >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
}

socket.on('connect', function() {
  console.log('Connected to server')
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name')
  const room = urlParams.get('room')

  socket.emit('join', { name, room }, function(err) {
    if (err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('No error')
    }
  })
})

socket.on('disconnect', function() {
  console.log('Disconnected from server')
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
  scrollToBottom()
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
  scrollToBottom()
})

socket.on('updateUserList', function(users) {
  let ol = document.createElement('ol')

  users.forEach(function(user) {
    let li = document.createElement('li')
    li.textContent = user
    ol.appendChild(li)
  })
  document.getElementById('users').innerHTML = ''
  document.getElementById('users').appendChild(ol)
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