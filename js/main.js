function setActive(evt) {
	var eL = document.querySelectorAll(".weather-nav")
	eL.forEach((item)=>{
		item.classList.remove("active")
	})
	evt.classList.add("active")
}


// SIDEBAR TOGGLING
var  primaryNav = document.querySelector("#responsive-navbar")
var toggleBtn = document.querySelector(".fa-sliders-h")
var icon = document.querySelector(".fa-window-close")

toggleBtn.addEventListener("click", () => {
	primaryNav.setAttribute("data-viscible", "true")
})
icon.addEventListener("click", () => {
	primaryNav.setAttribute("data-viscible", "false")
})
