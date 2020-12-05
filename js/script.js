function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});


var mySwiper = new Swiper('.swiper-container', {
	loop: true,
	slidesPerView: 2,

	navigation: {
		nextEl: '.navigation__arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		576: {
			slidesPerView: 2,
		},
	},
})


const buttonBurgerMenu = document.querySelector('.menu__button-burger');
const headerRow = document.querySelector('.header__row');

function toogleBurgerMenu() {
	headerRow.classList.toggle('header-active');
	buttonBurgerMenu.classList.toggle('menu__button-burger-active');
}

buttonBurgerMenu.addEventListener('click',toogleBurgerMenu);