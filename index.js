const express = require('express')
app = express()

var url = require('url');


app.use(express.json());
const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))

var favPlaces = {
	"places": [
		{"name":"home","location":"south elgin, illinois","lat":"41.970760","lng":"-88.351590"},
		{"name":"carlsons","location":"lakeville, minnesota","lat":"44.603970","lng":"-93.325600"},
		{"name":"carp","location":"carpinteria, california","lat":"34.398918","lng":"-119.518356"},
		{"name":"chelsea","location":"london, uk","lat":"51.487469","lng":"-0.168680"},
		{"name":"happy ice","location":"manaus, brazil", "lat":"-3.106390", "lng":"-60.026290"},
		{"name":"grandpas cabin","location":"friendship, wisconsin","lat":"44.053880","lng":"-89.787610"},
		{"name":"carl is bad","location":"carlsbad, california","lat":"33.166039","lng":"-117.337929"},
		{"name":"beautiful place","location":"beaulieu del mar, france","lat":"43.729019","lng":"4.021010"},
		{"name":"ot","location":"jerusalem, israel","lat":"31.76904","lng":"35.21633"},
		{"name":"arturze home","location":"riga, latvia","lat":"56.946285","lng":"24.105078"}
	]
}

app.get('/places', (request, response) => {
	console.log('Calling places on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(favPlaces, null, 4))
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)

