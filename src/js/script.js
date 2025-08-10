////////////////////////////scroll////////////////////
window.addEventListener( "DOMContentLoaded", function () {
	// Якщо на сторінці є секція catalog_main — додаємо клас
	if (document.querySelector( '.catalog_main' )) {
		document.body.classList.add( 'white_header' );
	}

	const navLinks = document.querySelectorAll( ".header_nav .nav__list li > a" );
	const mob_navLinks = document.querySelectorAll( ".header_nav .mobile_nav_list > a" );
	const headerBottom = document.querySelector( ".header__bottom" );
	const headerLogo = document.querySelector( ".header_logo" );
	const header__top = document.querySelector( ".header__top" );
	const burger_logo = document.querySelectorAll( ".burger-menu .bar" );

	const applyScrolledClasses = () => {
		navLinks.forEach( el => el.classList.add( "scrolled" ) );
		mob_navLinks.forEach( el => el.classList.add( "scrolled" ) );
		burger_logo.forEach( el => el.classList.add( "scrolled" ) );
		headerLogo?.classList.add( "scrolled" );

		headerBottom?.classList.add( "scrolled" );
	};

	const removeScrolledClasses = () => {
		navLinks.forEach( el => el.classList.remove( "scrolled" ) );
		mob_navLinks.forEach( el => el.classList.remove( "scrolled" ) );
		burger_logo.forEach( el => el.classList.remove( "scrolled" ) );
		headerLogo?.classList.remove( "scrolled" );

		headerBottom?.classList.remove( "scrolled" );
	};

	if (document.body.classList.contains( "white_header" )) {
		// Каталог — одразу білий хедер
		headerBottom?.classList.add( "scrolled_top" );

		applyScrolledClasses();
	} else {
		// Головна — тільки при скролі
		window.addEventListener( "scroll", function () {
			const moveThreshold = 48;
			const styleThreshold = 450;

			if (window.scrollY > moveThreshold) {
				headerBottom?.classList.add( "scrolled_top" );
				header__top?.classList.add( "slide-up" );
			} else {
				headerBottom?.classList.remove( "scrolled_top" );
				header__top?.classList.remove( "slide-up" );
			}

			if (window.scrollY > styleThreshold) {
				applyScrolledClasses();
			} else {
				removeScrolledClasses();
			}
		} );
	}
} );


/////////////////////////badge_items_card/////////////////////////////////
document.querySelectorAll( '[data-badge="new"]' ).forEach( card => {
	const badge = document.createElement( 'span' );
	badge.className = 'product-badge';
	badge.textContent = 'New';
	card.querySelector( '.card_image' ).appendChild( badge );
} );

///////////////////////////////swiper///////////////////////////
let swiperInstance = null;

function initBlogSwiper() {
	const screenWidth = window.innerWidth;

	if (screenWidth < 1580 && !swiperInstance) {
		// Ініціалізація Swiper
		swiperInstance = new Swiper( '.blog__posts.swiper', {
			slidesPerView: 'auto',
			spaceBetween: 10,
			slidesOffsetBefore: 15,
			slidesOffsetAfter: 15
		} );
	} else if (screenWidth >= 1580 && swiperInstance) {
		// Видаляємо Swiper
		swiperInstance.destroy( true, true );
		swiperInstance = null;

		// ✅ Відновлюємо початкові стилі
		const wrapper = document.querySelector( '.blog__posts .swiper-wrapper' );
		const slides = document.querySelectorAll( '.blog__posts .swiper-slide' );

		if (wrapper) {
			wrapper.removeAttribute( 'style' );
			wrapper.classList.remove( 'swiper-wrapper' ); // не обов'язково, але можна
		}

		slides.forEach( slide => {
			slide.removeAttribute( 'style' );
			slide.classList.remove( 'swiper-slide' ); // не обов'язково, але можна
		} );
	}
}

window.addEventListener( 'load', initBlogSwiper );
window.addEventListener( 'resize', initBlogSwiper );


