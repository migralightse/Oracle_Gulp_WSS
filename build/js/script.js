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
  const burger_logo = document.querySelectorAll(".burger-menu .bar");
  const applyScrolledClasses = () => {
    navLinks.forEach(el => el.classList.add("scrolled"));
    mob_navLinks.forEach(el => el.classList.add("scrolled"));
    burger_logo.forEach(el => el.classList.add("scrolled"));
    headerLogo?.classList.add("scrolled");
    headerBottom?.classList.add("scrolled");
  };
  const removeScrolledClasses = () => {
    navLinks.forEach(el => el.classList.remove("scrolled"));
    mob_navLinks.forEach(el => el.classList.remove("scrolled"));
    burger_logo.forEach(el => el.classList.remove("scrolled"));
    headerLogo?.classList.remove("scrolled");
    headerBottom?.classList.remove("scrolled");
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
      } else {
        headerBottom?.classList.remove("scrolled_top");
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

// Наведення на головні пункти меню
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const target = item.dataset.menu;
    submenu.classList.add('visible');
    headerBottom.classList.add('scrolled');
    logo.classList.add('scrolled');
    document.body.style.overflow = 'hidden';
    navItems.forEach(nav => nav.classList.add('scrolled'));
    navLinks.forEach(link => link.classList.add('scrolled')); // ✅ додаємо клас nav_link

    submenuContents.forEach(content => {
      if (content.dataset.content === target) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});

// Наведення на праві елементи меню (Search, Account, Cart)
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    const target = link.dataset.menu; // Витягуємо data-menu значення

    submenu.classList.add('visible');
    headerBottom.classList.add('scrolled');
    logo.classList.add('scrolled');
    document.body.style.overflow = 'hidden';
    navItems.forEach(nav => nav.classList.add('scrolled'));
    navLinks.forEach(link => link.classList.add('scrolled'));

    // Активуємо відповідний контент
    submenuContents.forEach(content => {
      if (content.dataset.content === target) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});

// При виході мишки з усього хедера — ховаємо меню і прибираємо класи
document.querySelector('.header').addEventListener('mouseleave', () => {
  submenu.classList.remove('visible');
  document.body.style.overflow = '';

  // Не знімати класи, якщо хедер повинен залишатися білим
  if (document.body.classList.contains('white_header')) {
    return;
  }

  // Перевірка чи сторінка нижче styleThreshold
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
  const button = wrapper.querySelector('.shop-now');
  if (wrapper && button) {
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
//# sourceMappingURL=script.js.map
