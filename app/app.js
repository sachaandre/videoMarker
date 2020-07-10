//import Router from './modules/router.js';

const routes = {
  '/' : home,
  '/player' : player
};

const mainDiv = document.getElementById('main-container');
mainDiv.innerHTML = routes[window.location.pathname];

const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    window.location.origin + pathname
  )
  mainDiv.innerHTML = routes[pathname]
}

let navLinks = document.getElementsByClassName("btnsave")
Array.from(navLinks).forEach(function(element){
  element.addEventListener("click", function(){ onNavigate(element.href); console.log("click")}, false);
})