//////////////////////////header_menu//////////////////////////
const navItems = document.querySelectorAll( '.nav-item' );
const submenu = document.getElementById( 'submenu' );
const submenuContents = submenu.querySelectorAll( '.submenu-content' );
const headerBottom = document.querySelector( '.header__bottom' );
const logo = document.querySelector( '.header_logo' );
const navLinks = document.querySelectorAll( '.nav_link' );

// Наведення на головні пункти меню
navItems.forEach( item => {
	item.addEventListener( 'mouseenter', () => {
		const target = item.dataset.menu;

		submenu.classList.add( 'visible' );
		headerBottom.classList.add( 'scrolled' );
		logo.classList.add( 'scrolled' );
		document.body.style.overflow = 'hidden';

		navItems.forEach( nav => nav.classList.add( 'scrolled' ) );
		navLinks.forEach( link => link.classList.add( 'scrolled' ) ); // ✅ додаємо клас nav_link

		submenuContents.forEach( content => {
			if (content.dataset.content === target) {
				content.classList.add( 'active' );
			} else {
				content.classList.remove( 'active' );
			}
		} );
	} );
} );

// Наведення на праві елементи меню (Search, Account, Cart)
navLinks.forEach( link => {
	link.addEventListener( 'mouseenter', () => {
		// Активуємо відповідний контент
		submenuContents.forEach( content => {
			if (content.dataset.content === target) {
				content.classList.add( 'active' );
			} else {
				content.classList.remove( 'active' );
			}
		} );
	} );
} );

// При виході мишки з усього хедера — ховаємо меню і прибираємо класи
document.querySelector( '.header' ).addEventListener( 'mouseleave', () => {
	submenu.classList.remove( 'visible' );
	document.body.style.overflow = '';

	// Не знімати класи, якщо хедер повинен залишатися білим
	if (document.body.classList.contains( 'white_header' )) {
		return;
	}

	// Перевірка чи сторінка нижче styleThreshold
	const styleThreshold = 450;

	if (window.scrollY <= styleThreshold) {
		headerBottom.classList.remove( 'scrolled' );
		logo.classList.remove( 'scrolled' );
		navItems.forEach( nav => nav.classList.remove( 'scrolled' ) );
		navLinks.forEach( link => link.classList.remove( 'scrolled' ) );
	}
} );


///////підключення бібліотеки селект2////////////////
$( document ).ready( function () {
	$( '.js-select2' ).select2( {
		minimumResultsForSearch: -1,
		width: 'style' // дозволяє нам керувати шириною через JS
	} );

	const wrapper = document.querySelector( '.gift_items__select' );
	const button = wrapper ? wrapper.querySelector( '.shop-now' ) : null;

	if (wrapper && button) {
		const updateWidth = () => {
			const buttonWidth = button.offsetWidth;
			wrapper.style.width = `${buttonWidth}px`;

			const select2Container = wrapper.querySelector( '.select2-container' );
			if (select2Container) {
				select2Container.style.width = `${buttonWidth}px`;
			}
		};

		// Викликати один раз при завантаженні
		updateWidth();

		// Використовуємо ResizeObserver для автоматичного оновлення
		const observer = new ResizeObserver( updateWidth );
		observer.observe( button );
	}
} );

//////////////////////select2 block div width/////////////////
window.addEventListener('load', () => {
	const wrapper = document.querySelector('.gift_items__select');

	if (!wrapper) return;

	const button = wrapper.querySelector('.shop-now');

	if (button) {
		const buttonWidth = button.offsetWidth;
		wrapper.style.width = `${buttonWidth}px`;
	}
});



//////////////////////mobile_burger_menu///////////////////////////////////
const burger = document.getElementById( 'burger' );
const mobileMenu = document.getElementById( 'mobileMenu' );
const closeMenu = document.getElementById( 'closeMenu' );
const overlay = document.getElementById( 'overlay' );

