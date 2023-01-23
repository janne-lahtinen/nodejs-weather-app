const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const icon = document.querySelector('#icon')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()

  messageOne.classList.remove('bold')
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  icon.textContent = ''

  const location = search.value

  fetch(`http://localhost:3000/weather?address=${location}`)
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      messageOne.textContent = data.error
    } else {
      messageOne.classList.add('bold')
      messageOne.textContent = data.location 
      messageTwo.textContent = `${data.forecast.desc}. It is currently ${data.forecast.temp} degrees out and it feels like ${data.forecast.feel} degrees out.`
      const img = document.createElement('img')
      img.src = data.forecast.icon
      img.alt = 'Weather icon'
      icon.appendChild(img) 
    }
  })
})