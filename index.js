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
		{"name":"home","location":"south elgin, illinois","lat":"41.970760","lng":"-88.351590","hint":"an hour out of the windy city"},
		{"name":"carlsons","location":"lakeville, minnesota","lat":"44.603970","lng":"-93.325600","hint":"an hour out of the twins"},
		{"name":"carp","location":"carpinteria, california","lat":"34.398918","lng":"-119.518356","hint":"west coast, on the coast"},
		{"name":"dreamz","location":"andorra","lat":"42.546245","lng":"1.601554","hint":"a country that's not a country, bordered by una país and un autre pays, where those languages both originated."},
		{"name":"happy ice","location":"manaus, brazil", "lat":"-3.106390", "lng":"-60.026290","hint":"a city in the amazon"},
		{"name":"grandpas cabin","location":"friendship, wisconsin","lat":"44.053880","lng":"-89.787610","hint":"in the middle of the land of cheese"},
		{"name":"hacksaw ridge","location":"okinawa, japan","lat":"26.33583","lng":"127.80139","hint":"eastern edge of the world, the location of a 2016 film starring an actor who has also played spiderman"},
		{"name":"beautiful place","location":"beaulieu del mar, france","lat":"43.729019","lng":"4.021010","hint":"my last name"},
		{"name":"ot","location":"jerusalem, israel","lat":"31.76904","lng":"35.21633","hint":"where jesus did the really important stuff"},
		{"name":"arturze home","location":"riga, latvia","lat":"56.946285","lng":"24.105078", "hint":"#3 on Lewis Men's soccer"}
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

