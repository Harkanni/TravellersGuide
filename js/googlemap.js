console.log("Googlemap file mounted")
const googleMapBox = document.getElementById('map');
const destination = document.querySelector('#destination').value

var origin = {lat: 6.5227, lng:3.6218}
var destinations = {lat: 7.7827, lng: 4.5418}
var mapOptions = {
	center: origin,
	zoom: 7,
	mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(googleMapBox, mapOptions)

new google.maps.Marker({position: origin, map: map})

// DIRECTIONS

var directionService = new google.maps.DirectionsService()

var directionRender = new google.maps.DirectionsRenderer();


// BIND TO MAP
directionRender.setMap(map);

function calcRoute () {
	// request 
	var request = {
		origin: getOrigin(), //origin,
		destination: destination, // destination,
		travelMode: google.maps.TravelMode.DRIVING,
		// unit: google.maps.UnitSystem.IMPERIAL
	}
	directionRender.setDirections({routes: []})

	// PASS REQUEST TO THE ROUTE METHOD
	directionService.route(request, (result, status)=> {
		console.log(result)
		/* if(result.status !== "OK") {
			console.log("Result not found")
			alert(`Result not found, \n You Can't Drive to your destination*`)
		} */

		if(status == google.maps.DirectionsStatus.OK) {
			//	get distance and time 
			var output = document.querySelector(".routes-wrapper");
			console.log(result.routes[0].legs[0].distance.text)
			console.log(result.routes[0].legs[0].duration.text)
			var loc = document.getElementById("location").value

			output.innerHTML = `
									<h3>Best Available Route</h3>
									<div class="routes">
										<div class="routes-box place">
											<h1>Place</h1>
											<p>Going from <span>${loc}</span> to <span>${document.getElementById("destination").value}</span></p>
										</div>
										<div class="routes-box time">
											<h1>Expected Time Of Arival</h1>
											<p>You're Likely to arrive at your destination in <span>${result.routes[0].legs[0].duration.text}</span> give or take 20mins</p>
										</div>
										<div class="routes-box distance">
											<h1>Distance</h1>
											<p>The distance from your current location to your destination is <span>${result.routes[0].legs[0].distance.text}</span></p>
										</div>
										<div class="routes-box travel-mode">
											<h1>Travelling Mode</h1>
											<p>Your Prefered travel mode is <span>Vehicle</span></p>
										</div>
									</div>
								`
								

			//	displayRoute
			directionRender.setDirections(result)
		} else {
			// delete route from map
			directionRender.setDirections({routes: []})

			// return to center
			map.setCenter(origin)

		}
	})
}

// Oigin 
function getOrigin() {
	var current_position = document.getElementById("location").value
	console.log(current_position)
	if (current_position.length == 0) {
		return origin
	} else {
		return current_position
	}
}

//	calcRoute()
function getRoute(event) {
	if(event.key === "Enter"){
		calcRoute()
	}
}

// AUTO COMPLETE
options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false
  };

var input1 = document.getElementById("location")
var autoComplete1 = new google.maps.places.Autocomplete(input1, options)

var input2 = document.getElementById("destination")
var autoComplete2 = new google.maps.places.Autocomplete(input2, options)

// Reset Route
routeBtn = document.querySelector(".route-reset")
routeBtn.addEventListener("click", resetRoute)
function resetRoute() {
	// SCROLL THE HEAD SECTION INTO VIEW
	var htmlEl = document.querySelector("html")
	htmlEl.scrollIntoView()

	// SET MAP TO ORIGIN
	map.setCenter(origin)

	// CLEAR ALL PREVIOUS ROUTE
	directionRender.setDirections({routes: []})

	// CLEAR ALL VALUES IN INPUT FIELD
	input1.value = ""
	input2.value = ""
}

// CREAE ROUTE
createRouteBtn = document.querySelector(".route-create")
createRouteBtn.addEventListener("click", calcRoute)
