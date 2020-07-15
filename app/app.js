//import Router from './modules/router.js';
import {player} from './views/player.js';
//
const routes = {
  '/' : home,
  '/player' : player
};

const mainDiv = document.getElementById('main');
mainDiv.innerHTML = routes[window.location.pathname].outerHTML;

const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    window.location.origin + pathname
  )
  mainDiv.innerHTML = routes[pathname]
}