function openMenu() {
	mobileMenu.classList.add( 'active' );
	overlay.classList.add( 'active' );
	burger.classList.add( 'open' );
	document.body.classList.add( 'scroll-lock' );
}

function closeMenuFunc() {
	mobileMenu.classList.remove( 'active' );
	overlay.classList.remove( 'active' );
	burger.classList.remove( 'open' );
	document.body.classList.remove( 'scroll-lock' );
}

burger.addEventListener( 'click', openMenu );
closeMenu.addEventListener( 'click', closeMenuFunc );
overlay.addEventListener( 'click', closeMenuFunc );


///////////////////////////елементи з десктопу бере///////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
	const headerLinks = document.querySelectorAll('.header_nav .nav-item');
	const mobileMenuList = document.getElementById('mobileMenuList');
	const submenu = document.getElementById('submenu');
	const submenuContents = submenu.querySelectorAll('.submenu-content');

	// Функція сховати всі підменю
	function hideAllSubmenus() {
		submenuContents.forEach(content => content.style.display = 'none');
		submenu.style.display = 'none';
	}

	headerLinks.forEach(link => {
		const li = document.createElement('li');
		li.classList.add('li_span');

		// Копіюємо <a>
		const a = link.cloneNode(true);
		li.appendChild(a);

		// Якщо є data-menu, додаємо стрілку і слухач кліку
		if (link.dataset.menu) {
			const arrow = document.createElement('span');
			arrow.innerHTML = `
        <a><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.09 1.15C0.03 1.10 0 1.02 0 0.94C0 0.86 0.03 0.78 0.09 0.73L0.75 0.09C0.80 0.03 0.88 0 0.96 0C1.05 0 1.12 0.03 1.18 0.09L6.86 5.60C6.95 5.69 7 5.80 7 5.92V6.08C7 6.20 6.95 6.31 6.86 6.40L1.18 11.91C1.12 11.97 1.05 12 0.96 12C0.88 12 0.80 11.97 0.75 11.91L0.09 11.27C0.03 11.22 0 11.14 0 11.06C0 10.98 0.03 10.90 0.09 10.85L5.09 6L0.09 1.15Z" fill="black"/>
        </svg></a>
      `;
			li.appendChild(arrow);

			arrow.style.cursor = 'pointer';

			arrow.addEventListener('click', (e) => {
				e.stopPropagation(); // Щоб клік не спрацьовував на інших елементах

				const menuName = link.dataset.menu;

				// Якщо зараз відкрите це підменю — сховати
				if (submenu.style.display === 'block' &&
					[...submenuContents].some(content => content.style.display === 'block' && content.dataset.content === menuName)) {
					hideAllSubmenus();
					return;
				}

				// Показати відповідне підменю
				hideAllSubmenus();
				submenu.style.display = 'block';
				submenuContents.forEach(content => {
					if(content.dataset.content === menuName) {
						content.style.display = 'block';
					}
				});
			});
		}

		mobileMenuList.appendChild(li);
	});

	// Натискаючи поза підменю сховати його (наприклад клік по overlay)
	const overlay = document.getElementById('overlay');
	overlay.addEventListener('click', () => {
		hideAllSubmenus();
	});
});




/////////////////////////catalog_main//////////////
document.querySelectorAll( '.filter__material' ).forEach( material => {
	const title = material.querySelector( '.material_title' );
	const menu = material.querySelector( '.material_menu' );
	const arrow = material.querySelector( '.material_arrow' );
	const h2 = title.querySelector( 'h2' );

	const toggleMenu = () => {
		menu.classList.toggle( 'active' );
		arrow.classList.toggle( 'active' );
	};

	// Вішаємо події тільки на h2 і стрілку
	h2.addEventListener( 'click', toggleMenu );
	arrow.addEventListener( 'click', toggleMenu );
} );


///////////////////////////////////slider//////////////////////
const priceSlider = document.getElementById( 'price-slider' );

