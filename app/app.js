//import Router from './modules/router.js';
import {player, generatePlayerPage} from './views/player.js';
//
const routes = {
  '/' : home,
  '/player' : player
};

const mainDiv = document.getElementById('main');
mainDiv.innerHTML = routes[window.location.pathname].outerHTML;
if (window.location.pathname == '/player') generatePlayerPage();
