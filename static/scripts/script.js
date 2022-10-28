function letMeKnowImWorking () {
    console.log("working!")
}

//DON'T THINK I NEED 
//------------------------
// function begin() {
//     getMarkers()
// }
//-------------------------

async function getMarkers() {
    try{
        const response = await fetch("/places")
        const data = await response.json()
        saveMarkers(data)
    } catch(e) {
        console.log("dis crap not working")
    }
    
}

var markers; 

function saveMarkers(data) {
    markers = Object.values(data.places)
    console.log(markers)
}

//NEED THIS FOR CHEAT CODE (prolly)
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
var homeMarker;


//creates map, gets and saves markers, right now creates homemarker, adds idle listener
function initMap() {
    actualMap = new google.maps.Map(document.getElementById("mapDiv"), {
        center: {lat:0,lng:0},
        zoom:2,
    });

    getMarkers()

    google.maps.event.addListener(actualMap, 'idle', function() {

        idleReset()

    })


    
}

function idleReset() {
    var zoom = actualMap.getZoom()
    var inWindow = 0;
    var j = 1;
    var foundMarkers = [];

    for (let i = 0; i < markers.length; i++) {
        var lat = Number(markers[i].lat)
        var lng = Number(markers[i].lng)
        var title = markers[i].location
        var name = markers[i].name 
    
        if (actualMap.getBounds().contains({lat:lat,lng:lng})) {
            inWindow++;
            if (zoom > 9) {
                markers.splice(i, 1)
                foundMarkers[j] = new google.maps.Marker({position:{lat:lat,lng:lng},map:actualMap,title:title})
                alert(name)
            }
        }
    }

    document.getElementById("inGameStats").innerHTML = `
    spots in window: ${inWindow},
    zoom level: ${zoom},
    locations left to find: ${markers.length}`;
}