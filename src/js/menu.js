(function() {

	var active = document.querySelector(".main-header");
	var toggle = document.querySelector(".main-header__toggle");
	var nav = document.querySelector(".main-nav");
	var close = false;

	toggle.addEventListener("click", function(event) {
		event.preventDefault();
		if (!close) {
			active.classList.add("main-header--menu-active");
			toggle.classList.add("main-header__toggle--close");
			nav.classList.add("main-nav--menu-active");
			close = true;
		} else {
			active.classList.remove("main-header--menu-active");
			toggle.classList.remove("main-header__toggle--close");
			nav.classList.remove("main-nav--menu-active");
			close = false;
		}
	});

})();
