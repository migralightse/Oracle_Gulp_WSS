////////////////////////////scroll////////////////////
window.addEventListener('DOMContentLoaded', function () {
  // Якщо на сторінці є секція catalog_main — додаємо клас
  if (document.querySelector('.catalog_main, .product_page, .cart_main ')) {
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
    document.querySelectorAll('.header .header_left .header_nav .nav__list .submenu-toggle svg path').forEach(path => {
      path.classList.add('active');
    });
  };
  const removeScrolledClasses = () => {
    navLinks.forEach(el => el.classList.remove('scrolled'));
    mob_navLinks.forEach(el => el.classList.remove('scrolled'));
    burger_logo.forEach(el => el.classList.remove('scrolled'));
    headerLogo?.classList.remove('scrolled');
    headerBottom?.classList.remove('scrolled');

    // Знімаємо клас для svg path в активних submenu-toggle
    document.querySelectorAll('.header .header_left .header_nav .nav__list .submenu-toggle svg path').forEach(path => {
      path.classList.remove('active');
    });
  };
  if (document.body.classList.contains('white_header')) {
    // Каталог — одразу білий хедер
    headerBottom?.classList.add('scrolled_top');
    applyScrolledClasses();
  } else {
    // Головна — тільки при скролі
    window.addEventListener('scroll', function () {
      const moveThreshold = 48;
      const styleThreshold = 450;
      if (window.scrollY > moveThreshold) {
        headerBottom?.classList.add('scrolled_top');
        header__top?.classList.add('slide-up');
      } else {
        headerBottom?.classList.remove('scrolled_top');
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
  const filters = document.querySelector('.filters_items');
  const itemsBlock = document.querySelector('.items_block');
  const wrapper = document.querySelector('.filters_wrapper');
  if (!filters || !itemsBlock || !wrapper) return;
  const stickyOffset = window.innerWidth < 768 ? 40 : 141;
  const stopOffset = window.innerWidth < 768 ? 40 : 190;
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

//////////фільтри моб анімація виїзду ////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const filterWrapper = document.querySelector('.filters_wrapper');
  const openBtn = document.getElementById('open-filters'); // кнопка відкриття
  const closeBtn = document.querySelector('.filter-close'); // твоя кнопка закриття

  if (openBtn && filterWrapper && closeBtn) {
    openBtn.addEventListener('click', e => {
      e.preventDefault();
      filterWrapper.classList.add('active');
      document.body.style.overflow = 'hidden'; // блокуєм скрол
    });
    closeBtn.addEventListener('click', () => {
      filterWrapper.classList.remove('active');
      document.body.style.overflow = ''; // повертаєм скрол
    });
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

////////////////////////лічильник продуктів////////////////////////////////////////
document.querySelectorAll('.product_details').forEach(product => {
  const qtyControl = product.querySelector('.quantity-control');
  const qtyValue = qtyControl.querySelector('.qty-value');
  const form = product.querySelector('form[id^="product-form-"]'); // форма цього продукту
  const qtyInput = form.querySelector('input[name="quantity"]'); // hidden всередині форми
  const [minusBtn, plusBtn] = qtyControl.querySelectorAll('.qty-btn');
  minusBtn.addEventListener('click', () => {
    let current = parseInt(qtyValue.textContent, 10);
    if (current > 1) current--;
    qtyValue.textContent = current;
    qtyInput.value = current;
  });
  plusBtn.addEventListener('click', () => {
    let current = parseInt(qtyValue.textContent, 10);
    current++;
    qtyValue.textContent = current;
    qtyInput.value = current;
  });
});

//////////////////////////////лічильник в кошику///////////////////////
function setupCartQtyButtons() {
  const qtyButtons = document.querySelectorAll('.quantity-control.cart .qty-btn');
  qtyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const key = btn.dataset.key;
      const action = btn.dataset.action;
      const qtyEl = btn.parentElement.querySelector('.qty-value');
      let currentQty = parseInt(qtyEl.textContent, 10);
      let newQty = action === 'plus' ? currentQty + 1 : currentQty - 1;
      if (newQty < 1) newQty = 1;
      const formData = new FormData();
      formData.append('quantity', newQty);
      formData.append('id', key);
      await fetch('/cart/change.js', {
        method: 'POST',
        body: formData
      });

      // Оновлюємо корзину
      const cart = await fetch('/cart.js').then(res => res.json());
      renderCart(cart);
    });
  });
}

/////////////////button add to cart//////////////////
document.addEventListener('DOMContentLoaded', () => {
  const cartForms = document.querySelectorAll('form[id^="product-form-"]');
  cartForms.forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const variantSelect = form.querySelector('select[name="id"]'); // name="id" завжди правильний
      const qtyInput = form.querySelector('input.qty-input'); // інпут саме всередині цієї форми

      const formData = new FormData();
      formData.append('id', variantSelect.value);
      formData.append('quantity', qtyInput.value);

      // додаємо товар у кошик
      await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      // отримуємо оновлений cart
      const cart = await fetch('/cart.js').then(res => res.json());

      // перемальовуємо корзину
      renderCart(cart);

      // відкриваємо sidebar
      document.getElementById('cartSidebar').classList.add('active');
      document.getElementById('cartOverlay').classList.add('active');
    });
  });
});

