////////////////////////////scroll////////////////////
window.addEventListener('DOMContentLoaded', function () {
  // Якщо на сторінці є секція catalog_main — додаємо клас
  if (document.querySelector('.catalog_main, .product_page, .cart_main')) {
    document.body.classList.add('white_header');
  }
  const navLinks = document.querySelectorAll('.header_nav .nav__list li > a');
  const mob_navLinks = document.querySelectorAll('.header_nav .mobile_nav_list > a');
  const headerBottom = document.querySelector('.header__bottom');
  const headerLogo = document.querySelector('.header_logo');
  const header__top = document.querySelector('.header__top');
  const burger_logo = document.querySelectorAll('.burger-menu .bar');
  const applyScrolledClasses = () => {
    navLinks.forEach(el => el.classList.add('scrolled'));
    mob_navLinks.forEach(el => el.classList.add('scrolled'));
    burger_logo.forEach(el => el.classList.add('scrolled'));
    headerLogo?.classList.add('scrolled');
    headerBottom?.classList.add('scrolled');

    // Додаємо клас для svg path в активних submenu-toggle
    document.querySelectorAll('.header .header_left .header_nav .nav__list .submenu-toggle svg path').forEach(path => path.classList.add('active'));
  };
  const removeScrolledClasses = () => {
    navLinks.forEach(el => el.classList.remove('scrolled'));
    mob_navLinks.forEach(el => el.classList.remove('scrolled'));
    burger_logo.forEach(el => el.classList.remove('scrolled'));
    headerLogo?.classList.remove('scrolled');
    headerBottom?.classList.remove('scrolled');

    // Знімаємо клас для svg path в активних submenu-toggle
    document.querySelectorAll('.header .header_left .header_nav .nav__list .submenu-toggle svg path').forEach(path => path.classList.remove('active'));
  };
  if (document.body.classList.contains('white_header')) {
    // Каталог — одразу білий хедер
    headerBottom?.classList.add('scrolled_top');
    document.body.classList.add('scrolled');
    applyScrolledClasses();
  } else {
    // Головна — тільки при скролі
    window.addEventListener('scroll', function () {
      const moveThreshold = 48;
      const styleThreshold = 450;
      if (window.scrollY > moveThreshold) {
        headerBottom?.classList.add('scrolled_top');
        document.body.classList.add('scrolled');
        header__top?.classList.add('slide-up');
      } else {
        headerBottom?.classList.remove('scrolled_top');
        document.body.classList.remove('scrolled');
        header__top?.classList.remove('slide-up');
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
  const button = wrapper ? wrapper.querySelector('.shop-gift') : null;
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
  function toggleMenu(e) {
    e.preventDefault();
    menu.classList.toggle('active');
    arrow.classList.toggle('active');
  }

  // Вішаємо події тільки на h2 і стрілку
  h2.addEventListener('click', toggleMenu);
  arrow.addEventListener('click', toggleMenu);
});

///////////////////////////////////NOuislider//////////////////////
document.addEventListener('DOMContentLoaded', function () {
  var priceBlocks = document.querySelectorAll('.price-filter');
  priceBlocks.forEach(function (block) {
    var sliderEl = block.querySelector('.js-price-slider');
    if (!sliderEl || typeof noUiSlider === 'undefined') return;
    var rangeMin = parseInt(block.dataset.rangeMin, 10) || 20;
    var rangeMax = parseInt(block.dataset.rangeMax, 10) || 1500;
    var urlParams = new URLSearchParams(window.location.search);
    var minParam = block.dataset.minParam;
    var maxParam = block.dataset.maxParam;
    var startMin = parseInt(urlParams.get(minParam), 10) || parseInt(block.dataset.startMin, 10) || 20;
    var startMax = parseInt(urlParams.get(maxParam), 10) || parseInt(block.dataset.startMax, 10) || 1500;
    var lowerEl = block.querySelector('.js-price-lower');
    var upperEl = block.querySelector('.js-price-upper');
    noUiSlider.create(sliderEl, {
      start: [startMin, startMax],
      connect: true,
      range: {
        min: rangeMin,
        max: rangeMax
      },
      step: 1
    });
    if (lowerEl) lowerEl.textContent = startMin;
    if (upperEl) upperEl.textContent = startMax;

    // Оновлюємо data-* на контейнері (щоб кнопка могла зчитати)
    block.dataset.currentMin = String(startMin);
    block.dataset.currentMax = String(startMax);
    sliderEl.noUiSlider.on('update', function (values) {
      var minVal = Math.round(values[0]);
      var maxVal = Math.round(values[1]);
      if (lowerEl) lowerEl.textContent = minVal;
      if (upperEl) upperEl.textContent = maxVal;
      block.dataset.currentMin = String(minVal);
      block.dataset.currentMax = String(maxVal);
    });
  });
});

////////////////фільтри анімація//////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  let scrollHandler;
  function initFiltersSticky() {
    const filters = document.querySelector('.filters_items');
    const itemsBlock = document.querySelector('.items_block');
    const wrapper = document.querySelector('.filters_wrapper');

    // Прибираємо старий хендлер якщо є
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
      scrollHandler = null;
    }

    // Працюємо тільки на екранах >1199px
    if (window.innerWidth <= 1199 || !filters || !itemsBlock || !wrapper) {
      // Скидаємо стилі якщо були
      filters?.removeAttribute('style');
      filters?.classList.remove('filters-sticky', 'filters-bottom');
      return;
    }
    const stickyOffset = window.innerWidth < 768 ? 40 : 141;
    const stopOffset = window.innerWidth < 768 ? 40 : 190;
    const hysteresis = 10;
    let isStuck = false;
    let isAtBottom = false;
    let lastScrollY = window.scrollY;
    scrollHandler = () => {
      const currentScrollY = window.scrollY;
      const deltaY = Math.abs(currentScrollY - lastScrollY);
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
    };
    window.addEventListener('scroll', scrollHandler);
  }

  // Запускаємо один раз
  initFiltersSticky();

  // Запускаємо ще раз при зміні розміру
  window.addEventListener('resize', initFiltersSticky);
});

//////////фільтри моб анімація виїзду ////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const filterWrapper = document.querySelector('.filters_wrapper');
  const openBtn = document.getElementById('open-filters'); // кнопка відкриття
  const closeBtn = document.querySelector('.filter-close'); // кнопка закриття
  const overlay = document.getElementById('overlay'); // overlay

  if (openBtn && filterWrapper && closeBtn && overlay) {
    openBtn.addEventListener('click', e => {
      if (window.innerWidth < 1199) {
        // тільки для моб/планшетів
        e.preventDefault();
        filterWrapper.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
    const closeFilters = () => {
      filterWrapper.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };
    closeBtn.addEventListener('click', closeFilters);
    overlay.addEventListener('click', closeFilters);
  }
});

////////////////////////////ajax/////////////////////////////////////////////////

function updateProducts(url) {
  const currentGrid = document.querySelector('#product-grid');
  if (!currentGrid) return;

  // Додаємо клас fade-out до всіх існуючих товарів
  const cards = currentGrid.querySelectorAll('.card');
  cards.forEach(card => card.classList.add('fade-out'));

  // Трохи чекаємо на завершення анімації
  setTimeout(() => {
    fetch(url).then(res => res.text()).then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Беремо новий grid
      const newGrid = doc.querySelector('#product-grid');
      if (newGrid) {
        currentGrid.innerHTML = newGrid.innerHTML;

        // Додаємо клас плавної появи
        const newCards = currentGrid.querySelectorAll('.card');
        newCards.forEach(card => {
          card.style.opacity = 0;
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
          }, 50);
        });

        // Оновлюємо URL та пагінацію
        window.history.pushState({}, '', url);
        attachPaginationListeners();
      }
    });
  }, 200); // час fade-out
}
function attachPaginationListeners() {
  document.querySelectorAll('.pagination a.page-btn').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      updateProducts(this.href);
    });
  });
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  attachPaginationListeners();
});

