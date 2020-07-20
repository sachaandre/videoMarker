//
import {MarkedVid} from '../src/index.js';

//Creating player page container (w/ id)
let player = document.createElement("div");
player.setAttribute("id","playerContainer");

//Creating a MarkedVid instance
let markedVid = new MarkedVid("https://html5videoformatconverter.com/data/images/happyfit2.mp4", "mp4");

//Creating a container for video player, buttons and mark list
let vidContainer = document.createElement("div");
vidContainer.setAttribute("id","videoContainer");
player.appendChild(vidContainer);

let controllerContainer = document.createElement("div");
controllerContainer.setAttribute("id","controllerContainer");
player.appendChild(controllerContainer);

let markListContainer = document.createElement("div");
markListContainer.setAttribute("id","markListContainer");
player.appendChild(markListContainer);

//Generating the video player
markedVid.generateVideoPlayer(vidContainer);

//Generating control bar
markedVid.generateControlBar(controllerContainer);

//Pushing markers
markedVid.videoElement.addEventListener("loadeddata", function(){
  markedVid.addMarker("00:00","Start",0,"00:28");
  markedVid.addMarker("00:29","Marker 1",1,"00:44");
  markedVid.addMarker("00:45","Marker 2",2)

  //Generating marks's list
  markedVid.generateMarkerList(markListContainer);
});

let main = document.getElementById("main");
main.appendChild(player);

let toggleReturn = document.getElementById("toggle-return");
toggleReturn.innerText = markedVid.returnOnPause ? "Deactivate return on pause" : "Activate return on pause";
toggleReturn.addEventListener("click", function(){markedVid.toggleReturnOnPause(toggleReturn)});

let togglePause = document.getElementById("toggle-pause");
togglePause.innerText = markedVid.pauseOnMarkEnd ? "Deactivate Pause at End Of Mark" : "Activate Pause at End Of Mark";
togglePause.addEventListener("click", function(){markedVid.togglePauseOnMarker(togglePause)});