///////////////////корзина////////////////////////////////////////

document.addEventListener('DOMContentLoaded', async () => {
  const productForms = document.querySelectorAll('[id^="product-form-"]');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');

  // 🔹 Стартове завантаження кошика
  const cart = await fetch('/cart.js').then(res => res.json());
  renderCart(cart);

  // 🔹 Додавання товару з картки
  productForms.forEach(productForm => {
    productForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const formData = new FormData(productForm);
      await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });
      const cart = await fetch('/cart.js').then(res => res.json());
      renderCart(cart);
      cartSidebar.classList.add('active');
      cartOverlay.classList.add('active');
    });
  });

  // === РЕНДЕР КОРЗИНИ (попап + сторінка) ===
  function renderCart(cart) {
    const cartSidebarItems = document.getElementById('cartItems');
    const cartPageItems = document.getElementById('cartPageItems');

    // --- POPUP ---
    if (cartSidebarItems) {
      cartSidebarItems.innerHTML = '';
      if (cart.items.length === 0) {
        cartSidebarItems.innerHTML = '<p class="cart__fetch">Cart is empty...</p>';
      } else {
        cart.items.forEach(item => {
          const card = `
					<div class="card">
						<div class="card_image cart">
							${item.featured_image ? `<a href="${item.url}"><img src="${item.featured_image.url}" alt="${item.title}"></a>` : ''}
						</div>
						<div class="cart-item-info">
							<div class="cart-item__title">
								<h4>${item.product_title}</h4>
								<button class="remove" data-key="${item.key}"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.28046 19.7849C4.98755 20.0778 4.51264 20.0778 4.21973 19.7849C3.92681 19.492 3.92681 19.0172 4.21973 18.7243L10.9427 12.0023L4.21969 5.28024C3.92677 4.98737 3.92677 4.51253 4.21969 4.21966C4.5126 3.92678 4.98751 3.92678 5.28042 4.21966L12.0034 10.9417L18.7265 4.21965C19.0194 3.92678 19.4943 3.92678 19.7872 4.21965C20.0801 4.51253 20.0801 4.98737 19.7872 5.28024L13.0642 12.0023L19.7872 18.7243C20.0801 19.0172 20.0801 19.492 19.7872 19.7849C19.4943 20.0778 19.0194 20.0778 18.7264 19.7849L12.0035 13.0629L5.28046 19.7849Z" fill="black"/>
</svg></button>
							</div>
							<p class="price">${(item.final_line_price / 100).toFixed(2)} ${cart.currency}</p>
							${item.options_with_values.map(opt => `
								<div class="product_det">
									<p class="product__name">${opt.name}:</p>
									<p class="product__var">${opt.value}</p>
								</div>
							`).join('')}
							<div class="quantity">
								<div class="quantity-control">
									<button class="qty-btn" data-action="minus" data-key="${item.key}">-</button>
									<span class="qty-value">${item.quantity}</span>
									<button class="qty-btn" data-action="plus" data-key="${item.key}">+</button>
								</div>
							</div>
						</div>
					</div>`;
          cartSidebarItems.insertAdjacentHTML('beforeend', card);
        });
      }
    }

    // --- CART PAGE ---
    if (cartPageItems) {
      cartPageItems.innerHTML = '';
      if (cart.items.length === 0) {
        cartPageItems.innerHTML = '<p class="cart__fetch">Cart is empty...</p>';
      } else {
        cart.items.forEach(item => {
          const card = `
					<div class="items_card cart">
						<div class="card">
							<div class="card_image cart">
								${item.featured_image ? `<a href="${item.url}"><img src="${item.featured_image.url}" alt="${item.title}"></a>` : ''}
							</div>
							<div class="cart-item-info">
								<div class="cart-item_wrapper">
									<div class="cart-item__title">
										<h4>${item.product_title}</h4>
									</div>
									${item.options_with_values.map(opt => `
										<div class="product_det">
											<p class="product__name">${opt.name}:</p>
											<p class="product__var">${opt.value}</p>
										</div>
									`).join('')}
								</div>

								<div class="quantity_wrapper">
									<div class="quantity">
										<div class="quantity-control">
											<button class="qty-btn" data-action="minus" data-key="${item.key}">-</button>
											<span class="qty-value">${item.quantity}</span>
											<button class="qty-btn" data-action="plus" data-key="${item.key}">+</button>
										</div>
									</div>
									<button class="remove" data-key="${item.key}"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.25 5.1875H16.3125V4.25C16.3125 3.70299 16.0952 3.17839 15.7084 2.79159C15.3216 2.4048 14.797 2.1875 14.25 2.1875H9.75C9.20299 2.1875 8.67839 2.4048 8.29159 2.79159C7.9048 3.17839 7.6875 3.70299 7.6875 4.25V5.1875H3.75C3.60082 5.1875 3.45774 5.24676 3.35225 5.35225C3.24676 5.45774 3.1875 5.60082 3.1875 5.75C3.1875 5.89918 3.24676 6.04226 3.35225 6.14775C3.45774 6.25324 3.60082 6.3125 3.75 6.3125H4.6875V20C4.6875 20.3481 4.82578 20.6819 5.07192 20.9281C5.31806 21.1742 5.6519 21.3125 6 21.3125H18C18.3481 21.3125 18.6819 21.1742 18.9281 20.9281C19.1742 20.6819 19.3125 20.3481 19.3125 20V6.3125H20.25C20.3992 6.3125 20.5423 6.25324 20.6477 6.14775C20.7532 6.04226 20.8125 5.89918 20.8125 5.75C20.8125 5.60082 20.7532 5.45774 20.6477 5.35225C20.5423 5.24676 20.3992 5.1875 20.25 5.1875ZM8.8125 4.25C8.8125 4.00136 8.91127 3.7629 9.08709 3.58709C9.2629 3.41127 9.50136 3.3125 9.75 3.3125H14.25C14.4986 3.3125 14.7371 3.41127 14.9129 3.58709C15.0887 3.7629 15.1875 4.00136 15.1875 4.25V5.1875H8.8125V4.25ZM18.1875 20C18.1875 20.0497 18.1677 20.0974 18.1326 20.1326C18.0974 20.1677 18.0497 20.1875 18 20.1875H6C5.95027 20.1875 5.90258 20.1677 5.86742 20.1326C5.83225 20.0974 5.8125 20.0497 5.8125 20V6.3125H18.1875V20ZM10.3125 10.25V16.25C10.3125 16.3992 10.2532 16.5423 10.1477 16.6477C10.0423 16.7532 9.89918 16.8125 9.75 16.8125C9.60082 16.8125 9.45774 16.7532 9.35225 16.6477C9.24676 16.5423 9.1875 16.3992 9.1875 16.25V10.25C9.1875 10.1008 9.24676 9.95774 9.35225 9.85225C9.45774 9.74676 9.60082 9.6875 9.75 9.6875C9.89918 9.6875 10.0423 9.74676 10.1477 9.85225C10.2532 9.95774 10.3125 10.1008 10.3125 10.25ZM14.8125 10.25V16.25C14.8125 16.3992 14.7532 16.5423 14.6477 16.6477C14.5423 16.7532 14.3992 16.8125 14.25 16.8125C14.1008 16.8125 13.9577 16.7532 13.8523 16.6477C13.7468 16.5423 13.6875 16.3992 13.6875 16.25V10.25C13.6875 10.1008 13.7468 9.95774 13.8523 9.85225C13.9577 9.74676 14.1008 9.6875 14.25 9.6875C14.3992 9.6875 14.5423 9.74676 14.6477 9.85225C14.7532 9.95774 14.8125 10.1008 14.8125 10.25Z" fill="#D72C0D"/>
</svg></button>
								</div>

								<div class="price_wrapper">
									<p class="price">${(item.final_line_price / 100).toFixed(2)} ${cart.currency}</p>
								</div>
							</div>
						</div>
					</div>`;
          cartPageItems.insertAdjacentHTML('beforeend', card);
        });
        cartPageItems.insertAdjacentHTML('beforeend', `
					<div class="btn_continue">
						<a href="/collections/all">Continue shopping</a>
					</div>
				`);
      }
    }

    // --- SUBTOTAL ---
    const subtotalEls = document.querySelectorAll('.subtotal__price');
    subtotalEls.forEach(el => {
      el.textContent = (cart.total_price / 100).toFixed(2) + ' ' + cart.currency;
    });

    // --- COUNTERS ---
    const cartCounter = document.getElementById('cart_count');
    const cartCounterheader = document.getElementById('cartBtn');
    if (cartCounter) cartCounter.textContent = `Cart (${cart.item_count})`;
    if (cartCounterheader) cartCounterheader.textContent = `Cart (${cart.item_count})`;

    // --- ACTIONS ---
    setupCartQtyButtons();
    setupRemoveButtons();
  }

  // === Оновлення кількості ===
  function setupCartQtyButtons() {
    const qtyButtons = document.querySelectorAll('.qty-btn');
    qtyButtons.forEach(btn => {
      btn.onclick = async () => {
        const key = btn.dataset.key;
        const action = btn.dataset.action;
        const qtyEl = btn.parentElement.querySelector('.qty-value');
        let currentQty = parseInt(qtyEl.textContent, 10);
        let newQty = action === 'plus' ? currentQty + 1 : currentQty - 1;
        if (newQty < 1) newQty = 1;
        const cart = await updateCartQuantity(key, newQty);
        renderCart(cart);
      };
    });
  }

  // === Видалення товару ===
  function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove');
    removeButtons.forEach(btn => {
      btn.onclick = async () => {
        const key = btn.dataset.key;
        const cart = await updateCartQuantity(key, 0);
        renderCart(cart);
      };
    });
  }

  // === API update ===
  async function updateCartQuantity(key, quantity) {
    const res = await fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: key,
        quantity
      })
    });
    return await res.json();
  }
});

