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
		{"name":"home! where I grew up and where both of my families live. In high school I was adopted into another family, both families live in Thornwood in South Elgin.","location":"south elgin, illinois","lat":"41.970760","lng":"-88.351590","hint":"an hour out of the windy city"},
		{"name":"my best friend peter's home! Every time I go there I know it is a place of peace, unity, love, and joy. They have such an amzaing family.","location":"lakeville, minnesota","lat":"44.603970","lng":"-93.325600","hint":"an hour out of the twins"},
		{"name":"carpinteria beach, home of 'the spot' burger shack and my favorite place to go when I visit my cousins who live about 40 minutes east. there are platforms some distance out from the beach and me and my cousin daniel love to free dive about 15 feet to the bottom of the ocean from the platforms.","location":"carpinteria, california","lat":"34.398918","lng":"-119.518356","hint":"west coast, on the coast"},
		{"name":"andorra! my girlfriend loves to speak french, i love to speak spanish, and this beatiful city in the valley has become a dream vacation spot for us (or for me anyway).","location":"andorra","lat":"42.546245","lng":"1.601554","hint":"a country that's not a country, bordered by una país and un autre pays, where those languages both originated."},
		{"name":"went here in 2014 with my church. this ice cream shop hosted us everyday for lunch and dinner and were the best. it was where I learned to love rice, and now I eat rice everyday.","location":"manaus, brazil", "lat":"-3.106390", "lng":"-60.026290","hint":"a city in the amazon"},
		{"name":"grandpas cabin. nothin is better than sittin down with my grandpa, drinking his 'candy', and letting the old man tell stories on the boat for hours.","location":"friendship, wisconsin","lat":"44.053880","lng":"-89.787610","hint":"in the middle of the land of cheese"},
		{"name":"i'm not a big history guy, but this is the scene for one of my favorite films, 'hacksaw ridge'. it was the location of a battle in WWII where a truly incredible story happened.","location":"okinawa, japan","lat":"26.33583","lng":"127.80139","hint":"eastern edge of the world, the location of a 2016 film starring an actor who has also played spiderman"},
		{"name":"this place has my last name! always wanted to visit here.","location":"beaulieu del mar, france","lat":"43.729019","lng":"4.021010","hint":"my last name"},
		{"name":"the background to where my King did his work, and to so many awesome old testament stories.","location":"jerusalem, israel","lat":"31.76904","lng":"35.21633","hint":"where jesus did the really important stuff"},
		{"name":"my teammate arturze's home. we sat down a while and talked about it and it just sounded like a really awesome place i'd like to visit.","location":"riga, latvia","lat":"56.946285","lng":"24.105078", "hint":"#3 on Lewis Men's soccer"}
	]
}

//fetch JSON object
app.get('/places', (request, response) => {
	response.type('application/json')
	response.send(JSON.stringify(favPlaces, null, 4))
})

//go to game page
app.get('/game',function(req,res) {
	res.sendFile(__dirname + '/static/game.html')
})

//go to prize page
app.get('/prize', function(req,res) {
	res.sendFile(__dirname + '/static/prize.html')
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

