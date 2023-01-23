const request = require('postman-request')

const forecast = (lat, long, callback) => {
  const apiKey = '16eab8e94e8f4e93cff8558de1d49279'
  const baseUrl = 'http://api.weatherstack.com/current'
  const query = `${lat},${long}`
  const units = 'm'
  const url = `${baseUrl}?access_key=${apiKey}&query=${query}&units=${units}`

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined)
    } else if (body.error) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      const temp = body.current.temperature
      const feel = body.current.feelslike
      const desc = body.current.weather_descriptions[0]
      const icon = body.current.weather_icons[0]
      // callback(undefined, `${desc}. It is currently ${temp} degrees out and it feels like ${feel} degrees out.`)
      callback(undefined, {
        desc,
        temp,
        feel,
        icon
      })
    }
  })
}

module.exports = forecast