////////fetch///////
document.addEventListener('DOMContentLoaded', () => {
  const clearBtn = document.querySelector('.button_standart.fetch');
  if (clearBtn) {
    clearBtn.addEventListener('click', async () => {
      // очищаємо корзину
      await fetch('/cart/clear.js', {
        method: 'POST'
      });

      // отримуємо оновлений cart
      const cart = await fetch('/cart.js').then(res => res.json());

      // перемальовуємо все
      updateCartUI(cart);
    });
  }
});

/**
 * Оновлює UI корзини всюди (попап + сторінка)
 */
function updateCartUI(cart) {
  // 🔹 лічильники
  const cartCounter = document.getElementById('cart_count');
  const cartCounterHeader = document.getElementById('cartBtn');
  if (cartCounter) {
    cartCounter.textContent = `Cart (${cart.item_count})`;
  }
  if (cartCounterHeader) {
    cartCounterHeader.textContent = `Cart (${cart.item_count})`;
  }

  // 🔹 попап
  const popupCartItems = document.getElementById('cartItems');
  if (popupCartItems) {
    popupCartItems.innerHTML = '';
    if (cart.items.length === 0) {
      popupCartItems.innerHTML = '<p class="cart__fetch">Cart is empty...</p>';
    } else {
      cart.items.forEach(item => {
        const card = `
					<div class="card">
						<div class="cart-item-info">
							<h4>${item.product_title}</h4>
							<p>${item.quantity} x ${(item.final_line_price / 100).toFixed(2)} ${cart.currency}</p>
						</div>
					</div>
				`;
        popupCartItems.insertAdjacentHTML('beforeend', card);
      });
    }
    const subtotal = document.querySelector('.subtotal__price');
    if (subtotal) {
      subtotal.textContent = (cart.total_price / 100).toFixed(2) + ' ' + cart.currency;
    }
  }

  // 🔹 сторінка корзини
  const pageCartItems = document.getElementById('pageCartItems');
  if (pageCartItems) {
    pageCartItems.innerHTML = '';
    if (cart.items.length === 0) {
      pageCartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cart.items.forEach(item => {
        const row = `
					<div class="cart-row">
						<span>${item.product_title}</span>
						<span>${item.quantity}</span>
						<span>${(item.final_line_price / 100).toFixed(2)} ${cart.currency}</span>
					</div>
				`;
        pageCartItems.insertAdjacentHTML('beforeend', row);
      });
    }
  }
}

