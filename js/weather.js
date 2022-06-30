var addressEl = document.getElementById("destination")
addressEl.addEventListener("keypress", function(event){
	if(event.key == "Enter") {

		// REMOVE ALL ITEM IN OWL
		var remove = document.querySelectorAll(".daily")
		remove.forEach((item, i) => {
			console.log(item)
			$(".owl-carousel").owlCarousel().trigger('remove.owl.carousel', 0).trigger("refresh.owl.carousel")
		})

		var remove = document.querySelectorAll(".hourly")
		remove.forEach((item, i) => {
			console.log(item)
			$(".owl-carousel").owlCarousel().trigger('remove.owl.carousel', 0).trigger("refresh.owl.carousel")
		})

		getWeatherData()
	}
})

var geocoder = new google.maps.Geocoder()
var weather_report
function getWeatherData() {
	// FETCH LOCATION Weather DATA
	var address = document.getElementById("destination").value
	
	// IF USERS SPECIFIES LOCATION
	if (address.length) {
		var latLNG = geocoder.geocode({"address": address})
		latLNG.then(res => {
		console.log(res.results[0].geometry.location.lat())
		var latitude = res.results[0].geometry.location.lat()
		var longitude = res.results[0].geometry.location.lat()

		weather_report = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&units=metric&appid=a1064ec8f051ec43d04e8d0e055bbec3`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
	
				show_hourly_weather_Report(data)
				return data;
			})
		
		})


	} else {
		navigator.geolocation.getCurrentPosition(success => {
			console.log(success)
			var {latitude, longitude} = success.coords
			console.log(latitude, longitude)
	
		// FETCH DATA FROM OPEN WEATHER
		weather_report = fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&units=metric&appid=a1064ec8f051ec43d04e8d0e055bbec3`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
	
				show_weather_report(data)
				return data;
			})
		})
	}
}
getWeatherData()

function show_weather_report(data) {
	var weather_report_hourly = data.hourly
	var weather_report_daily = data.daily
	var date

	var weatherEl = document.querySelector(".owl-carousel")


	console.log(weather_report)
	// The HOURLY WEATHER
	weather_report_hourly.forEach((info) => {
		var { temp, dt } = info
		var { description, icon } = info.weather[0]
		date = dt


		var div = document.createElement('div');
		div.setAttribute("class", "weather-box")
		div.classList.add("hourly")

		let result = `
				<div class="d-flex justify-content-between">
					<div>
						<p>Hourly</p>
						<span class="day">Mon</span>
					</div>
	      			<i class="${getIcon(info)}"></i>
	      		</div>
				<div class="desc d-flex justify-content-between">
					<span class="time">${moment(dt * 1000).format("LT")}</span>
					<span class="">${description}</span>
				</div>
	      		<span class="temp"style="font-size:1.5rem">${temp}<small>°c</small></span>
      		`
		div.innerHTML = result
		weatherEl.appendChild(div)
	})

	// ACTIVATING THE OWL-CAROUSEL PLUGIN
	setOwl()

	// SETTING THE TIMER
	//	setTime(date)
}



function show_hourly_weather_Report() {
	weather_report.then((data) => {
		var weather_report_hourly = data.hourly

		var remove = document.querySelectorAll(".hourly")
		remove.forEach((item, i) => {
			console.log(item)
			$(".owl-carousel").owlCarousel().trigger('remove.owl.carousel', 0).trigger("refresh.owl.carousel")
		})


		weather_report_hourly.slice(0, 3).forEach((info) => {
			var { temp, dt } = info
			var { description, icon } = info.weather[0]

			var div = document.createElement('div');
			div.setAttribute("class", "weather-box")
			div.classList.add("hourly")

			let result = `
				<div class="weather-box hourly">
					<div class="d-flex justify-content-between">
						<div>
							<p>Hourly</p>
							<span class="day">Mon</span>
						</div>
		      			<i class="${getIcon(info)}"></i>
		      		</div>
		      		<div class="desc d-flex justify-content-between">
						<span class="time">${moment(dt * 1000).format("LT")}</span>
						<span class="">${description}</span>
					</div>
		      		<span class="temp" style="font-size:1.5rem">${temp}<small>°c</small></span>
		      	<div>
      		`
			div.innerHTML = result

			$('.owl-carousel').owlCarousel().trigger('add.owl.carousel', [jQuery(result)]).trigger('refresh.owl.carousel')

		})
		// DEACTIVATING ALL WEATHER REPORTS THAT AREN'T Hourly
		// THIS WOULD LEAVE ONLY THE DAILY DATA ON DISPLAY 
		var remove = document.querySelectorAll(".daily")
		remove.forEach((item, i) => {
			console.log(item)
			$(".owl-carousel").owlCarousel().trigger('remove.owl.carousel', 0).trigger("refresh.owl.carousel")
		})



	})
	//	setTime(dt)
}

