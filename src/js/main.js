/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import MousePRLX from './libs/parallaxMouse'
import AOS from 'aos'
import Swiper, { Navigation } from 'swiper';

import BaseHelpers from './helpers/base-helpers';
import PopupManager from './modules/popup-manager';
import BurgerMenu from './modules/burger-menu';
import { smoothScroll } from './libs/smoothScroll';
import { initScrollProgress } from './libs/scrollProgress';

// import { running } from './libs/running';

// import Tabs from './modules/tabs';
// import Accordion from './modules/accordion';

// import { cursorPoint } from './libs/cursorPoint';

BaseHelpers.checkWebpSupport();
/* Добавление класса touch для HTML если браузер мобильный */
// BaseHelpers.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
BaseHelpers.addLoadedClass();
/* Фиксированный header */
BaseHelpers.headerFixed();


/** ===================================================================================
 * Cкролл Lenis
 * */
// new MousePRLX();
// smoothScroll()


/** ===================================================================================
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();

/** ===================================================================================
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();

/** ===================================================================================
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */

window.addEventListener('load', () => {
    AOS.init({
        once: true, // Анимация сработает только один раз
        duration: 800, // продолжительность анимации (опционально)
        // offset: 100, // расстояние до элемента для срабатывания (опционально)
    });
});

/** ===================================================================================
 * Параллакс мышей
 * */
// new MousePRLX();


/** ===================================================================================
 * Анимация точки курсора
 * */
// cursorPoint()


/** ===================================================================================
 * Бегущая строка
 * */
// running()

/** ===================================================================================
 * Кастомный скролл бар
 * Добавить класс scrollbar-custom к элементу
 * */
// initScrollProgress()



/* ТАБЫ ================================================================================================
 	* На wrapper блока табов добавить атрибут data-tabs="название"
	* Для обертки title табов добавить класс "tabs__nav"
	* Для title таба добавить класс "tabs__trigger"
	* Для обертки body табов добавить класс "tabs__content"
	* Для body таба добавить класс "tabs__panel"
*/
// new Tabs('название', {
// 	onChange: (data) => {
// 		console.log(data);
// 	},
// });
/* АККАРДЕОН ===========================================================================================
 	* Класс wrapper блока аккардеона добавить в инициализацию аккардиона
	* Каждый элемент аккардеона обернуть в блок с классом "accordion__item"
	* Для title аккардеона добавить класс "accordion__header"
	* Для content аккардеона добавить класс "accordion__content"
*/
// new Accordion('.accordion', {
// 	shouldOpenAll: false, // true
// 	defaultOpen: [], // [0,1]
// 	collapsedClass: 'open',
// });

/* Динамический адаптив =================================================================================
* Что бы перебросить блок в другой блок, повешай на него атрибут:
* data-da="class блока куда нужно перебросить, брекпоинт(ширина экрана), позиция в блоке(цифра либо first,last)"
*/
/*Расскоментировать для использования*/
import { useDynamicAdapt } from './modules/dynamicAdapt.js'
import { autoplayVideo } from './modules/autoplayVideo.js';
useDynamicAdapt()

/* Маска для инпута tel =================================================================================
	* Добавить класс tel к нужному инпуту 
*/
import { maskTel } from './modules/index.js'
maskTel()

/* Cкрыть меню при клике на его ссылки ==================================================================
*/
// import { toggleLinkMenuNoOpen } from './modules/index.js'
//toggleLinkMenuNoOpen()

/* Cкрыть меню при клике вне его ========================================================================
	* Добавить к меню класс 'your-menu'
*/
import { toggleOutClickMenuRemoveOpen } from './modules/index.js'
toggleOutClickMenuRemoveOpen()

/* Удалить класс _active при клике вне элемента =========================================================
	* Передать в функцию нужный элемент и класс который нужно удалить
*/
// import { removeClassOutClickElement } from './modules/index.js'
// const elements = document.querySelectorAll('.class'); 
// removeClassOutClickElement(elements, '.removeClass')