//////////чекаут кнопк//////////
document.addEventListener('DOMContentLoaded', () => {
  const checkoutContainer = document.getElementById('checkout');
  if (checkoutContainer) {
    const checkoutBtn = checkoutContainer.querySelector('button');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        // Переходимо на сторінку оформлення замовлення
        window.location.href = '/checkout';
      });
    }
  }
});

/////////////////////////////buy now button///////////////////////
document.addEventListener('DOMContentLoaded', () => {
  const buyNowBtn = document.querySelector('.button_standart.buy');
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', async e => {
      e.preventDefault();

      // шукаємо форму Add to Cart (вона завжди є поруч)
      const productDetails = buyNowBtn.closest('.product_details');
      const addToCartForm = productDetails.querySelector('form[id^="product-form-"]');
      const variantSelect = addToCartForm.querySelector('select[name="id"]');
      const qtyInput = addToCartForm.querySelector('input[name="quantity"]');
      const variantId = variantSelect.value;
      const qty = qtyInput.value;
      if (!variantId) {
        alert('Виберіть варіант товару');
        return;
      }

      // додаємо товар у корзину
      const formData = new FormData();
      formData.append('id', variantId);
      formData.append('quantity', qty);
      await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      // ведемо одразу в checkout
      window.location.href = '/checkout';
    });
  }
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
//# sourceMappingURL=script.js.map
