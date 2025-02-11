require('dotenv').config()

const express = require('express')
const hbs = require('hbs')
const app = express()
// const axios = require('axios')

// require spotify-web-api-node package here:

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
const SpotifyWebApi = require('spotify-web-api-node')

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
})
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body['access_token']))
  .catch((error) =>
    console.log('Something went wrong when retrieving an access token', error)
  )
// Our routes go here:
app.get('/', (req, res) => {
  res.render('home-page', { docTitle: 'home-page' })
})
app.get('/artist-search/:id', (res, req) => {
  spotifyApi
    .searchArtists(req.query)
    .then((data) => {
      console.log('The received data from the API: ', data.body)
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      return data.body
    })
    .catch((err) =>
      console.log('The error while searching artists occurred: ', err)
    )
})

app.listen(3000, () =>
  console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊')
)
