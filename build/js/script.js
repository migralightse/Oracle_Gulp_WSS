////////////////////////////scroll////////////////////
window.addEventListener("DOMContentLoaded", function () {
  // Якщо на сторінці є секція catalog_main — додаємо клас
  if (document.querySelector('.catalog_main')) {
    document.body.classList.add('white_header');
  }
  const navLinks = document.querySelectorAll(".header_nav .nav__list li > a");
  const mob_navLinks = document.querySelectorAll(".header_nav .mobile_nav_list > a");
  const headerBottom = document.querySelector(".header__bottom");
  const headerLogo = document.querySelector(".header_logo");
  const header__top = document.querySelector(".header__top");
  const burger_logo = document.querySelectorAll(".burger-menu .bar");
  const applyScrolledClasses = () => {
    navLinks.forEach(el => el.classList.add("scrolled"));
    mob_navLinks.forEach(el => el.classList.add("scrolled"));
    burger_logo.forEach(el => el.classList.add("scrolled"));
    headerLogo?.classList.add("scrolled");
    headerBottom?.classList.add("scrolled");

    // Додаємо клас для svg path в активних submenu-toggle
    document.querySelectorAll('.header .header_left .header_nav .nav__list .submenu-toggle svg path').forEach(path => {
      path.classList.add('active');
    });
  };
  const removeScrolledClasses = () => {
    navLinks.forEach(el => el.classList.remove("scrolled"));
    mob_navLinks.forEach(el => el.classList.remove("scrolled"));
    burger_logo.forEach(el => el.classList.remove("scrolled"));
    headerLogo?.classList.remove("scrolled");
    headerBottom?.classList.remove("scrolled");

    // Знімаємо клас для svg path в активних submenu-toggle
    document.querySelectorAll('.header .header_left .header_nav .nav__list .submenu-toggle svg path').forEach(path => {
      path.classList.remove('active');
    });
  };
  if (document.body.classList.contains("white_header")) {
    // Каталог — одразу білий хедер
    headerBottom?.classList.add("scrolled_top");
    applyScrolledClasses();
  } else {
    // Головна — тільки при скролі
    window.addEventListener("scroll", function () {
      const moveThreshold = 48;
      const styleThreshold = 450;
      if (window.scrollY > moveThreshold) {
        headerBottom?.classList.add("scrolled_top");
        header__top?.classList.add("slide-up");
      } else {
        headerBottom?.classList.remove("scrolled_top");
        header__top?.classList.remove("slide-up");
      }
      if (window.scrollY > styleThreshold) {
        applyScrolledClasses();
      } else {
        removeScrolledClasses();
      }
    });
  }
});

/////////////////////////badge_items_card/////////////////////////////////
document.querySelectorAll('[data-badge="new"]').forEach(card => {
  const badge = document.createElement('span');
  badge.className = 'product-badge';
  badge.textContent = 'New';
  card.querySelector('.card_image').appendChild(badge);
});

///////////////////////////////swiper///////////////////////////
let swiperInstance = null;
function initBlogSwiper() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 1580 && !swiperInstance) {
    // Ініціалізація Swiper
    swiperInstance = new Swiper('.blog__posts.swiper', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      slidesOffsetBefore: 15,
      slidesOffsetAfter: 15
    });
  } else if (screenWidth >= 1580 && swiperInstance) {
    // Видаляємо Swiper
    swiperInstance.destroy(true, true);
    swiperInstance = null;

    // ✅ Відновлюємо початкові стилі
    const wrapper = document.querySelector('.blog__posts .swiper-wrapper');
    const slides = document.querySelectorAll('.blog__posts .swiper-slide');
    if (wrapper) {
      wrapper.removeAttribute('style');
      wrapper.classList.remove('swiper-wrapper'); // не обов'язково, але можна
    }
    slides.forEach(slide => {
      slide.removeAttribute('style');
      slide.classList.remove('swiper-slide'); // не обов'язково, але можна
    });
  }
}
window.addEventListener('load', initBlogSwiper);
window.addEventListener('resize', initBlogSwiper);

