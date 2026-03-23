// параметры 
var scrolled;
window.onscroll = function () {
  scrolled = window.pageYOffset || document.documentElement.scrollTop;
  document.getElementById('scroll').innerHTML = scrolled + 'px : scroll';
  // let g = elem2.style.transform = 'translateY(' + scrolled*-2 + 'px)';

}
$(window).on('load resize', function () {
  var width = $('html').outerWidth();
  var height = $(window).height();
  $('#width').html(width + 'px : width');
  $('#height').html(height + 'px : height');
});

// document.onmousemove = function (e) {
//   var X = e.pageX;
//   var Y = e.pageY;
//   document.getElementById('mouseX').innerHTML = X + ': mouseX'
//   document.getElementById('mouseY').innerHTML = Y + ': mouseY'

  // // паралакс эффект
  // elem.style.transform = 'translateX(' + X/10 + 'px)' + ' translateY(' + Y/10 + 'px)';

// }
// получение координат верхнего левого угла контейнера относительно окна
// var elem = document.getElementById('textDiv') // здесь Id контейнера
// var elem2 = document.getElementById('testDiv') // здесь Id контейнера
// function getCoords(elem) { // кроме IE8-
//   var box = elem.getBoundingClientRect();
//   var top = box.top + pageYOffset;
//   var left = box.left + pageXOffset;
//   document.getElementById('clientX').innerHTML = top + ': clientY'
//   document.getElementById('clientY').innerHTML = left + ': clientX'
// }
// getCoords(elem);

// horizontal progress function
// window.onload = function(){
//   var progressLine = document.getElementById("progress-line");
//   var body = document.body,
//       html = document.documentElement,
//       viewportHeight = window.innerHeight;

//   var documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  
//   var scrollTopValue = function(){
//     return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
//   }
  
//   window.addEventListener("scroll", function(){
//     var scroll = scrollTopValue();
//     var progress = (scroll / (documentHeight - viewportHeight))*100;
//     progressLine.style.width = progress + "%";
//   });
  
//   window.addEventListener("resize", function(){
//     body = document.body;
//     html = document.documentElement;
//     viewportHeight = window.innerHeight;
//     documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  // });
// }
///////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////

////////////////////////////////////////////


//============ стрелочная функция 
// const foo = (a, b) => {
//   return console.log(a, b)
// }
// foo(44, 4)

//============= замыкание 
// function addNum(addingNum) {
//   const c = addingNum;

//   return function(currnetNum) {
//     console.log(currnetNum + c)
//   }
 
// }
// const addFour = addNum(4)
// addFour(10)

// ==============  this
// function CreateCar(mark) {
//   return {
//     mark,
//     getMark() {
//       return this.mark
//     }
//   }
// }
// const car1 = createCar('bmw')
// const car2 = createCar('audi')

// console.log(car1.getMark())
// console.log(car2.getMark())

// window.console.log(this)

// ============== prototype
// CreateCar.prototype.getMark = function() {
  // return this.mark
// }


// ==============каррирование 
// Каррирование или карринг (currying) в функциональном программирование — это преобразование функции с множеством аргументов в набор вложенных функций с одним аргументом. При вызове каррированной функции с передачей ей одного аргумента, она возвращает новую функцию, которая ожидает поступления следующего аргумента.

// ============= aрхитектура MVC FlUx

// ============= дизайн паттерны

// синглтон - создание инстанса класса
// сомманд - оборачивает вызов функции в обвёртку и позволяет работать с ней как с объектом. ооп замена колбэкам.
// flyweith - служит для улучшения производительности когда у нас есть много однотипных объектов (делает их создание легче и проще)
// observer - слежка за изменением куска кода и оповещение при его изменении (грубо говоря)
// prototype - Когда объект может спаунить другие объекты похожие на себя
// state - делать действия отталкиваясь от состояния оъекта
// strategy - выполнение task разными способами
// decorator - 

//---------------------------------------

// document.addEventListener('DOMContentLoaded', () => {
//   const contentDiv = document.querySelector('.content');
//   const navLinks = document.querySelectorAll('.nav-link')
//   const loadingOverlay = document.querySelector('.loading-overlay')

//   const showLoadingOverlay = () => {
//     loadingOverlay.style.opacity = '1'
//   }

//   const hideLoadingOverlay = () => {
//     loadingOverlay.style.opacity = '0'
//   }

//   const loadScripts = (url) => {
//     // /about.html
//     if (url.includes('secondPage')) {
//       document.querySelector(".btn").addEventListener('click', (e) => {
//         console.log("e", e)
//       });

//       aboutScripts()
//       // все пользовательские скрипты здесь. для текущей страницы следует писать здесь
//     }

//     if (url.includes('contacts')) {
//       // contactsScripts()  для примера
//     }
//   }
//   const aboutScripts = () => {

//   }

//   const loadPage = (url) => {
//     showLoadingOverlay();

//     fetch(url)
//       .then(response => response.text())
//       .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
//         const newContent = doc.querySelector('.content').innerHTML;
        
//         contentDiv.classList.add('fade-out');

//         contentDiv.innerHTML = newContent;
//         document.title = doc.title;

//         setTimeout(() => {

//           contentDiv.classList.remove('fade-out');
//           history.pushState({}, "", url);
//           hideLoadingOverlay();
//         }, 500);

//         console.log("url", url)
//         console.log("history", history)
//         console.log("history.length",  window.history.length)

//         window.history.length
//       })
//       .then(() => {
//         loadScripts(url)
//       })
//   };

//   navLinks.forEach(el => {
//     el.addEventListener('click', (e) => {
//       e.preventDefault();

//       const url = e.currentTarget.getAttribute('href');
//       // showLoadingOverlay();
//       loadPage(url);
//     });
//   });

//   loadPage(window.location.pathname);

//   window.addEventListener('popstate', () => {
//     loadPage(window.location.pathname);
//   });

  
// });

//--------------------------------------------------