if (priceSlider && typeof noUiSlider !== 'undefined') {
	noUiSlider.create( priceSlider, {
		start: [40, 180],
		connect: true,
		range: {
			'min': 0,
			'max': 200
		},
		step: 1
	} );

	const lower = document.getElementById( 'price-lower' );
	const upper = document.getElementById( 'price-upper' );

	priceSlider.noUiSlider.on( 'update', ( values, handle ) => {
		const value = Math.round( values[handle] );
		if (handle === 0) {
			lower.textContent = value;
		} else {
			upper.textContent = value;
		}
	} );
}


/////////////////catalog_pageitemslimit3x////////////////////////////////////
document.addEventListener( 'DOMContentLoaded', () => {
	const isCatalogPage = document.querySelector( 'main.catalog_main' );
	if (!isCatalogPage) return; // Вийти, якщо не на catalog_page

	const cardSections = document.querySelectorAll( '.items_card' );

	cardSections.forEach( section => {
		const cards = section.querySelectorAll( '.card' );

		cards.forEach( ( card, index ) => {
			if (index > 2) {
				card.style.display = 'none';
			}
		} );
	} );
} );


////////////////////////////пагінація///////////////////////////////////////////
	document.addEventListener("DOMContentLoaded", function () {
	const paginations = document.querySelectorAll(".items_block_pagination");
	const buttons = document.querySelectorAll(".page-btn");

	// Сховати всі блоки окрім першого
	function showPage(pageIndex) {
	paginations.forEach((block, index) => {
	block.style.display = (index === pageIndex) ? "grid" : "none";
});
	buttons.forEach((btn, i) => {
	btn.classList.toggle("active", i === pageIndex);
});
}

	// Початково показуємо першу сторінку
	showPage(0);

	buttons.forEach((btn, index) => {
	btn.addEventListener("click", () => {
	showPage(index);
});
});
});



////////////////фільтри анімація//////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
	const filters = document.querySelector('.filters_items');
	const itemsBlock = document.querySelector('.items_block');
	const wrapper = document.querySelector('.filters_wrapper');

	if (!filters || !itemsBlock || !wrapper) return;

	const stickyOffset = 180;
	const stopOffset = 190; // відступ знизу
	const hysteresis = 10; // буферна зона, щоб уникнути дьоргання

	let isStuck = false;
	let isAtBottom = false;

	let lastScrollY = window.scrollY;

	window.addEventListener('scroll', () => {
		const currentScrollY = window.scrollY;
		const deltaY = Math.abs(currentScrollY - lastScrollY);

		// Ігноруємо дрібні прокручування менше hysteresis
		if (deltaY < hysteresis) return;

		lastScrollY = currentScrollY;

		const containerTop = wrapper.getBoundingClientRect().top;
		const itemsBottom = itemsBlock.getBoundingClientRect().bottom;
		const filtersHeight = filters.offsetHeight;

		// Зупинка знизу
		if (!isAtBottom && itemsBottom <= filtersHeight + stopOffset) {
			isAtBottom = true;
			isStuck = false;
			filters.style.position = 'absolute';
			filters.style.top = 'auto';
			filters.style.bottom = '0';
			filters.classList.remove('filters-sticky');
			filters.classList.add('filters-bottom');
		}

		// Фіксація вгорі
		else if (!isStuck && containerTop <= stickyOffset && itemsBottom > filtersHeight + stopOffset + hysteresis) {
			isStuck = true;
			isAtBottom = false;
			filters.style.position = 'fixed';
			filters.style.top = `${stickyOffset}px`;
			filters.style.bottom = 'auto';
			filters.classList.add('filters-sticky');
			filters.classList.remove('filters-bottom');
		}

		// Повернення в звичайний стан
		else if (containerTop > stickyOffset + hysteresis) {
			isStuck = false;
			isAtBottom = false;
			filters.style.position = 'static';
			filters.style.top = '';
			filters.style.bottom = '';
			filters.classList.remove('filters-sticky', 'filters-bottom');
		}
	});
});