//////////////////////////header_menu//////////////////////////
const navItems = document.querySelectorAll('.nav-item');
const submenu = document.getElementById('submenu');
const submenuContents = submenu.querySelectorAll('.submenu-content');
const headerBottom = document.querySelector('.header__bottom');
const logo = document.querySelector('.header_logo');
const navLinks = document.querySelectorAll('.nav_link');
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const target = item.dataset.menu;
    submenu.classList.add('visible');
    headerBottom.classList.add('scrolled');
    logo.classList.add('scrolled');
    document.body.style.overflow = 'hidden';
    navItems.forEach(nav => nav.classList.add('scrolled'));
    navLinks.forEach(link => link.classList.add('scrolled'));
    submenuContents.forEach(content => {
      if (content.dataset.content === target) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    // Знімаємо active з усіх .submenu-toggle і path
    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
      toggle.classList.remove('active');
      const pathEl = toggle.querySelector('svg path');
      if (pathEl) pathEl.classList.remove('active');
    });

    // Додаємо active до .submenu-toggle і path у поточному item
    const toggle = item.parentElement.querySelector('.submenu-toggle');
    if (toggle) {
      toggle.classList.add('active');
      const pathEl = toggle.querySelector('svg path');
      if (pathEl) pathEl.classList.add('active');
    }
  });
});
document.querySelector('.header').addEventListener('mouseleave', () => {
  submenu.classList.remove('visible');
  document.body.style.overflow = '';

  // Знімаємо active з усіх .submenu-toggle і path
  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.classList.remove('active');
    const pathEl = toggle.querySelector('svg path');
    if (pathEl) pathEl.classList.remove('active');
  });
  if (document.body.classList.contains('white_header')) {
    return;
  }
  const styleThreshold = 450;
  if (window.scrollY <= styleThreshold) {
    headerBottom.classList.remove('scrolled');
    logo.classList.remove('scrolled');
    navItems.forEach(nav => nav.classList.remove('scrolled'));
    navLinks.forEach(link => link.classList.remove('scrolled'));
  }
});

///////підключення бібліотеки селект2////////////////
$(document).ready(function () {
  $('.js-select2').select2({
    minimumResultsForSearch: -1,
    width: 'style' // дозволяє нам керувати шириною через JS
  });
  const wrapper = document.querySelector('.gift_items__select');
  const button = wrapper ? wrapper.querySelector('.shop-now') : null;
  if (wrapper && button) {
    const updateWidth = () => {
      const buttonWidth = button.offsetWidth;
      wrapper.style.width = `${buttonWidth}px`;
      const select2Container = wrapper.querySelector('.select2-container');
      if (select2Container) {
        select2Container.style.width = `${buttonWidth}px`;
      }
    };

    // Викликати один раз при завантаженні
    updateWidth();

    // Використовуємо ResizeObserver для автоматичного оновлення
    const observer = new ResizeObserver(updateWidth);
    observer.observe(button);
  }
});

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
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');
function openMenu() {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  burger.classList.add('open');
  document.body.classList.add('scroll-lock');
}
function closeMenuFunc() {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  burger.classList.remove('open');
  document.body.classList.remove('scroll-lock');
}
burger.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFunc);
overlay.addEventListener('click', closeMenuFunc);

///////////////////////////сабменю для мобільної версіїї///////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentLi = toggle.closest('li');
      const submenu = currentLi.querySelector('.mobile-submenu__list');

      // Закриваємо інші меню
      document.querySelectorAll('.mobile-submenu__list.active').forEach(activeMenu => {
        if (activeMenu !== submenu) {
          activeMenu.style.maxHeight = '0';
          activeMenu.classList.remove('active');
        }
      });
      document.querySelectorAll('.submenu-toggle.active').forEach(activeToggle => {
        if (activeToggle !== toggle) {
          activeToggle.classList.remove('active');
        }
      });

      // Перемикаємо активність
      if (submenu) {
        if (submenu.classList.contains('active')) {
          // Закриваємо
          submenu.style.maxHeight = submenu.scrollHeight + 'px'; // фіксуємо поточну
          setTimeout(() => submenu.style.maxHeight = '0', 10); // потім плавно закриваємо
          submenu.classList.remove('active');
          toggle.classList.remove('active');
        } else {
          // Відкриваємо
          submenu.classList.add('active');
          toggle.classList.add('active');
          submenu.style.maxHeight = submenu.scrollHeight + 'px';
        }
      }
    });
  });
});

