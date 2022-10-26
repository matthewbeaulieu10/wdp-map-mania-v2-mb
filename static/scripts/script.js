function letMeKnowImWorking () {
    console.log("working!")
}

function begin() {
    getMarkers()
}

async function getMarkers() {
    try{
        const response = await fetch("/places")
        const data = await response.json()
        makeMarkers(data)
    } catch(e) {
        console.log("dis crap not working")
    }
    
}

//TYPECASTING VARIABLES -- THIS IS WHERE I LEFT OFF
function makeMarkers(data) {
    var places = Object.values(data.places)
    for (let i = 0; i < places.length; i++) {
        var location = places[i].location
        var lat = Number(places[i].lat)
        var lng = Number(places[i].lng)
        var name = places[i].name
        new google.maps.Marker({position: {lat:lat,lng:lng}, map:actualMap, title: location})
    } 
}

var actualMap;

function initMap() {
    actualMap = new google.maps.Map(document.getElementById("mapDiv"), {
        center: {lat:0,lng:0},
        zoom:2,
    });

    var homeMarker = new google.maps.Marker({position:{lat:41.970760,lng:-88.351590},map:actualMap});

    google.maps.event.addListener(actualMap, 'idle', function() {
        var zoom = actualMap.getZoom()
        var closeEnough = false;

        if (actualMap.getBounds().contains(homeMarker.position)) {
            closeEnough = true;
        }

        console.log("closeEnough:"+closeEnough+" zoom:"+zoom)
    })
}