//////////////////////////дескріпшин продукту////////////////////////
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(c => c.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

/////////////////////////обираємо потрібнний варіант товару в продукті/////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  // Всі форми продуктів на сторінці
  const cartForms = document.querySelectorAll('form[id^="product-form-"]');
  cartForms.forEach(form => {
    // шукаємо правильний select всередині форми
    const variantSelect = form.querySelector('select[id^="variant-select"]');
    const priceEl = form.closest('.product_details').querySelector('.product_details__price');
    const optionWrappers = form.closest('.product_details').querySelectorAll('.product_details__filters');

    // додаємо слухачі на кнопки та select
    optionWrappers.forEach(wrapper => {
      const buttons = wrapper.querySelectorAll('.button_standart.ft');
      const selectEl = wrapper.querySelector('select.gift-select');

      // Кнопки
      if (buttons.length) {
        buttons.forEach(button => {
          button.addEventListener('click', function (e) {
            e.preventDefault();
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            if (selectEl) {
              selectEl.value = this.dataset.value;
              selectEl.dispatchEvent(new Event('change'));
            }
            updateVariant();
          });
        });
      }

      // Select
      if (selectEl) {
        selectEl.addEventListener('change', function () {
          if (buttons.length) {
            buttons.forEach(btn => {
              btn.classList.toggle('active', btn.dataset.value === this.value);
            });
          }
          updateVariant();
        });
      }
    });
    function updateVariant() {
      let selectedOptions = [];

      // Формуємо масив вибраних опцій
      optionWrappers.forEach(wrapper => {
        const index = wrapper.dataset.optionIndex;
        const activeBtn = wrapper.querySelector('.button_standart.ft.active');
        const selectEl = wrapper.querySelector('select.gift-select');
        if (activeBtn) {
          selectedOptions[index] = activeBtn.dataset.value;
        } else if (selectEl) {
          selectedOptions[index] = selectEl.value;
        } else {
          // якщо нічого не вибрано, беремо перший варіант
          const firstOption = wrapper.querySelector('.button_standart.ft, select.gift-select option');
          selectedOptions[index] = firstOption ? firstOption.dataset.value || firstOption.value : '';
        }
      });

      // шукаємо варіант по JSON
      let matchedVariant = Array.from(variantSelect.options).find(option => {
        const variantOptions = JSON.parse(option.dataset.options);
        return variantOptions.every((opt, i) => opt === selectedOptions[i]);
      });
      if (matchedVariant) {
        // Оновлюємо select
        variantSelect.value = matchedVariant.value;
        variantSelect.dispatchEvent(new Event('change'));

        // Оновлюємо ціну
        if (priceEl) {
          priceEl.textContent = matchedVariant.dataset.price;
        }

        // Оновлюємо картинку
        const productContainer = form.closest('.product_details').parentElement;
        const mainImage = productContainer.querySelector('#mainImage');
        const mainLink = productContainer.querySelector('a[data-fancybox="gallery"]');
        if (mainImage && matchedVariant.dataset.image) {
          mainImage.src = matchedVariant.dataset.image;
          if (mainLink) {
            mainLink.href = matchedVariant.dataset.image;
          }
        }

        // Змінюємо URL
        const newUrl = `${window.location.pathname}?variant=${matchedVariant.value}`;
        window.history.replaceState(null, '', newUrl);
      }
    }

    // Викликаємо при завантаженні
    updateVariant();
  });
});