/////////////////////////catalog_main//////////////
document.querySelectorAll('.filter__material').forEach(material => {
  const title = material.querySelector('.material_title');
  const menu = material.querySelector('.material_menu');
  const arrow = material.querySelector('.material_arrow');
  const h2 = title.querySelector('h2');
  const toggleMenu = () => {
    menu.classList.toggle('active');
    arrow.classList.toggle('active');
  };

  // Вішаємо події тільки на h2 і стрілку
  h2.addEventListener('click', toggleMenu);
  arrow.addEventListener('click', toggleMenu);
});

///////////////////////////////////slider//////////////////////
document.addEventListener('DOMContentLoaded', function () {
  var priceBlocks = document.querySelectorAll('.price-filter');
  priceBlocks.forEach(function (block) {
    var sliderEl = block.querySelector('.js-price-slider');
    if (!sliderEl || typeof noUiSlider === 'undefined') return;
    var startMin = parseInt(block.dataset.startMin, 10) || 20; // мінімум слайдера
    var startMax = parseInt(block.dataset.startMax, 10) || 1000; // максимальна початкова позиція
    var rangeMin = parseInt(block.dataset.rangeMin, 10) || 20; // мінімальна ціна
    var rangeMax = parseInt(block.dataset.rangeMax, 10) || 1500; // максимальна ціна

    // Значення для відображення та URL (у доларах)
    var displayMin = startMin;
    var displayMax = startMax;
    var displayRangeMin = rangeMin;
    var displayRangeMax = rangeMax;
    var lowerEl = block.querySelector('.js-price-lower');
    var upperEl = block.querySelector('.js-price-upper');
    noUiSlider.create(sliderEl, {
      start: [displayMin, displayMax],
      connect: true,
      range: {
        min: displayRangeMin,
        max: displayRangeMax
      },
      step: 1
    });
    if (lowerEl) lowerEl.textContent = displayMin;
    if (upperEl) upperEl.textContent = displayMax;

    // Авто-оновлення URL при відпусканні ручки
    sliderEl.noUiSlider.on('change', function (values) {
      var minVal = Math.round(values[0]); // просто долари
      var maxVal = Math.round(values[1]);
      var minParam = block.dataset.minParam;
      var maxParam = block.dataset.maxParam;
      var url = new URL(window.location.href);
      if (minParam) url.searchParams.set(minParam, minVal);
      if (maxParam) url.searchParams.set(maxParam, maxVal);

      // Перезавантаження сторінки з новим URL
      window.location.href = url.toString();
    });

    // Оновлення значень під слайдером під час руху
    sliderEl.noUiSlider.on('update', function (values) {
      if (lowerEl) lowerEl.textContent = Math.round(values[0]);
      if (upperEl) upperEl.textContent = Math.round(values[1]);
    });
  });
});

/////////////////catalog_pageitemslimit3x////////////////////////////////////

////////////////////////////пагінація///////////////////////////////////////////
// 	document.addEventListener("DOMContentLoaded", function () {
// 	const paginations = document.querySelectorAll(".items_block_pagination");
// 	const buttons = document.querySelectorAll(".page-btn");
//
// 	// Сховати всі блоки окрім першого
// 	function showPage(pageIndex) {
// 	paginations.forEach((block, index) => {
// 	block.style.display = (index === pageIndex) ? "grid" : "none";
// });
// 	buttons.forEach((btn, i) => {
// 	btn.classList.toggle("active", i === pageIndex);
// });
// }
//
// 	// Початково показуємо першу сторінку
// 	showPage(0);
//
// 	buttons.forEach((btn, index) => {
// 	btn.addEventListener("click", () => {
// 	showPage(index);
// });
// });
// });

////////////////фільтри анімація//////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelector('.filters_items');
  const itemsBlock = document.querySelector('.items_block');
  const wrapper = document.querySelector('.filters_wrapper');
  if (!filters || !itemsBlock || !wrapper) return;
  const stickyOffset = 140;
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
      filters.style.bottom = '60px';
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
//# sourceMappingURL=script.js.map
