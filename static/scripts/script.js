//early dev testing
function letMeKnowImWorking () {
    console.log("working!")
}

//function called when button is pressed on hompage
//directs user to game page
async function playGame() {
    location.href=location.href + 'game'
}

//button on game page to take user back to instructions
async function backToInstructions() {
    location.href=location.href.slice(0,-5)
}

//retrieves the list of markers from the node.js server
async function getMarkers() {
    try{
        const response = await fetch("/places")
        const data = await response.json()
        saveMarkers(data)
    } catch(e) {
        console.log("dis crap not working")
    }
    
}

//declared list of markers so that it can be used in multiple scopes
var markers; 

//saves the markers to a JSON object
function saveMarkers(data) {
    markers = Object.values(data.places)
    console.log(markers)
}

//takes all of the unfound markers and exposes them, takes you to winGame()
function cheat(data) {
    var remainingMarkers = []
    var remainingInfoWindows = []
    for (let i = 0; i < markers.length; i++) {
        var location = markers[i].location
        var lat = Number(markers[i].lat)
        var lng = Number(markers[i].lng)
        var name = markers[i].name
        new google.maps.Marker({position: {lat:lat,lng:lng}, map:actualMap, title: location})
    } 
    winGame()
}

//map variable declared in global scope
var actualMap;


//creates map, adds idle listener
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

//everytime the map is idle this function checks to see how
//many spots are in bounds, finds the zoom level, and sees if 
//the user is close enough to find a spot. if so, it makes the marker
//and alerts the user of all these things.
function idleReset() {
    var zoom = actualMap.getZoom()
    var inWindow = 0;
    var j = 1;
    var foundMarkers = [];
    var random = Math.floor(Math.random() * markers.length)
    var hint = markers[random].hint;

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
                alert("you found: " + name)
                if (markers.length == 0) {
                    winGame()
                }
            }
        }
    }

    document.getElementById("inGameStats").innerHTML = `
    spots in window: ${inWindow},
    zoom level: ${zoom},
    locations left to find: ${markers.length},
    hint: ${hint}`;
}

//adds the button to take you to the prize page
function winGame() {
    alert("you won!")
    document.getElementById("buttonBar").innerHTML= "<button onClick='collectPrize()'>Collect Your Prize!</button>"
}

//redirects to the prize page
async function collectPrize() {
    cutTheCrap = location.href=location.href.slice(0,-5);
    urlIWantThisCrapToGoTo = cutTheCrap + "/prize"
    location.href = urlIWantThisCrapToGoTo
}