function show_daily_weather_Report() {
	weather_report.then((data) => {
		var weather_report_daily = data.daily

		var remove = document.querySelectorAll(".daily")
		remove.forEach((item, i) => {
			console.log(item)
			$(".owl-carousel").owlCarousel().trigger('remove.owl.carousel', 0).trigger("refresh.owl.carousel")
		})


		weather_report_daily.forEach((info) => {
			var { temp, dt } = info
			var { description, icon } = info.weather[0]


			var div = document.createElement('div');
			div.setAttribute("class", "weather-box")
			div.classList.add("daily")

			let result = `
					<div class="weather-box daily">
						<div class="d-flex justify-content-between">
							<div>
								<p>Daily</p>
								<span class="day">${moment(dt * 1000).format("dddd")}</span>
							</div>
			      			<i class="${getIcon(info)}"></i>
			      		</div>
			      		<div class="desc d-flex justify-content-between">
							<span class="time">${moment(dt * 1000).format("LT")}</span>
							<span class="">${description}</span>
						</div>
			      		<div class="temp-box">
			      			<span class="temp">Day: ${temp.night}<small>°c</small></span>
				      		<span class="temp">Night: ${temp.day}<small>°c</small></span>
			      		</div>
					</div>
	      		`
			div.innerHTML = result

			$('.owl-carousel').owlCarousel().trigger('add.owl.carousel', [jQuery(result)]).trigger('refresh.owl.carousel')

		})
		// DEACTIVATING ALL WEATHER REPORTS THAT AREN'T DAILY
		// THIS WOULD LEAVE ONLY THE DAILY DATA ON DISPLAY 
		var remove = document.querySelectorAll(".hourly")
		remove.forEach((item, i) => {
			// console.log(item)
			$(".owl-carousel").owlCarousel().trigger('remove.owl.carousel', 0).trigger("refresh.owl.carousel")
		})



	})
}



function setTime(dt) {
	console.log(dt)
	setInterval(() => {
		var time = document.querySelectorAll(".time")
		time.forEach((item) => item.innerHTML = moment(dt).format("LTS"))

		var day = document.querySelectorAll(".day")
		day.forEach((item) => item.innerHTML = moment(dt).format("dddd"))
	}, 1000)
}


function setOwl() {
	$('.owl-carousel').owlCarousel({
		autoplay: false,
		autoplayHoverPause: true,
		lazyLoad: true,
		loop: false,
		responsive: {
			0: {
				items: 1
			},
			485: {
				items: 1.8
			},
			720: {
				items: 3
			}
		},
		nav: false,
		dots: false,
	})
}

function getIcon(info) {
	var { description, icon } = info.weather[0]
	if (icon.includes("50d") || icon.includes("50n")) {
		return "fas fa-smog fa-5x"
	}
	if (icon.includes("13d") || icon.includes("13n")) {
		return "fas fa-snowflake fa-5x"
	}
	if (icon.includes("11d") || icon.includes("11n")) {
		return "fas fa-poo-storm fa-5x"
	}
	if (icon.includes("10n")) {
		return "fas fa-cloud-moon fa-5x"
	}
	if (icon.includes("10d")) {
		return "fas fa-cloud-sun fa-5x"
	}
	if (icon.includes("09d") || icon.includes("09n")) {
		return "fas fa-cloud-showers-heavy fa-5x"
	}
	if (icon.includes("04d") || icon.includes("04n")) {
		return "fas fa-cloud-meatball fa-5x"
	}
	if (icon.includes("03d") || icon.includes("03n")) {
		return "fas fa-cloud fa-5x"
	}
	if (icon.includes("02d")) {
		return "fas fa-cloud-sun fa-5x"
	}
	if (icon.includes("02n")) {
		return "fas fa-cloud-moon fa-5x"
	}
	if (icon.includes("01d")) {
		return "fas fa-sun fa-5x"
	}
	if (icon.includes("01n")) {
		return "fas fa-moon fa-5x"
	}
	else {
		console.log(icon)
	}
	
}

// AUTOCOMPLETE
addressEl
options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false
  };
  var autoComplete1 = new google.maps.places.Autocomplete(addressEl, options)





// $('.owl-carousel').owlCarousel().trigger('add.owl.carousel', [jQuery('<div class="Owl-item">' + result +'</div>')]).trigger('refresh.owl.carousel')