/* Инициализация  swiper =================================================================================
*/
const swiperNews = new Swiper('.last__slider', {
  speed: 800,
  spaceBetween: 0,
  slidesPerView: 1,
  modules: [Navigation],
  // loop: true,
  initialSlide: 0,
  autoplay: {
    delay: 2500,
    stopOnLastSlide: false,
    disableOnIteration: false,
  },
  navigation: {
    prevEl: ".last__btn._prev",
    nextEl: ".last__btn._next"
  },

  breakpoints: {
    575: {
      slidesPerView: 2.1,
  	},
    769: {
      slidesPerView: 2.5,
  	},
    1101: {
        slidesPerView: 3.55,
    }
  },
});


/* Валидация формы ======================================================================================
* В константу записывает нужную форму
* В переменную formNAME передаем форму
* В переменную popupTranks передаем окно благодарности
* Добавить класс _email на input type='mail'
* Добавить класс tel на input type='tel'
* Добавить каласс _req на input которые нужно проверить 
* Добавить каласс _obligat на input которые обязательны для заполнения
* Добавить класс .popup-thanks для модального окна спасибо
  Раскоментировать для использования
*/ 
import { sendForm, validForm } from './modules/validFrom.js'
// const popupTranks = document.querySelector('.popup-thranks')
// const formNAME = document.getElementById('form-NAME')

//==== валидация ====
const forms = document.querySelectorAll('form')

//==== валидация ====
forms.forEach(form => {
	validForm(form)
	sendForm(form)
});

//==== отправка ====

//==== валидация ====

//==== валидация ====

//==== валидация ====

//==== валидация ====
// =======================================================================================================

/* Добавление класса _active родителю при клике ==========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
// import { toggleActiveClassParent } from './modules/index.js'
// const elementAll = document.querySelectorAll('.class');
// toggleActiveClassParent(elementAll)

/* Динамический класса _active элементу при клике ========================================================
	* Вызвать функцию и передать в нее массив нужных элементов
	* При клике на элемент, у всех элементов класс удаляется
*/
// import { toggleActiveClass } from './modules/index.js'
// const elementAll = document.querySelectorAll('.class');
// toggleActiveClass(elementAll)





window.addEventListener('load', () => {
  // Обычные img
  document.querySelectorAll('img.lazy').forEach((img) => {
    if (img.dataset.src) img.src = img.dataset.src;
    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
  });

  // picture + source
  document.querySelectorAll('picture.lazy').forEach((picture) => {
    picture.querySelectorAll('source').forEach((source) => {
      if (source.dataset.srcset) source.srcset = source.dataset.srcset;
    });

    const img = picture.querySelector('img');
    if (img) {
      if (img.dataset.src) img.src = img.dataset.src;
      if (img.dataset.srcset) img.srcset = img.dataset.srcset;
    }
  });

  // iframe
  document.querySelectorAll('iframe.lazy').forEach((iframe) => {
    if (iframe.dataset.src) {
      iframe.src = iframe.dataset.src;
    }
    
    // Дополнительно: можно удалить класс lazy после загрузки
    iframe.addEventListener('load', function onLoad() {
      this.classList.remove('lazy');
      this.removeEventListener('load', onLoad);
    });
  });
});


window.addEventListener('load', autoplayVideo);




function initLifeTabs() {
    const buttons = document.querySelectorAll('.life-btn-trigger');
    const rows = document.querySelectorAll('.life__row._tabs-mody');
    
    // Если нет кнопок или рядов, прекращаем выполнение
    if (!buttons.length || !rows.length) return;
    
    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Убираем класс _active у всех кнопок
            buttons.forEach(btn => {
                btn.classList.remove('_active');
            });
            
            // Добавляем класс _active текущей кнопке
            this.classList.add('_active');
            
            // Скрываем все ряды
            rows.forEach(row => {
                row.style.display = 'none';
            });
            
            // Показываем соответствующий ряд (если такой индекс существует)
            if (rows[index]) {
                rows[index].style.display = '';
                // или rows[index].style.display = 'flex'/'grid'/'block' - в зависимости от вашего CSS
            }
        });
    });
}

// Вызов функции после загрузки DOM
document.addEventListener('DOMContentLoaded', initLifeTabs);