/////////////////////////////відкриття попап cart///////////////////////////////
const cartBtn = document.getElementById('cartBtn');
const cartImg = document.getElementById('cartImg');
const cartImgMob = document.getElementById('cartImgMob');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
function openCart() {
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.classList.add('scroll-lock');
}
function closeCartFunc() {
  cartSidebar.classList.remove('active');
  cartOverlay.classList.remove('active');
  document.body.classList.remove('scroll-lock');
}
cartBtn.addEventListener('click', openCart);
cartImg.addEventListener('click', openCart);
cartImgMob.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCartFunc);
cartOverlay.addEventListener('click', closeCartFunc);

//////////cart_pop quantity///////
document.addEventListener("DOMContentLoaded", () => {
  const quantityControls = document.querySelectorAll(".quantity-control");
  quantityControls.forEach(control => {
    const buttons = control.querySelectorAll(".qty-btn");
    const minusBtn = buttons[0]; // перша кнопка
    const plusBtn = buttons[1]; // друга кнопка
    const valueEl = control.querySelector(".qty-value");
    minusBtn.addEventListener("click", () => {
      let current = parseInt(valueEl.textContent, 10);
      if (current > 1) {
        valueEl.textContent = current - 1;
      }
    });
    plusBtn.addEventListener("click", () => {
      let current = parseInt(valueEl.textContent, 10);
      valueEl.textContent = current + 1;
    });
  });
});
//# sourceMappingURL=script.js.map
