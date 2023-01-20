const request = require('postman-request')

const geocode = (address, callback) => {
  const search_text = encodeURIComponent(address)
  const mapApiKey = 'pk.eyJ1IjoiampiYWlsZXlzIiwiYSI6ImNsY3NyMTF3dDBxZ2EzdnAzMWU0NzJ0YngifQ.VLobVbovNA0K3mn0FdseYw'
  const endpoint = 'mapbox.places'
  const limit = 1
  const url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${search_text}.json?access_token=${mapApiKey}&limit=${limit}`

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to geolocation service.', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      place = body.features[0].place_name
      lat = body.features[0].center[1]
      long = body.features[0].center[0] // long, lat in array
      callback(undefined, { 
        location: place, 
        lat, 
        long })
    }
  })
}

module.exports = geocode